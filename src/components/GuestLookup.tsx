"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, Users, User } from "lucide-react"
import { QRCodeGenerator } from "./QRCodeGenerator"
import { supabase } from "@/lib/supaBaseClient"

interface Guest {
  id: string
  nome: string
  acompanhante?: string
  mesa?: string
  codigo_acesso: string
  check_in: boolean
  created_at: string
  staff_id?: string
  event_id?: string
  host?: string
}

export function GuestLookup() {
  const [accessCode, setAccessCode] = useState("")
  const [foundGuest, setFoundGuest] = useState<Guest | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLookup = async () => {
    setError("")
    setFoundGuest(null)

    if (!accessCode.trim()) {
      setError("Por favor, introduza o seu código de acesso")
      return
    }

    setLoading(true)

    const { data, error: supaError } = await supabase
      .from("guests")
      .select("*")
      .ilike("codigo_acesso", accessCode.trim())

    console.log("DEBUG Supabase response:", { data, supaError })

    setLoading(false)

    if (supaError) {
      setError("Erro ao procurar o convidado. Tente novamente.")
      return
    }

    if (!data || data.length === 0) {
      setError("Código de acesso não encontrado. Por favor, verifique o código e tente novamente.")
      return
    }

    setFoundGuest(data[0] as Guest)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLookup()
  }

  return (
    <div className="max-w-md mx-auto space-y-4 md:space-y-6">
      {/* --- interface UX/UI mantida --- */}
      <div className="text-center space-y-2">
        <Search className="w-8 h-8 mx-auto text-primary" />
        <h2>Informações do Convidado</h2>
        <p className="text-muted-foreground text-sm">
          Introduza o seu código de acesso para visualizar os detalhes da reserva
        </p>
      </div>

      <Card className="p-4 md:p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="accessCode">Código de Acesso</label>
          <Input
            id="accessCode"
            placeholder="Ex: CAS001"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            onKeyPress={handleKeyPress}
            className="uppercase"
          />
        </div>

        <Button onClick={handleLookup} className="w-full" disabled={loading}>
          <Search className="w-4 h-4 mr-2" />
          {loading ? "A procurar..." : "Procurar"}
        </Button>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
            {error}
          </div>
        )}

        {foundGuest && (
          <div className="mt-6 p-4 bg-accent rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              {foundGuest.acompanhante ? (
                <Users className="w-5 h-5 text-primary" />
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
              <h3>Detalhes da Reserva</h3>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Nome do Convidado</p>
                <p>{foundGuest.nome}</p>
              </div>

              {foundGuest.acompanhante && (
                <div>
                  <p className="text-sm text-muted-foreground">Acompanhante</p>
                  <p>{foundGuest.acompanhante}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Código de Acesso</p>
                <p className="font-mono">{foundGuest.codigo_acesso}</p>
              </div>

              {foundGuest.mesa && (
                <div>
                  <p className="text-sm text-muted-foreground">Mesa</p>
                  <p>{foundGuest.mesa}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <p>{foundGuest.check_in ? "✅ Presente" : "❌ Não fez check-in"}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {foundGuest && (
        <QRCodeGenerator
          accessCode={foundGuest.codigo_acesso}
          guestName={foundGuest.nome}
        />
      )}
    </div>
  )
}
