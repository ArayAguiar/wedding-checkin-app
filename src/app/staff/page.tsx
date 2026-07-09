import { StaffLogin } from "@/components/auth/StaffLoginForm"

export const metadata = {
  title: "Acesso da Equipe | Casamento Cindy e Fausto",
  description: "Acesso reservado à equipa do casamento",
}

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <StaffLogin />
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 text-center">
        <a href="/" className="staff-link">
          Voltar ao início
        </a>
      </div>
    </main>
  )
}