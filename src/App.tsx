// DEPRECATED: This is a legacy App.tsx file. 
// The project now uses Next.js App Router with /app/page.tsx as the entry point.
// This file is kept for reference but should not be used.

import { useState } from "react";
import { WeddingInfo } from "./components/WeddingInfo";
import { GuestLookup } from "./components/GuestLookup";
import { StaffLogin } from "./components/StaffLogin";
import { CheckinInterface } from "./components/CheckIn";
import { MobileNavigation } from "./components/MobileNavigation";

type View = "home" | "guest-lookup" | "staff-login" | "staff-checkin";

// DEPRECATED: Use /app/page.tsx instead
export default function LegacyApp() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);

  const handleStaffLogin = () => {
    setIsStaffLoggedIn(true);
    setCurrentView("staff-checkin");
  };

  const handleStaffLogout = () => {
    setIsStaffLoggedIn(false);
    setCurrentView("home");
  };

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <WeddingInfo />;
      case "guest-lookup":
        return <GuestLookup />;
      case "staff-login":
        return <StaffLogin onLogin={handleStaffLogin} />;
      case "staff-checkin":
        return <CheckinInterface onLogout={handleStaffLogout} />;
      default:
        return <WeddingInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation
        currentView={currentView}
        isStaffLoggedIn={isStaffLoggedIn}
        onViewChange={setCurrentView}
      />
      <main className="max-w-6xl mx-auto px-4 py-4 md:py-8">
        {renderContent()}
      </main>
    </div>
  );
}