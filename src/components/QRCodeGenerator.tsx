import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Download, QrCode } from 'lucide-react';

interface QRCodeGeneratorProps {
  accessCode: string;
  guestName?: string;
}

export function QRCodeGenerator({ accessCode, guestName }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      // Use a QR code API service
      const qrData = encodeURIComponent(accessCode);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}&bgcolor=ffffff&color=000000&format=png&ecc=M`;
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Erro ao gerar código QR:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `QR-${accessCode}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (accessCode) {
      generateQRCode();
    }
  }, [accessCode]);

  if (!accessCode) return null;

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-6 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="w-5 h-5" />
            <h3 className="font-serif">Código QR</h3>
          </div>
          
          {qrCodeUrl ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg inline-block border">
                <img 
                  src={qrCodeUrl} 
                  alt={`QR Code para ${accessCode}`}
                  className="w-48 h-48 mx-auto"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {guestName && `Para: ${guestName}`}
                </p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {accessCode}
                </p>
              </div>
              
              <Button 
                onClick={downloadQRCode}
                variant="outline"
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Descarregar QR Code
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48">
              {isGenerating ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">A gerar código QR...</p>
                </div>
              ) : (
                <Button onClick={generateQRCode} variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar Código QR
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}