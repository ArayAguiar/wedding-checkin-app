"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ToastContainerProps {
  toasts: { id: number; message: string }[]
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  useEffect(() => {
    // Prevent scroll issues on mobile when toast appears
    document.body.style.overflow = "auto"
  }, [])

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-black text-white text-sm px-4 py-2 rounded-xl shadow-lg"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
