// src/components/ui/wedding-otp-input.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface WeddingOtpInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
  error?: boolean
  ariaDescribedBy?: string
  label?: string
}

export const WeddingOtpInput = React.forwardRef<HTMLInputElement, WeddingOtpInputProps>(
  ({ value, onChange, length = 6, disabled, error, ariaDescribedBy, label = "Código de acesso" }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const digits = value.padEnd(length, "").split("")

    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleContainerClick = () => {
      inputRef.current?.focus()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, length)
      onChange(raw)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && value.length === 0) {
        return
      }
    }

    return (
      <div
        className="flex items-center justify-center gap-2 md:gap-3"
        onClick={handleContainerClick}
        role="group"
        aria-label={label}
      >
        {/* Hidden real input — properly labeled for screen readers */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={length}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label={label}
          aria-describedby={ariaDescribedBy}
          aria-invalid={error ? "true" : "false"}
          className="sr-only"
        />

        {/* Visual boxes — decorative, aria-hidden */}
        {Array.from({ length }).map((_, i) => {
          const digit = digits[i]
          const isActive = i === value.length
          const isFilled = !!digit

          return (
            <div
              key={i}
              aria-hidden="true"
              className={cn(
                "relative flex items-center justify-center",
                "w-10 h-12 md:w-12 md:h-14",
                "rounded-md border-2",
                "font-mono text-xl md:text-2xl font-medium",
                "transition-colors duration-150",
                "select-none",
                isFilled && "border-foreground text-foreground",
                isActive && !disabled && "border-foreground ring-1 ring-foreground/20",
                !isFilled && !isActive && "border-border text-muted-foreground",
                error && "border-destructive",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {digit || (
                <span className="text-muted-foreground/40 text-sm">—</span>
              )}
              {isActive && !disabled && (
                <span className="absolute inset-0 rounded-md animate-pulse bg-foreground/5" />
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
WeddingOtpInput.displayName = "WeddingOtpInput"