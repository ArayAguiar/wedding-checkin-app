'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadingComplete, 500) // Wait for fade out animation
    }, 2500) // Show loading for 2.5 seconds

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  if (!isVisible) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        onAnimationComplete={() => {
          // Component will be unmounted by parent
        }}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center space-y-8">
        {/* Logo/Initials */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-pink-200/30">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-['Cinzel_Decorative']"
            >
              CF
            </motion.span>
          </div>
          
          {/* Decorative ring */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="absolute inset-0 w-24 h-24 border-2 border-pink-300/40 rounded-full"
          />
          
          {/* Outer decorative ring */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1.2, rotate: 0 }}
            transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-24 h-24 border border-purple-300/30 rounded-full"
            style={{ left: '-2px', top: '-2px' }}
          />
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-['Cinzel'] text-foreground">
            Cindy <span className="text-pink-500">&</span> Fausto
          </h1>
          <p className="text-sm text-muted-foreground font-['Cinzel']">
            18 de Outubro de 2025
          </p>
        </motion.div>

        {/* Loading animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-3"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-pink-300/30 border-t-pink-500 rounded-full"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
            className="text-xs text-muted-foreground"
          >
            A carregar...
          </motion.p>
        </motion.div>

        {/* Floating hearts */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: [20, -20, 20],
              x: [0, Math.sin(i * 2) * 10, 0]
            }}
            transition={{
              delay: 1.8 + i * 0.3,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute text-pink-400/60"
            style={{
              left: `${45 + i * 10}%`,
              top: `${40 + Math.sin(i) * 10}%`
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}