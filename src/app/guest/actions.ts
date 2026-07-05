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

export async function lookupGuest(accessCode: string): Promise<{ success: boolean; guest?: Guest; error?: string }> {
  if (!accessCode.trim()) {
    return { success: false, error: "Por favor, introduza o código de acesso" }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .ilike("codigo_acesso", accessCode.trim())
    .single()

  if (error) {
    return { success: false, error: "Erro ao procurar o convidado. Tente novamente." }
  }

  if (!data) {
    return { success: false, error: "Código de acesso não encontrado. Por favor, verifique o código e tente novamente." }
  }

  return { success: true, guest: data as Guest }
}