"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function CheckInError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <AlertTriangle className="w-12 h-12 mx-auto text-destructive" />
        <div className="space-y-2">
          <h1 className="text-xl font-serif">Erro no Sistema de Check-in</h1>
          <p className="text-muted-foreground text-sm">
            Não foi possível carregar os dados. Por favor, tente novamente.
          </p>
        </div>
        <Button onClick={reset}>Tentar novamente</Button>
      </div>
    </main>
  )
}