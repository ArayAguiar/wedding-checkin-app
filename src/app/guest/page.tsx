// src/app/guest/page.tsx
import { GuestLookup } from "@/components/auth/GuestLookup"

export const metadata = {
  title: "Informações do Convidado | Casamento Cindy e Fausto",
  description: "Introduza o seu código de acesso para visualizar os detalhes da reserva",
}

export default function GuestPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl p-8 md:p-10 shadow-sm">
          <GuestLookup />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 text-center">
        <a href="/staff" className="staff-link">
          Acesso da Equipe
        </a>
      </div>
    </main>
  )
}