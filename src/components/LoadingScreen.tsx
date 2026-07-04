'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

/**
 * Monogram mark, traced from public/assets/CF_Logo_convite.svg (the same
 * mark used on the invite). Kept as inline paths — not an <img> — so we can
 * animate stroke + fill without shipping a second asset.
 */
function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 204 235"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M162.498 153.279C162.498 151.305 161.819 149.628 160.459 148.246C159.196 146.864 157.594 146.124 155.652 146.026H109.034V184.071C109.034 186.637 109.957 188.857 111.802 190.732C113.647 192.509 115.832 193.397 118.357 193.397H120.251V194.877H88.3474V193.397H90.2413C92.7664 193.397 94.903 192.509 96.6512 190.732C98.4964 188.857 99.4676 186.637 99.5648 184.071V101.171C99.5648 98.8023 98.5936 96.8285 96.6512 95.2495C94.8059 93.5717 92.6692 92.7329 90.2413 92.7329H88.4931L88.3474 91.2525H131.032C135.208 91.2525 138.898 90.9071 142.103 90.2163C145.308 89.5254 147.396 88.9827 148.368 88.5879V105.316H146.911V103.095C146.911 101.122 146.231 99.4438 144.871 98.0621C143.512 96.5818 141.812 95.8416 139.772 95.8416H109.034V141.585H155.506C157.448 141.486 159.099 140.746 160.459 139.364C161.819 137.982 162.498 136.255 162.498 134.183V132.11H163.955V155.5H162.498V153.279Z"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.path
        d="M96.2372 40.3743C102.86 40.3743 109.581 41.3055 116.399 43.1679C123.315 44.9324 129.062 47.3339 133.639 50.3727L136.561 71.1045H135.247C133.201 62.8706 128.477 56.4501 121.075 51.843C113.672 47.1379 105.442 44.7853 96.3833 44.7853C83.429 44.7854 72.6173 49.4414 63.9486 58.7537C55.3773 67.9678 51.0918 79.5838 51.0918 93.6011C51.0919 107.618 55.5235 119.381 64.387 128.889C70.7851 135.608 78.5737 139.928 87.7525 141.85V146.664C80.7441 145.629 74.2217 143.528 68.1856 140.358C59.3221 135.653 52.4066 129.232 47.4392 121.097C42.5691 112.961 40.134 103.893 40.134 93.895C40.134 83.7986 42.5691 74.6825 47.4392 66.5466C52.3092 58.4107 59.03 52.039 67.6013 47.4319C76.1726 42.7269 85.7179 40.3743 96.2372 40.3743Z"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      />
    </svg>
  )
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadingComplete, 500) // matches exit transition below
    }, 2500)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  if (!isVisible) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        {/* Monogram, with a single thin ring that draws itself in — echoes
            the gate's converging-names moment rather than introducing a
            new motif. */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto text-foreground">
          <Monogram className="w-full h-full" />
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full -rotate-90"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1"
              strokeLinecap="round"
              pathLength={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        {/* Names + date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
          className="mt-6 space-y-1"
        >
          <h1 className="text-xl sm:text-2xl font-['Cinzel_Decorative'] text-foreground">
            Cindy &amp; Fausto
          </h1>
          <p className="text-xs sm:text-sm font-['Cinzel'] text-muted-foreground tracking-wide">
            18 de Outubro de 2025
          </p>
        </motion.div>

        {/* Loading affordance: a thin line filling in, not a spinner —
            reads as a progress moment rather than a generic wait state. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-6 w-24 h-px bg-border mx-auto overflow-hidden"
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: 'var(--accent-gold)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.3, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}