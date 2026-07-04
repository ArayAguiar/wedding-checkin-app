'use client'

import { useState } from "react";
import { GuestLookup } from "@/components/auth/GuestLookup";
import { StaffLogin } from "@/components/auth/StaffLoginForm";
import { CheckIn } from "@/components/dashboard/CheckInInterface";
import { MobileNavigation } from "@/components/MobileNavigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Welcome } from "@/components/landing/Welcome";

type View = "home" | "guest-lookup" | "staff-login" | "staff-checkin";

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleStaffLogin = () => {
    setIsStaffLoggedIn(true);
    setCurrentView("staff-checkin");
  };

  const handleStaffLogout = () => {
    setIsStaffLoggedIn(false);
    setCurrentView("home");
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <Welcome onNavigate={(view) => setCurrentView(view)} />;
      case "guest-lookup":
        return <GuestLookup />;
      case "staff-login":
        return <StaffLogin onLogin={handleStaffLogin} />;
      case "staff-checkin":
        return <CheckIn />;
      default:
        return <Welcome onNavigate={(view) => setCurrentView(view)} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  const isHome = currentView === "home";

  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation
        currentView={currentView}
        isStaffLoggedIn={isStaffLoggedIn}
        onViewChange={setCurrentView}
      />

      <main className={isHome ? "relative" : "relative pt-14"}>
        {renderContent()}
      </main>
    </div>
  );
}