import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, Clock, Heart, QrCode } from "lucide-react";
import { ElegantWeddingInfo } from "./Welcome";
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
      {/* Elegant Wedding Info Component */}
      <ElegantWeddingInfo />



      {/* Traditional Wedding Details */}
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heart className="w-10 h-10 md:w-12 md:h-12 mx-auto text-pink-500" />
          <h1 className="text-2xl md:text-4xl font-serif">Cindy e Fausto</h1>
          <p className="text-lg md:text-xl text-muted-foreground">18 de Outubro, 2025</p>
        </div>


        {/* Ceremony */}
        <Card className="p-4 md:p-8">
          <div className="flex items-start gap-3 md:gap-4">
            <Clock className="w-6 h-6 text-primary mt-1" />
            <div className="space-y-2">
              <h2>Cerimónia Religiosa</h2>
              <p className="text-muted-foreground">16:00</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p>Igreja Metodista Unida John Wesley</p>
                  <p className="text-sm text-muted-foreground">
                    Para a cerimónia religiosa
                  </p>
                  <a 
                    href="https://www.google.com/maps/place/Igreja+Metodista+Unida+John+Wesley/@-8.9408388,13.1987105,21z/data=!4m6!3m5!1s0x1a521ff9b6777021:0xdc4f35f06717e0d5!8m2!3d-8.9465058!4d13.2094246!16s%2Fg%2F11g2zwj9vs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Ver no mapa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Reception */}
        <Card className="p-4 md:p-8">
          <div className="flex items-start gap-3 md:gap-4">
            <Clock className="w-6 h-6 text-primary mt-1" />
            <div className="space-y-2">
              <h2>Cerimónia Civil e Recepção</h2>
              <p className="text-muted-foreground">10:00 - 23:00</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p>Salão de Festas Pingo D'Ouro</p>
                  <p className="text-sm text-muted-foreground">
                    Para a cerimónia civil e recepção
                  </p>
                  <a 
                    href="https://www.google.com/maps/place/Sal%C3%A3o+de+Festas+Pingo+Douro/@-8.9802384,13.1939844,17z/data=!3m1!4b1!4m6!3m5!1s0x1a521f97a56a9daf:0xe3ce2a58ba25503d!8m2!3d-8.9802437!4d13.1965593!16s%2Fg%2F11q4m2x6m1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Ver no mapa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <Card className="p-4 md:p-8">
          <h2 className="mb-4">Informações Importantes</h2>
          <div className="space-y-3 text-sm md:text-base">
            <p>• Cerimónia Civil às 10:00 no Salão Pingo D'Ouro</p>
            <p>• Cerimónia Religiosa às 16:00 na Igreja John Wesley</p>
            <p>• Copo d'água às 19:30 no Salão Pingo D'Ouro</p>
            <p>• Código de vestuário: Traje formal</p>
            <p>• Por favor, cheguem 15 minutos antes de cada cerimónia</p>
          </div>
        </Card>

        
      </div>
    </div>
  );
}