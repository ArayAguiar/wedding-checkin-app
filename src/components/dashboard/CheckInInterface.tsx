"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/QRScanner";
import { Search, QrCode, Users, Undo2, LogOut, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { checkInGuest, undoCheckIn } from "@/app/checkin/actions";

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
  const [checkingInId, setCheckingInId] = useState<string | null>(null);
  const [confirmingUndoId, setConfirmingUndoId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ── Real-time updates + polling fallback ──
  useEffect(() => {
    let realtimeConnected = false;

    const channel = supabase
      .channel("guest-checkins")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "guests" },
        (payload) => {
          const updated = payload.new as Record<string, unknown>;
          setGuests((prev) =>
            prev.map((g) =>
              g.id === updated.id
                ? {
                    ...g,
                    checkedIn: Boolean(updated.check_in),
                    companionCheckedIn: Boolean(updated.check_in_acomp),
                  }
                : g
            )
          );
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") realtimeConnected = true;
      });

    const pollInterval = setInterval(async () => {
      if (realtimeConnected) return;
      const { data, error } = await supabase
        .from("guests")
        .select("id, check_in, check_in_acomp");
      if (error || !data) return;

      setGuests((prev) =>
        prev.map((g) => {
          const match = data.find((d: Record<string, unknown>) => d.id === g.id);
          if (!match) return g;
          return {
            ...g,
            checkedIn: Boolean(match.check_in),
            companionCheckedIn: Boolean(match.check_in_acomp),
          };
        })
      );
    }, 5000);

    return () => {
      clearInterval(pollInterval);
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // ── Stats ──
  const totalPeople = guests.reduce(
    (sum, g) => sum + 1 + (g.companionName ? 1 : 0),
    0
  );
  const confirmedPeople = guests.reduce((sum, g) => {
    let count = g.checkedIn ? 1 : 0;
    if (g.companionName && g.companionCheckedIn) count += 1;
    return sum + count;
  }, 0);
  const pendingPeople = totalPeople - confirmedPeople;

  // ── Filter ──
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
    if (checkingInId) return;
    setConfirmingUndoId(null);
    const guest = guests.find((g) => g.id === guestId);
    if (!guest) return;

    setCheckingInId(guestId);

    setGuests((prev) =>
      prev.map((g) =>
        g.id === guestId
          ? {
              ...g,
              checkedIn: true,
              companionCheckedIn: includeCompanion
                ? true
                : g.companionCheckedIn,
            }
          : g
      )
    );
    setExpandedId(null);

    const result = await checkInGuest(guestId, includeCompanion);
    setCheckingInId(null);

    if (!result.success) {
      setGuests((prev) => prev.map((g) => (g.id === guestId ? guest : g)));
      toast.error(result.error || "Erro ao confirmar");
      return;
    }

    toast.success(
      includeCompanion && guest.companionName
        ? `${guest.name} e ${guest.companionName} confirmados`
        : `${guest.name} confirmado`
    );
  };

  const handleUndo = async (guestId: string) => {
    if (checkingInId) return;
    const guest = guests.find((g) => g.id === guestId);
    if (!guest) return;

    if (confirmingUndoId !== guestId) {
      setConfirmingUndoId(guestId);
      setExpandedId(null);
      return;
    }

    setConfirmingUndoId(null);
    setCheckingInId(guestId);

    setGuests((prev) =>
      prev.map((g) =>
        g.id === guestId
          ? { ...g, checkedIn: false, companionCheckedIn: false }
          : g
      )
    );

    const result = await undoCheckIn(guestId);
    setCheckingInId(null);

    if (!result.success) {
      setGuests((prev) => prev.map((g) => (g.id === guestId ? guest : g)));
      toast.error(result.error || "Erro ao desfazer");
      return;
    }

    toast.info(`${guest.name} desfeito`);
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
        setConfirmingUndoId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="w-10" />
          <div className="text-center">
            <h1 className="font-display text-lg tracking-[0.15em] text-foreground">
              CHECK-IN
            </h1>
            <p className="label text-muted-foreground text-xs mt-0.5">
              Painel da Equipe
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/staff";
            }}
            aria-label="Sair"
            className="w-10 h-10 shrink-0"
          >
            <LogOut className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      {/* Controls */}
      <div className="shrink-0 max-w-2xl mx-auto w-full px-4 pt-4 pb-3 space-y-4">
        {/* Stats */}
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

        {/* Search */}
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  searchRef.current?.focus();
                }}
                className="absolute right-0 bottom-1.5 h-auto px-0 py-0 text-muted-foreground hover:text-foreground text-xs label"
              >
                Limpar
              </Button>
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
      </div>

      {/* Guest list — scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-2xl mx-auto px-4 pb-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-muted-foreground">
                Nenhum convidado encontrado
              </p>
              {search && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearch("")}
                  className="label text-accent mt-2 hover:underline"
                >
                  Limpar busca
                </Button>
              )}
            </div>
          ) : (
            filtered.map((guest) => (
              <GuestCard
                key={guest.id}
                guest={guest}
                isExpanded={expandedId === guest.id}
                onExpand={() => {
                  setConfirmingUndoId(null);
                  setExpandedId(expandedId === guest.id ? null : guest.id);
                }}
                onCheckIn={handleCheckIn}
                onUndo={handleUndo}
                checkingInId={checkingInId}
                confirmingUndoId={confirmingUndoId}
              />
            ))
          )}
        </div>
      </div>

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
  checkingInId,
  confirmingUndoId,
}: {
  guest: Guest;
  isExpanded: boolean;
  onExpand: () => void;
  onCheckIn: (id: string, includeCompanion: boolean) => void;
  onUndo: (id: string) => void;
  checkingInId: string | null;
  confirmingUndoId: string | null;
}) {
  const isProcessing = checkingInId === guest.id;
  const isConfirmingUndo = confirmingUndoId === guest.id;

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
      {/* Name + Status */}
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
          isConfirmingUndo ? (
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-4 h-4" />
                <span className="label">Desfazer check-in de {guest.name}?</span>
              </div>
              <Button
                variant="destructive"
                onClick={() => onUndo(guest.id)}
                disabled={isProcessing}
                className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase"
              >
                {isProcessing ? "A desfazer..." : "Sim, desfazer"}
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={onExpand}
                className="label text-muted-foreground hover:text-foreground block mx-auto"
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUndo(guest.id)}
              disabled={isProcessing}
              className="label text-muted-foreground hover:text-destructive transition-colors h-auto px-0"
            >
              <Undo2 className="w-3 h-3 inline mr-1" />
              Desfazer
            </Button>
          )
        ) : partiallyChecked ? (
          <div className="space-y-3">
            <Button
              onClick={() => onCheckIn(guest.id, true)}
              disabled={isProcessing}
              className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase bg-foreground hover:bg-foreground/90"
            >
              {isProcessing
                ? "A confirmar..."
                : `Confirmar ${guest.companionName}`}
            </Button>
            {isConfirmingUndo ? (
              <div className="space-y-3 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="label">Desfazer check-in?</span>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => onUndo(guest.id)}
                  disabled={isProcessing}
                  className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase"
                >
                  {isProcessing ? "A desfazer..." : "Sim, desfazer"}
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  onClick={onExpand}
                  className="label text-muted-foreground hover:text-foreground block mx-auto"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 w-full">
                  <div className="h-px flex-1 bg-border" />
                  <span className="label text-muted-foreground">ou</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUndo(guest.id)}
                  disabled={isProcessing}
                  className="label text-muted-foreground hover:text-destructive transition-colors h-auto px-0"
                >
                  <Undo2 className="w-3 h-3 inline mr-1" />
                  Desfazer
                </Button>
              </div>
            )}
          </div>
        ) : isExpanded && guest.companionName ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <Button
              onClick={() => onCheckIn(guest.id, true)}
              disabled={isProcessing}
              className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase bg-foreground hover:bg-foreground/90"
            >
              {isProcessing ? "A confirmar..." : "Confirmar ambos"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onCheckIn(guest.id, false)}
              disabled={isProcessing}
              className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase border-foreground/20 text-foreground hover:bg-muted bg-transparent"
            >
              {isProcessing ? "A confirmar..." : `Apenas ${guest.name}`}
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={onExpand}
              className="label text-muted-foreground hover:text-foreground block mx-auto"
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              if (guest.companionName) onExpand();
              else onCheckIn(guest.id, false);
            }}
            disabled={isProcessing}
            className="w-full h-10 rounded-full font-serif text-[0.6875rem] tracking-[0.15em] uppercase bg-foreground hover:bg-foreground/90"
          >
            {isProcessing ? "A confirmar..." : `Confirmar ${guest.name}`}
          </Button>
        )}
      </div>
    </div>
  );
}