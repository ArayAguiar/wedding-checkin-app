import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

// lê as variáveis do ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON!;

// cria a função que retorna o client Supabase
export function createClient() {
  return supabaseCreateClient(supabaseUrl, supabaseAnonKey);
}
