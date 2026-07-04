// src/app/page.tsx
import { Welcome } from "@/components/landing/Welcome"

export const metadata = {
  title: "Casamento Cindy e Fausto",
  description: "Junte-se a nós para celebrar o nosso dia especial - 18 de Outubro de 2025",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Welcome />
    </main>
  )
}