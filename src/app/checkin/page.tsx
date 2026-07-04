// src\app\checkin\page.tsx
import { CheckIn } from "@/components/dashboard/CheckInInterface"

export const metadata = {
  title: "Check-in | Casamento Cindy e Fausto",
  description: "Sistema de check-in de convidados",
}

export default function CheckInPage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-12">
      <CheckIn />
    </main>
  )
}