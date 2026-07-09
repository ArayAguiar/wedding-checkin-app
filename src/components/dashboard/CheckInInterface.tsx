"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/QRScanner";
import { Search, QrCode, Users, Undo2 } from "lucide-react";
import { toast } from "sonner";

interface Guest {
  id: string;
  name: string;
  companionName?: string;
  table?: string;
  codigo_acesso: string;
  checkedIn: boolean;
  companionCheckedIn?: boolean;
}

interface CheckInInterfaceProps {
  initialGuests: Guest[];
}

export default function CheckInInterface({ initialGuests }: CheckInInterfaceProps) {
  const supabase = createClient();

  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [scannerActive, setScannerActive] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ── Stats (computed, not fetched) ──
  const totalPeople = guests.reduce((sum, g) => sum + 1 + (g.companionName ? 1 : 0), 0);
  const confirmedPeople = guests.reduce((sum, g) => {
    let count = g.checkedIn ? 1 : 0;
    if (g.companionName && g.companionCheckedIn) count += 1;
    return sum + count;
  }, 0);
  const pendingPeople = totalPeople - confirmedPeople;

  // ── Filter (client-side, instant) ──
  const filtered = guests.filter((g) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      g.name.toLowerCase().includes(q) ||
      g.table?.toString().includes(q) ||
      g.companionName?.toLowerCase().includes(q) ||
      g.codigo_acesso.toLowerCase().includes(q)
    );
  });

  // ── QR Scan ──
  const handleQRScan = useCallback((result: string) => {
    setSearch(result);
    setScannerActive(false);
    setTimeout(() => searchRef.current?.focus(), 100);
    toast.info(`Código: ${result}`);
  }, []);

  const handleCloseScanner = useCallback(() => {
    setScannerActive(false);
  }, []);

  // ── Check-in / Undo ──
  const handleCheckIn = async (guestId: string, includeCompanion: boolean) => {
    const guest = guests.find((g) => g.id === guestId);
    if (!guest) return;

    // Optimistic update
    setGuests((prev) =>
      prev.map((g) =>
        g.id === guestId
          ? {
              ...g,
              checkedIn: true,
              companionCheckedIn: includeCompanion ? true : g.companionCheckedIn,
            }
          : g
      )
    );
    setExpandedId(null);

    try {
      const updateData = includeCompanion
        ? { check_in: true, check_in_acomp: true }
        : { check_in: true };

      const { error } = await supabase.from("guests").update(updateData).eq("id", guestId);
      if (error) throw error;

      toast.success(
        includeCompanion && guest.companionName
          ? `${guest.name} e ${guest.companionName} confirmados`
          : `${guest.name} confirmado`
      );
    } catch {
      // Rollback
      setGuests((prev) => prev.map((g) => (g.id === guestId ? guest : g)));
      toast.error("Erro ao confirmar");
    }
  };

  const handleUndo = async (guestId: string) => {
    const guest = guests.find((g) => g.id === guestId);
    if (!guest) return;

    setGuests((prev) =>
      prev.map((g) =>
        g.id === guestId
          ? { ...g, checkedIn: false, companionCheckedIn: false }
          : g
      )
    );

    try {
      const { error } = await supabase
        .from("guests")
        .update({ check_in: false, check_in_acomp: false })
        .eq("id", guestId);
      if (error) throw error;

      toast.info(`${guest.name} desfeito`);
    } catch {
      setGuests((prev) => prev.map((g) => (g.id === guestId ? guest : g)));
      toast.error("Erro ao desfazer");
    }
  };

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setScannerActive(false);
        setExpandedId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="font-display text-xl tracking-[0.15em] text-foreground">
              CHECK-IN
            </h1>
            <p className="label text-muted-foreground mt-0.5">
              Painel da Equipe
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Stats — inline, no cards */}
        <div className="flex items-baseline gap-2 text-sm">
          <span className="font-serif text-2xl text-foreground">
            {confirmedPeople}
          </span>
          <span className="label text-muted-foreground">
            de {totalPeople} pessoas confirmadas
          </span>
          {pendingPeople > 0 && (
            <>
              <span className="text-border mx-1">·</span>
              <span className="label text-muted-foreground">
                {pendingPeople} pendentes
              </span>
            </>
          )}
        </div>

        {/* Search — design system tokens */}
        <div className="flex gap-3 items-end">
          <div className="relative flex-1">
            <Search className="absolute left-0 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={searchRef}
              type="text"
              placeholder="Buscar por nome, mesa ou código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-6 h-12 bg-transparent border-0 border-b border-border rounded-none font-sans text-sm focus-visible:ring-0 focus-visible:border-foreground transition-colors"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  searchRef.current?.focus();
                }}
                className="absolute right-0 bottom-3 text-muted-foreground hover:text-foreground text-xs label"
              >
                Limpar
              </button>
            )}
          </div>
          <Button
            onClick={() => setScannerActive(true)}
            className="h-12 w-12 rounded-full bg-foreground hover:bg-foreground/90 shrink-0 flex items-center justify-center"
            aria-label="Escanear QR"
          >
            <QrCode className="w-5 h-5 text-background" />
          </Button>
        </div>

        {/* Guest list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-muted-foreground">
                Nenhum convidado encontrado
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="label text-accent mt-2 hover:underline cursor-pointer"
                >
                  Limpar busca
                </button>
              )}
            </div>
          ) : (
            filtered.map((guest) => (
              <GuestCard
                key={guest.id}
                guest={guest}
                isExpanded={expandedId === guest.id}
                onExpand={() => setExpandedId(expandedId === guest.id ? null : guest.id)}
                onCheckIn={handleCheckIn}
                onUndo={handleUndo}
              />
            ))
          )}
        </div>
      </main>

      {/* QR Scanner */}
      {scannerActive && (
        <QRScanner
          onScan={handleQRScan}
          onClose={handleCloseScanner}
          isActive={scannerActive}
        />
      )}
    </div>
  );
}

