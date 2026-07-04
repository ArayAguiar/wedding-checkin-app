import { GuestLookup } from "@/components/auth/GuestLookup"

export const metadata = {
  title: "Informações do Convidado | Casamento Cindy e Fausto",
  description: "Introduza o seu código de acesso para visualizar os detalhes da reserva",
}

export default function GuestPage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <GuestLookup />
      </div>
    </main>
  )
}