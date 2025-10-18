"use client"

import { useState, useCallback } from "react"

export function useToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([])

  const toast = useCallback(({ title, description }: { title?: string; description?: string }) => {
    const message = title || description
    if (!message) return

    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return { toast, toasts }
}