// ── Guest Card ──
function GuestCard({
  guest,
  isExpanded,
  onExpand,
  onCheckIn,
  onUndo,
}: {
  guest: Guest;
  isExpanded: boolean;
  onExpand: () => void;
  onCheckIn: (id: string, includeCompanion: boolean) => void;
  onUndo: (id: string) => void;
}) {
  const fullyChecked =
    guest.checkedIn && (!guest.companionName || guest.companionCheckedIn);

  const partiallyChecked =
    guest.checkedIn && guest.companionName && !guest.companionCheckedIn;

  const statusText = fullyChecked
    ? "Confirmado"
    : partiallyChecked
    ? "Parcial"
    : "Pendente";

  return (
    <div
      className={`rounded-2xl p-4 border transition-colors duration-200 ${
        fullyChecked
          ? "bg-secondary/40 border-border/50"
          : "bg-card border-border shadow-sm"
      }`}
    >
      {/* Row 1: Name + Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={`font-serif text-sm tracking-wide truncate ${
              fullyChecked
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {guest.name}
          </h3>
          <p className="label text-muted-foreground mt-1">
            Mesa {guest.table}
            {guest.companionName && (
              <span className="inline-flex items-center gap-1 ml-2">
                <Users className="w-3 h-3" />
                {guest.companionName}
              </span>
            )}
          </p>
        </div>
        <span
          className={`label shrink-0 ${
            partiallyChecked ? "text-accent" : "text-muted-foreground"
          }`}
        >
          {statusText}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-3">
        {fullyChecked ? (
          <button
            onClick={() => onUndo(guest.id)}
            className="label text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
          >
            <Undo2 className="w-3 h-3 inline mr-1" />
            Desfazer
          </button>
        ) : partiallyChecked ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="label text-muted-foreground">ou</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <Button
              onClick={() => onCheckIn(guest.id, true)}
              className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase bg-foreground hover:bg-foreground/90"
            >
              Confirmar {guest.companionName}
            </Button>
            <button
              onClick={() => onUndo(guest.id)}
              className="label text-muted-foreground hover:text-destructive transition-colors cursor-pointer block mx-auto"
            >
              <Undo2 className="w-3 h-3 inline mr-1" />
              Desfazer
            </button>
          </div>
        ) : isExpanded && guest.companionName ? (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <Button
              onClick={() => onCheckIn(guest.id, true)}
              className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase bg-foreground hover:bg-foreground/90"
            >
              Confirmar ambos
            </Button>
            <Button
              variant="outline"
              onClick={() => onCheckIn(guest.id, false)}
              className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase border-border bg-transparent hover:bg-muted"
            >
              Apenas {guest.name}
            </Button>
            <button
              onClick={onExpand}
              className="label text-muted-foreground hover:text-foreground transition-colors cursor-pointer block mx-auto"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <Button
            onClick={() => {
              if (guest.companionName) onExpand();
              else onCheckIn(guest.id, false);
            }}
            className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase bg-foreground hover:bg-foreground/90"
          >
            Confirmar {guest.name}
          </Button>
        )}
      </div>
    </div>
  );
}