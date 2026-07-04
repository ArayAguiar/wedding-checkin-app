import { StaffLogin } from "@/components/auth/StaffLoginForm"

export const metadata = {
  title: "Portal de Funcionários | Casamento Cindy e Fausto",
  description: "Acesso reservado à equipa do casamento",
}

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <StaffLogin />
    </main>
  )
}