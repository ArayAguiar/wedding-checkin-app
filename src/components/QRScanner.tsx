"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, CameraOff, X, Keyboard } from "lucide-react";
import jsQR from "jsqr";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
  isActive: boolean;
}

export function QRScanner({ onScan, onClose, isActive }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [highlightDetected, setHighlightDetected] = useState(false);
  const scannedRef = useRef(false);

  // ── Camera lifecycle ──
  // Only runs when isActive toggles. Cleanup stops all tracks on unmount.
  useEffect(() => {
    if (!isActive || !videoRef.current) return;

    let mounted = true;

    const initCamera = async () => {
      try {
        setIsLoading(true);
        setError("");

        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Acesso à câmara não suportado neste navegador");
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        });

        if (!mounted) {
          // Race: component unmounted before camera returned. Clean up.
          mediaStream.getTracks().forEach((t) => t.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          setHasCamera(true);
        }

        setIsLoading(false);
      } catch (err: any) {
        if (!mounted) return;
        console.warn(err);
        setHasCamera(false);
        setIsLoading(false);
        setShowManualInput(true);
        setError(err?.message || "Falha ao aceder à câmara. Introduza o código manualmente.");
      }
    };

    initCamera();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isActive]);

  // ── Scan loop ──
  // Depends on [stream] only. onScan is NOT here — it is passed via ref
  // to avoid re-subscribing every time parent re-renders.
  useEffect(() => {
    if (!isActive || !stream || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let animationFrameId: number;
    let running = true;

    const scan = async () => {
      if (!running || !video || !ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
        if (running) animationFrameId = requestAnimationFrame(scan);
        return;
      }

      const scale = 0.25;
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imgData.data, imgData.width, imgData.height);

      if (code?.data && !scannedRef.current) {
        scannedRef.current = true;
        const result = code.data.trim().toUpperCase();
        setHighlightDetected(true);
        // Stop camera before calling parent — prevents race
        stream.getTracks().forEach((t) => t.stop());
        setStream(null);
        onScan(result);
        return;
      }

      animationFrameId = requestAnimationFrame(scan);
    };

    scan();
    return () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [stream, isActive]);

  // ── Reset when reopened ──
  useEffect(() => {
    if (isActive) {
      scannedRef.current = false;
      setHighlightDetected(false);
      setManualCode("");
      setShowManualInput(false);
      setError("");
    }
  }, [isActive]);

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setManualCode("");
    setShowManualInput(false);
    setHighlightDetected(false);
    onClose();
  };

  const handleManualSubmit = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (manualCode.trim()) onScan(manualCode.trim().toUpperCase());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleManualSubmit();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2">
              {hasCamera && !showManualInput ? <Camera className="w-5 h-5" /> : <Keyboard className="w-5 h-5" />}
              {hasCamera && !showManualInput ? "Digitalizar Código QR" : "Introduzir Código"}
            </h3>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground mb-2">A inicializar câmara...</p>
              <p className="text-xs text-muted-foreground">Permita o acesso à câmara no seu navegador</p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}

          {hasCamera && !error && !showManualInput && (
            <div className="space-y-3">
              <div
                className={`relative aspect-square rounded-lg overflow-hidden bg-black min-h-[250px] md:min-h-[300px] border-4 ${
                  highlightDetected ? "border-lime-500" : "border-transparent"
                } transition-colors duration-300`}
              >
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted autoPlay />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground text-center">
                Posicione o código QR dentro da vista da câmara
              </p>
              <Button variant="outline" onClick={() => { if (stream) { stream.getTracks().forEach((t) => t.stop()); setStream(null); } setShowManualInput(true); }} className="w-full">
                <Keyboard className="w-4 h-4 mr-2" /> Introduzir código manualmente
              </Button>
            </div>
          )}

          {(!hasCamera || showManualInput) && !isLoading && (
            <div className="space-y-4">
              {!hasCamera && (
                <div className="text-center py-4 space-y-3">
                  <CameraOff className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Câmara não disponível - use o código manualmente</p>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium">Código de Acesso</label>
                <Input
                  placeholder="Ex: CAS001"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                  onKeyDown={handleKeyPress}
                  className="uppercase"
                />
                <Button onClick={handleManualSubmit} disabled={!manualCode.trim()} className="w-full">
                  Submeter Código
                </Button>
              </div>

              {hasCamera && !highlightDetected && (
                <Button variant="outline" onClick={() => { setShowManualInput(false); }} className="w-full">
                  <Camera className="w-4 h-4 mr-2" /> Tentar câmara novamente
                </Button>
              )}
            </div>
          )}

          <Button onClick={handleClose} variant="outline" className="w-full">
            Cancelar
          </Button>
        </div>
      </Card>
    </div>
  );
}