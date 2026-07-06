// src/app/page.tsx
import { Welcome } from "@/components/landing/Welcome"

export const metadata = {
  title: "Casamento Cindy e Fausto",
  description: "Junte-se a nós para celebrar o nosso dia especial - 18 de Outubro de 2025",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* First-load overlay — CSS only, auto-hides */}
      <div className="loading-overlay" aria-hidden="true">
        <div className="loading-monogram">
          <span className="loading-monogram-c">C</span>
          <span className="loading-monogram-amp">&</span>
          <span className="loading-monogram-f">F</span>
        </div>
        <div className="loading-line" />
      </div>
      
      <Welcome />
    </main>
  )
}