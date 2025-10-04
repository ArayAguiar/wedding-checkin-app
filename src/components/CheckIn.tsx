"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supaBaseClient";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { QRScanner } from "./QRScanner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Search, CheckCircle, Users, User, QrCode, Undo2 } from "lucide-react";
import { toast } from "sonner";

interface IndividualGuest {
  id: string;
  name: string;
  isCheckedIn: boolean;
  checkedInAt?: Date;
}

interface Guest {
  accessCode: string;
  mainGuest: IndividualGuest;
  companion?: IndividualGuest;
}

interface CheckInProps {
  onLogout: () => void;
}

// 🔹 Debounce hook para atrasar execução
function useDebounce<T>(value: T, delay: number = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

const normalizeString = (str: string) =>
  str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

export function CheckIn({ onLogout }: CheckInProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchCode, setSearchCode] = useState("");
  const [searchResult, setSearchResult] = useState<Guest | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    guestId: string;
    guestName: string;
    action: "checkin" | "undo";
  }>({ open: false, guestId: "", guestName: "", action: "checkin" });

  // 🔹 Debounced input
  const debouncedSearch = useDebounce(searchCode, 500);

  // Buscar convidados
  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("guests").select("*");
      if (error) return setError("Erro ao buscar convidados.");
      if (data?.length) {
        const formatted: Guest[] = data.map((g: any) => ({
          accessCode: g.codigo_acesso,
          mainGuest: {
            id: g.id,
            name: g.nome,
            isCheckedIn: g.check_in,
            checkedInAt: g.check_in ? new Date() : undefined,
          },
          companion: g.acompanhante
            ? { id: `${g.id}-companion`, name: g.acompanhante, isCheckedIn: false }
            : undefined,
        }));
        setGuests(formatted);
      }
      setLoading(false);
    };
    fetchGuests();
  }, []);

  // 🔹 Efeito para pesquisa automática com debounce
  useEffect(() => {
    if (debouncedSearch.trim()) {
      handleSearch(debouncedSearch, false);
    }
  }, [debouncedSearch]);

  const handleSearch = (term: string, manual = true) => {
    setError("");
    setSearchResult(null);

    const normalized = normalizeString(term);
    if (!normalized) {
      if (manual) setError("Por favor, introduza um código de acesso ou nome");
      return;
    }

    const found = guests.find(
      (g) =>
        g.accessCode.toLowerCase() === normalized ||
        normalizeString(g.mainGuest.name).includes(normalized) ||
        (g.companion && normalizeString(g.companion.name).includes(normalized))
    );

    if (found) {
      setSearchResult(found);
      if (manual) setSearchCode(term);
    } else {
      if (manual) setError("Código de acesso ou nome não encontrado");
    }
  };

  const handleQRScan = (scannedCode: string) => {
    setShowQRScanner(false);
    handleSearch(scannedCode);
  };

  const updateCheckin = async (guestId: string, action: "checkin" | "undo") => {
    setGuests((prev) =>
      prev.map((g) => {
        const clone = { ...g };
        if (clone.mainGuest.id === guestId) clone.mainGuest.isCheckedIn = action === "checkin";
        if (clone.companion?.id === guestId) clone.companion.isCheckedIn = action === "checkin";
        return clone;
      })
    );

    if (searchResult) {
      const clone = { ...searchResult };
      if (clone.mainGuest.id === guestId) clone.mainGuest.isCheckedIn = action === "checkin";
      if (clone.companion?.id === guestId) clone.companion.isCheckedIn = action === "checkin";
      setSearchResult(clone);
    }

    const mainId = guestId.replace("-companion", "");
    await supabase.from("guests").update({ check_in: action === "checkin" }).eq("id", mainId);

    toast.success(
      action === "checkin"
        ? `✅ ${confirmDialog.guestName} fez check-in!`
        : `↩️ Check-in de ${confirmDialog.guestName} desfeito!`
    );

    setConfirmDialog({ open: false, guestId: "", guestName: "", action: "checkin" });
  };

  const totalGuests = useMemo(
    () => guests.reduce((acc, g) => acc + (g.companion ? 2 : 1), 0),
    [guests]
  );
  const checkedInTotal = useMemo(
    () =>
      guests.reduce(
        (acc, g) =>
          acc + (g.mainGuest.isCheckedIn ? 1 : 0) + (g.companion?.isCheckedIn ? 1 : 0),
        0
      ),
    [guests]
  );

  const GuestRow = ({ guest }: { guest: IndividualGuest }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pl-4">
      <div className="flex items-center gap-2">
        <User className="w-3 h-3 text-muted-foreground" />
        <p className="text-sm">{guest.name}</p>
      </div>
      <div className="flex items-center gap-2">
        {guest.isCheckedIn ? (
          <>
            <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" /> Check-in
            </Badge>
            <Button size="sm" variant="outline" onClick={() => handleUndoConfirm(guest.id, guest.name)}>
              <Undo2 className="w-3 h-3" />
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={() => handleCheckinConfirm(guest.id, guest.name)}>
            <CheckCircle className="w-3 h-3 mr-1" /> Check-in
          </Button>
        )}
      </div>
    </div>
  );

  const handleCheckinConfirm = (guestId: string, guestName: string) =>
    setConfirmDialog({ open: true, guestId, guestName, action: "checkin" });
  const handleUndoConfirm = (guestId: string, guestName: string) =>
    setConfirmDialog({ open: true, guestId, guestName, action: "undo" });

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h2>Sistema de Check-in de Convidados</h2>
          <p className="text-muted-foreground text-sm">
            {checkedInTotal} de {totalGuests} convidados fizeram check-in
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <Card className="p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-bold">{checkedInTotal}</p>
          <p className="text-xs md:text-sm text-muted-foreground">Convidados com Check-in</p>
        </Card>
        <Card className="p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-bold">{totalGuests - checkedInTotal}</p>
          <p className="text-xs md:text-sm text-muted-foreground">Convidados Restantes</p>
        </Card>
      </div>

      <Card className="p-4 md:p-6">
        <h3 className="mb-4">Fazer Check-in do Convidado</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Código de acesso ou nome"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchCode, true); // 🔹 pesquisa imediata
              }
            }}
            className="flex-1"
          />
          <div className="flex gap-2 sm:gap-3">
            <Button onClick={() => handleSearch(searchCode, true)} className="flex-1 sm:flex-initial">
              <Search className="w-4 h-4 mr-2" /> Procurar
            </Button>
            <Button variant="outline" onClick={() => setShowQRScanner(true)} className="px-3">
              <QrCode className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Código, nome ou QR</p>
        {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md mt-2">{error}</div>}

        {searchResult && (
          <div className="p-4 bg-accent rounded-lg space-y-3 mt-4">
            <GuestRow guest={searchResult.mainGuest} />
            {searchResult.companion && <GuestRow guest={searchResult.companion} />}
          </div>
        )}
      </Card>

      <Card className="p-4 md:p-6">
        <h3 className="mb-4">Todos os Convidados</h3>
        <div className="space-y-4">
          {guests.map((g) => (
            <div key={g.accessCode} className="p-3 bg-accent/50 rounded-lg space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                {g.companion ? <Users className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-primary" />}
                <div>
                  <p className="font-medium text-sm">Convite: {g.accessCode}</p>
                  <p className="text-xs text-muted-foreground">{g.companion ? "2 convidados" : "1 convidado"}</p>
                </div>
              </div>
              <GuestRow guest={g.mainGuest} />
              {g.companion && <GuestRow guest={g.companion} />}
            </div>
          ))}
        </div>
      </Card>

      <QRScanner isActive={showQRScanner} onScan={handleQRScan} onClose={() => setShowQRScanner(false)} />

      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.action === "checkin" ? "Confirmar Check-in" : "Desfazer Check-in"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.action === "checkin"
                ? `Tem a certeza que pretende fazer o check-in de ${confirmDialog.guestName}?`
                : `Tem a certeza que pretende desfazer o check-in de ${confirmDialog.guestName}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => updateCheckin(confirmDialog.guestId, confirmDialog.action)}>
              {confirmDialog.action === "checkin" ? "Confirmar Check-in" : "Desfazer Check-in"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
