'use server'

import { createClient } from '@/lib/supabase/server'

export async function lookupGuest(accessCode: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .ilike('codigo_acesso', accessCode.trim())
    .single()
  
  if (error || !data) {
    return { success: false, error: 'Codigo nao encontrado' }
  }
  
  return { success: true, guest: data }
}