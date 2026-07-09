'use client'

import { useEffect } from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CheckInErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function CheckInError({ error, reset }: CheckInErrorProps) {
  useEffect(() => {
    console.error('Check-in dashboard error:', error)
  }, [error])

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 bg-background">
      <div className="text-center max-w-sm">
        <h2 className="font-display text-2xl mb-3">Algo deu errado</h2>
        <p className="font-sans text-muted-foreground text-sm mb-8 leading-relaxed">
          Nao foi possivel carregar os convidados. Tente novamente.
        </p>
        <div className="flex flex-col gap-3">
          <Button onClick={reset} className="w-full h-12">
            Tentar Novamente
          </Button>
          <Button variant="outline" asChild className="w-full h-12">
            <a href="/staff">
              <LogOut className="w-4 h-4 mr-2" />
              Voltar ao Login
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}