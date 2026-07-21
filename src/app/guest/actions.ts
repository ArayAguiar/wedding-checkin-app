// src/app/guest/actions.ts
"use server"

import { createClient } from "@/lib/supabase/server"

interface Guest {
  id: string
  nome: string
  acompanhante?: string
  mesa?: string
  codigo_acesso: string
  check_in: boolean
}

export async function lookupGuest(accessCode: string): Promise<{
  success: boolean
  guest?: Guest
  error?: "not-found" | "invalid-format" | "server-error" | "empty"
}> {
  const code = accessCode.trim()

  if (!code) {
    return { success: false, error: "empty" }
  }

  // 6 digits only
  const formatRegex = /^\d{6}$/
  if (!formatRegex.test(code)) {
    return { success: false, error: "invalid-format" }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("guests")
    .select("id, nome, acompanhante, mesa, codigo_acesso, check_in")
    .eq("codigo_acesso", code)
    .single()

  if (error) {
    console.error("Supabase error:", error)
    return { success: false, error: "server-error" }
  }

  if (!data) {
    return { success: false, error: "not-found" }
  }

  return { success: true, guest: data as Guest }
}