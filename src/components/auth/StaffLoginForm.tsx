"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, LogIn, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

export function StaffLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    setError("")
    setIsSubmitting(true)

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    })

    if (authError) {
      setError("Nome de utilizador ou palavra-passe incorretos")
      setIsSubmitting(false)
    } else if (data?.user) {
      router.push("/checkin")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted/50">
          <Lock className="w-6 h-6 text-foreground" strokeWidth={1.5} />
        </div>
        <h1 className="text-heading">Acesso da Equipe</h1>
        <p className="text-body">Credenciais de administrador</p>
      </div>

      {/* Form */}
      <div className="bg-card rounded-2xl p-8 space-y-6 shadow-sm">
        <div className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="label block">
              Utilizador
            </label>
            <Input
              id="username"
              type="email"
              placeholder="staff@casamento.pt"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
              aria-describedby={error ? "login-error" : undefined}
              aria-invalid={error ? "true" : "false"}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="label block">
              Palavra-passe
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSubmitting}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-0 bottom-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              id="login-error"
              className="text-sm text-center text-muted-foreground"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            onClick={handleLogin}
            disabled={isSubmitting || !username || !password}
            className="w-full"
          >
            {isSubmitting ? (
              "A entrar..."
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Entrar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}