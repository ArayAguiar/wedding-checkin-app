import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, Clock, Heart, QrCode } from "lucide-react";
import { Welcome } from "./Welcome";
import { QRCodeGenerator } from "./QRCodeGenerator";

// Mock guest data for demonstration
const mockGuests = [
  { accessCode: "CAS001", name: "Maria Silva", companion: "João Silva" },
  { accessCode: "CAS002", name: "Ana Santos", companion: "" },
  { accessCode: "CAS003", name: "Pedro Costa", companion: "Sofia Costa" },
];

export function WeddingInfo() {
  const [accessCode, setAccessCode] = useState("");
  const [foundGuest, setFoundGuest] = useState<any>(null);
  const [showQR, setShowQR] = useState(false);

  const handleAccessCodeSubmit = () => {
    const guest = mockGuests.find(g => g.accessCode.toUpperCase() === accessCode.toUpperCase());
    if (guest) {
      setFoundGuest(guest);
      setShowQR(true);
    } else {
      alert("Código de acesso não encontrado. Tente novamente.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAccessCodeSubmit();
    }
  };

  return (
    <div className="space-y-8">
      {/* Wedding Welcome Component */}
      <Welcome />
    </div>
  );
}