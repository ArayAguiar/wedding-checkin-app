// src\components\MobileNavigation.tsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Search, Home, Menu, LogOut, ArrowLeft } from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { createClient } from "@/lib/supabase/client";

type View = "home" | "guest-lookup" | "staff-login" | "staff-checkin";

interface MobileNavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isStaffLoggedIn: boolean;
}

export function MobileNavigation({
  currentView,
  onViewChange,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, loading } = useSupabaseUser();
  const isStaffLoggedIn = !!user;
  const isHome = currentView === "home";
  
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    onViewChange("home");
  };

  const handleBackHome = () => {
    onViewChange("home");
  };

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center items-center">
          <span className="font-serif text-sm tracking-[0.15em] uppercase text-foreground">
            CINDY <span className="font-display">&</span> FAUSTO
          </span>
        </div>
      </header>
    );
  }

  // HOME: No navigation
  if (isHome) {
    return null;
  }

  // Desktop non-home: minimal header
  if (!isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBackHome}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-xs font-light tracking-wider uppercase">
              Voltar
            </span>
          </button>

          <span className="font-serif text-sm tracking-[0.15em] uppercase text-foreground">
            CINDY <span className="font-display">&</span> FAUSTO
          </span>

          <div className="flex items-center gap-2">
            {currentView === "guest-lookup" && (
              <span className="font-sans text-xs font-light tracking-wider text-muted-foreground">
                Convidados
              </span>
            )}
            {(currentView === "staff-login" || currentView === "staff-checkin") && (
              <span className="font-sans text-xs font-light tracking-wider text-muted-foreground">
                Equipe
              </span>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Mobile non-home
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleBackHome}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-xs font-light tracking-wider uppercase">
              Voltar
            </span>
          </button>

          <span className="font-serif text-xs tracking-[0.15em] uppercase text-foreground">
            CINDY <span className="font-display">&</span> FAUSTO
          </span>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-4 h-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetHeader className="border-b border-border pb-4">
                <SheetTitle className="font-serif text-lg tracking-[0.1em] uppercase text-foreground">
                  CINDY <span className="font-display">&</span> FAUSTO
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-11 font-sans text-sm font-light"
                  onClick={() => { onViewChange("home"); setIsOpen(false); }}
                >
                  <Home className="w-4 h-4" />
                  Início
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-11 font-sans text-sm font-light"
                  onClick={() => { onViewChange("guest-lookup"); setIsOpen(false); }}
                >
                  <Search className="w-4 h-4" />
                  Convidados
                </Button>

                {isStaffLoggedIn && (
                  <>
                    <div className="my-3 border-t border-border" />
                    <p className="px-3 label mb-2">Equipe</p>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-11 font-sans text-sm font-light"
                      onClick={() => { onViewChange("staff-checkin"); setIsOpen(false); }}
                    >
                      <Search className="w-4 h-4" />
                      Check-in
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-11 font-sans text-sm font-light text-muted-foreground"
                      onClick={() => { handleSignOut(); setIsOpen(false); }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}