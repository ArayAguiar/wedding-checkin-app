// src/app/test/page.tsx
import { GuestLookup } from "@/components/auth/GuestLookup"

export const metadata = {
  title: "Test — Guest Lookup",
}

export default function TestPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <GuestLookup />
      </div>
    </main>
  )
}