'use client'

import { useState } from "react"
import { LoadingScreen } from "@/components/LoadingScreen"
import { Welcome } from "@/components/landing/Welcome"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        <Welcome />
      </main>
    </div>
  )
}