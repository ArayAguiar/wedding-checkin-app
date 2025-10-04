"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Heart, Search, Shield, Home, Menu, LogOut } from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";
import CfLogoFull from "../imports/CfLogoFull";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { supabase } from "@/lib/supaBaseClient";

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

  // 👨‍💼 neste momento só verificamos se há utilizador; podes depois diferenciar por roles
  const isStaffLoggedIn = !!user;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onViewChange("home");
  };

  const navigationItems = [
    {
      id: "home" as View,
      label: "Início",
      icon: Home,
      onClick: () => onViewChange("home"),
    },
    {
      id: "guest-lookup" as View,
      label: "Convidados",
      icon: Search,
      onClick: () => onViewChange("guest-lookup"),
    },
    {
      id: isStaffLoggedIn ? "staff-checkin" : "staff-login",
      label: isStaffLoggedIn ? "Check-in Staff" : "Staff Login",
      icon: Shield,
      onClick: () =>
        onViewChange(isStaffLoggedIn ? "staff-checkin" : "staff-login"),
    },
  ];

  const handleNavClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  // enquanto carrega estado de auth
  if (loading) {
    return (
      <nav className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
          <CfLogoFull className="h-6 w-auto" />
          <span className="text-sm text-muted-foreground">A carregar...</span>
        </div>
      </nav>
    );
  }

  if (!isMobile) {
    // 🖥️ Desktop
    return (
      <nav className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center h-8">
              <CfLogoFull className="h-6 w-auto" />
            </div>
            <div className="flex gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  (item.id === "home" && currentView === "home") ||
                  (item.id === "guest-lookup" && currentView === "guest-lookup") ||
                  ((item.id === "staff-login" || item.id === "staff-checkin") &&
                    (currentView === "staff-login" || currentView === "staff-checkin"));


                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavClick(item.onClick)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
              {isStaffLoggedIn && (
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // 📱 Mobile
  return (
    <nav className="border-b bg-card">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 h-8">
            <CfLogoFull />
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Alternar menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-black-500" />
                  Cindy e Fausto
                </SheetTitle>
                <SheetDescription className="pt-6">
                  Navegue pelas diferentes secções do site do casamento
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-3 px-4 py-6">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    (item.id === "home" && currentView === "home") ||
                    (item.id === "guest-lookup" &&
                      currentView === "guest-lookup") ||
                    (item.id === "staff-portal" &&
                      (currentView === "staff-login" ||
                        currentView === "staff-checkin"));

                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => handleNavClick(item.onClick)}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  );
                })}
                {isStaffLoggedIn && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-5 h-5" />
                    Sair
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
