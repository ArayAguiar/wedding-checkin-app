"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { supabase } from "@/lib/supaBaseClient";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { QRScanner } from "@/components/QRScanner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Camera, Search, Check, Undo2, Users, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

interface Guest {
  id: string;
  nome: string;
  acompanhante?: string;
  mesa?: string;
  codigo_acesso: string;
  check_in: boolean;
  check_in_acomp?: boolean;
}

export function CheckIn() {
  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    guestId: string | null;
    guestName: string;
    action: "checkin" | "undo";
    companion?: boolean;
  }>({ open: false, guestId: null, guestName: "", action: "checkin" });

  const [totalGuests, setTotalGuests] = useState(0);
  const [checkedIn, setCheckedIn] = useState(0);

  const debouncedSearch = useDebounce(search, 500);
  const isInitialLoad = isLoading && guests.length === 0;

  const perPage = 20;
  const pageRef = useRef(0);

  const fetchGuests = useCallback(
    async (searchTerm = "", reset = true) => {
      if (reset) pageRef.current = 0;
      setIsLoading(true);

      try {
        let query = supabase
          .from("guests")
          .select("*")
          .order("nome", { ascending: true })
          .range(pageRef.current * perPage, pageRef.current * perPage + perPage - 1);

        if (searchTerm) {
          query = query.or(
            `nome.ilike.%${searchTerm}%,codigo_acesso.ilike.%${searchTerm}%`
          );
        }

        const { data, error } = await query;
        if (error) throw error;
        if (!data) return;

        setGuests((prev) => (reset ? data : [...prev, ...data]));
      } catch (err: any) {
        console.error(err);
        toast.error("Erro ao buscar convidados");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchTotals = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("guests").select("*");
      if (error) throw error;
      if (!data) return;

      setTotalGuests(
        data.reduce((acc, g) => acc + 1 + (g.acompanhante ? 1 : 0), 0)
      );
      setCheckedIn(
        data.reduce(
          (acc, g) =>
            acc +
            (g.check_in ? 1 : 0) +
            (g.acompanhante && g.check_in_acomp ? 1 : 0),
          0
        )
      );
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchGuests();
    fetchTotals();
  }, [fetchGuests, fetchTotals]);

  useEffect(() => {
    fetchGuests(debouncedSearch);
  }, [debouncedSearch, fetchGuests]);

  const handleQRScan = (result: string) => {
    setSearch(result);
    fetchGuests(result);
    setScannerActive(false);
  };

  const handleCheckIn = async (guest: Guest, companion = false) => {
    setConfirmDialog({
      open: true,
      guestId: guest.id,
      guestName: companion ? guest.acompanhante! : guest.nome,
      action: companion
        ? guest.check_in_acomp
          ? "undo"
          : "checkin"
        : guest.check_in
          ? "undo"
          : "checkin",
      companion,
    });
  };

  const updateCheckIn = async () => {
    const { guestId, action, companion } = confirmDialog;
    if (!guestId) return;

    try {
      const updateData = companion
        ? { check_in_acomp: action === "checkin" }
        : { check_in: action === "checkin" };

      const { error } = await supabase.from("guests").update(updateData).eq("id", guestId);
      if (error) throw error;

      toast.success(
        action === "checkin" ? "Check-in realizado!" : "Check-in desfeito!"
      );

      fetchGuests(debouncedSearch);
      fetchTotals();
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao atualizar check-in");
    } finally {
      setConfirmDialog({ open: false, guestId: null, guestName: "", action: "checkin" });
    }
  };

  // Lazy load more on scroll
  const observer = useRef<IntersectionObserver>();
  const lastGuestRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          pageRef.current += 1;
          fetchGuests(debouncedSearch, false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, fetchGuests, debouncedSearch]
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-4">
      {/* Stats cards */}
      <div className="overflow-x-auto whitespace-nowrap mb-4">
        <div className="flex gap-3 min-w-max">
          <Card className="flex-none p-4 text-center">
            <div className="flex justify-center items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              {isInitialLoad ? (
                <Skeleton className="h-6 w-8" />
              ) : (
                <p className="text-xl font-bold">{checkedIn}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Convidados com Check-in</p>
          </Card>

          <Card className="flex-none p-4 text-center">
            <div className="flex justify-center items-center gap-2">
              <Undo2 className="w-5 h-5 text-red-500" />
              {isInitialLoad ? (
                <Skeleton className="h-6 w-8" />
              ) : (
                <p className="text-xl font-bold">{totalGuests - checkedIn}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Convidados Restantes</p>
          </Card>

          <Card className="flex-none p-4 text-center">
            <div className="flex justify-center items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {isInitialLoad ? (
                <Skeleton className="h-6 w-8" />
              ) : (
                <p className="text-xl font-bold">{totalGuests}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Total de Convidados</p>
          </Card>
        </div>
      </div>


      {/* Search & QR */}
      <Card className="p-4 space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Pesquisar por nome ou código"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => fetchGuests(search)}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setScannerActive(true)}
          disabled={scannerActive}
          className="w-full mt-2 flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4" /> Digitalizar Código QR
        </Button>
      </Card>

      {/* Guest list */}
      <div className="space-y-3">
        {isInitialLoad &&
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={`skeleton-${i}`} className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="border-t border-muted-foreground/40 my-2" />
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </Card>
          ))}

        {!isInitialLoad && guests.map((guest, index) => {
          const isLast = index === guests.length - 1;
          return (
            <Card key={guest.id} className="p-4 space-y-2">
              {/* Top line: invitation info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {guest.acompanhante ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  <p className="font-medium">Convite: {guest.codigo_acesso}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-muted-foreground/40 my-2" />

              {/* Main guest */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <p>{guest.nome}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleCheckIn(guest)}
                  variant={guest.check_in ? "outline" : "default"}
                >
                  {guest.check_in ? <Undo2 className="w-4 h-4 mr-1" /> : <Check className="w-4 h-4 mr-1" />}
                  {guest.check_in ? "Undo" : "Check-in"}
                </Button>
              </div>

              {/* Companion, if exists */}
              {guest.acompanhante && (
                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <p>{guest.acompanhante}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleCheckIn(guest, true)}
                    variant={guest.check_in_acomp ? "outline" : "default"}
                  >
                    {guest.check_in_acomp ? <Undo2 className="w-4 h-4 mr-1" /> : <Check className="w-4 h-4 mr-1" />}
                    {guest.check_in_acomp ? "Undo" : "Check-in"}
                  </Button>
                </div>
              )}
            </Card>

          );
        })}
        {isLoading && !isInitialLoad && (
          <Loader2 className="w-6 h-6 animate-spin mx-auto my-4" />
        )}
      </div>

      {/* QR Scanner */}
      <QRScanner onScan={handleQRScan} onClose={() => setScannerActive(false)} isActive={scannerActive} />

      {/* Confirm / Undo Alert */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          setConfirmDialog((prev) => ({ ...prev, open }))
        }
      >
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
            <AlertDialogAction onClick={updateCheckIn}>
              {confirmDialog.action === "checkin" ? "Confirmar Check-in" : "Desfazer Check-in"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}