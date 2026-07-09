import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CheckInInterface from '@/components/dashboard/CheckInInterface'

export const metadata = {
  title: 'Check-in | Equipe',
}

export default async function CheckInPage() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/staff')
  }

  const { data: rows, error } = await supabase
    .from('guests')
    .select('id, nome, acompanhante, mesa, codigo_acesso, check_in, check_in_acomp')
    .order('nome', { ascending: true })

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(`Erro ao carregar convidados: ${error.message}`)
  }

  const initialGuests = (rows || []).map((g: any) => ({
    id: g.id,
    name: g.nome,
    table: g.mesa,
    companionName: g.acompanhante || undefined,
    companionCount: g.acompanhante ? 1 : 0,
    checkedIn: g.check_in || false,
    companionCheckedIn: g.check_in_acomp || false,
    codigo_acesso: g.codigo_acesso,
  }))

  return <CheckInInterface initialGuests={initialGuests} />
}