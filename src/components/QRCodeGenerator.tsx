// src/components/QRCodeGenerator.tsx
"use client"

import { useState, useEffect } from "react"
import { Download, QrCode, X, Maximize2 } from "lucide-react"
import { Button } from "./ui/button"

interface QRCodeGeneratorProps {
  accessCode: string
  guestName?: string
}

export function QRCodeGenerator({ accessCode, guestName }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (accessCode) {
      const qrData = encodeURIComponent(accessCode)
      setQrCodeUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qrData}&bgcolor=ffffff&color=1a1a1a&format=png&ecc=M`
      )
    }
  }, [accessCode])

  const downloadQRCode = () => {
    if (!qrCodeUrl) return
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `QR-${accessCode}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!accessCode) return null

  return (
    <>
      {/* Preview */}
      <button
        onClick={() => setIsExpanded(true)}
        className="group w-full text-center space-y-3 pt-4"
      >
        <div className="inline-block p-2 bg-white rounded-lg">
          <img
            src={qrCodeUrl}
            alt="Código QR"
            className="w-28 h-28 aspect-square object-contain"
          />
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
          <Maximize2 className="w-3 h-3" />
          <span className="font-sans">Toque para ampliar</span>
        </div>
      </button>

      {/* Expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fade-in"
          onClick={() => setIsExpanded(false)}
        >
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="space-y-6 text-center max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              <p className="label">Código QR</p>
              {guestName && (
                <p className="font-serif text-lg text-foreground">{guestName}</p>
              )}
            </div>

            <div className="p-4 bg-white rounded-xl inline-block">
              <img
                src={qrCodeUrl}
                alt="Código QR ampliado"
                className="w-64 h-64 aspect-square object-contain"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={downloadQRCode}
            >
              <Download className="w-4 h-4" />
              Descarregar QR Code
            </Button>
          </div>
        </div>
      )}
    </>
  )
}