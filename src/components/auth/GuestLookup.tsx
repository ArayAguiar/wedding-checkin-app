// src/components/auth/GuestLookup.tsx
"use client"

import { useState, useTransition, useRef } from "react"
import { Users, CheckCircle2, Circle, Loader2 } from "lucide-react"
import { WeddingOtpInput } from "@/components/ui/wedding-otp-input"
import { WeddingButton } from "@/components/ui/wedding-button"
import { QRCodeGenerator } from "../QRCodeGenerator"
import { lookupGuest } from "@/app/guest/actions"

interface Guest {
  id: string
  nome: string
  acompanhante?: string
  mesa?: string
  codigo_acesso: string
  check_in: boolean
}

const errorMessages: Record<string, string> = {
  "not-found": "Não encontrámos esse código. Verifique se está correto e tente novamente.",
  "invalid-format": "O código deve ter 6 dígitos numéricos.",
  "server-error": "Algo correu mal do nosso lado. Por favor, tente novamente.",
  "empty": "Por favor, introduza o código de acesso.",
  default: "Não foi possível procurar. Tente novamente."
}

export function GuestLookup() {
  const [accessCode, setAccessCode] = useState("")
  const [foundGuest, setFoundGuest] = useState<Guest | null>(null)
  const [errorKey, setErrorKey] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const otpContainerRef = useRef<HTMLDivElement>(null)

  const performLookup = (code: string) => {
    if (code.length !== 6) {
      setErrorKey("empty")
      setFoundGuest(null)
      return
    }

    setErrorKey("")
    setFoundGuest(null)

    startTransition(async () => {
      const result = await lookupGuest(code)
      if (result.success && result.guest) {
        setFoundGuest(result.guest)
      } else {
        setErrorKey(result.error || "default")
        const firstInput = otpContainerRef.current?.querySelector("input")
        firstInput?.focus()
      }
    })
  }

  const handleOtpChange = (value: string) => {
    setAccessCode(value)
    if (errorKey) setErrorKey("")
    if (value.length === 6) {
      setTimeout(() => performLookup(value), 150)
    }
  }

  const handleLookup = () => {
    performLookup(accessCode)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && accessCode.length === 6) {
      handleLookup()
    }
  }

  const errorText = errorMessages[errorKey] || errorMessages.default

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-heading">Informações do Convidado</h2>
        <p className="text-body max-w-xs mx-auto">
          Introduza o seu código de acesso de 6 dígitos
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5" onKeyDown={handleKeyDown}>
        <div className="space-y-4">
          <p className="label block text-center">Código de Acesso</p>
          <WeddingOtpInput
            ref={otpContainerRef}
            value={accessCode}
            onChange={handleOtpChange}
            length={6}
            disabled={isPending}
            error={!!errorKey}
            ariaDescribedBy={errorKey ? "accessCode-error" : undefined}
            label="Código de acesso de 6 dígitos"
          />
          {errorKey && (
            <p
              id="accessCode-error"
              className="text-sm text-muted-foreground text-center"
              role="alert"
            >
              {errorText}
            </p>
          )}
        </div>

        <WeddingButton
          onClick={handleLookup}
          disabled={isPending || accessCode.length !== 6}
          className="w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              A procurar...
            </>
          ) : (
            "Procurar"
          )}
        </WeddingButton>
      </div>

      {/* Loading */}
      {isPending && (
        <div className="space-y-4 pt-2 animate-fade-in">
          <div className="h-px bg-border w-full" />
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-16 bg-muted rounded animate-pulse" />
              <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-3 w-32 bg-muted rounded animate-pulse" />
          </div>
        </div>
      )}

      {/* Result */}
      {!isPending && foundGuest && (
        <div className="space-y-8 pt-6 animate-fade-in">
          <div className="h-px bg-border w-full" />

          <div className="space-y-8 text-center">
            {/* Name */}
            <div className="space-y-2">
              <p className="label">Nome do Convidado</p>
              <p className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
                {foundGuest.nome}
              </p>
            </div>

            {/* Table */}
            {foundGuest.mesa && (
              <div className="space-y-2">
                <p className="label">Mesa</p>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted/50 border border-border">
                  <span className="font-display text-2xl text-foreground">
                    {foundGuest.mesa}
                  </span>
                </div>
              </div>
            )}

            {/* Companion — no label */}
            {foundGuest.acompanhante && (
              <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                <Users className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <span className="font-sans">{foundGuest.acompanhante}</span>
              </div>
            )}

            {/* Status — centered, no code */}
            <div className="text-center">
              {foundGuest.check_in ? (
                <span className="inline-flex items-center gap-1.5 badge badge-default">
                  <CheckCircle2 className="w-3 h-3" />
                  Check-in efetuado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 badge badge-outline">
                  <Circle className="w-3 h-3" />
                  Check-in pendente
                </span>
              )}
            </div>

            {/* QR */}
            <QRCodeGenerator
              accessCode={foundGuest.codigo_acesso}
              guestName={foundGuest.nome}
            />
          </div>
        </div>
      )}
    </div>
  )
}