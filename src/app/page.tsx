'use client'

import { useState } from "react";
import { GuestLookup } from "@/components/GuestLookup";
import { StaffLogin } from "@/components/StaffLogin";
import { CheckIn } from "@/components/CheckIn";
import { MobileNavigation } from "@/components/MobileNavigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Welcome } from "@/components/Welcome";

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
        return <Welcome />;
      case "guest-lookup":
        return <GuestLookup />;
      case "staff-login":
        return <StaffLogin onLogin={handleStaffLogin} />;
      case "staff-checkin":
        return <CheckIn onLogout={handleStaffLogout} />;
      default:
        return <Welcome />;
    }
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation
        currentView={currentView}
        isStaffLoggedIn={isStaffLoggedIn}
        onViewChange={setCurrentView}
      />

      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
          <div className="w-full max-w-6xl">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
