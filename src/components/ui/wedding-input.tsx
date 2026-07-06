// components/ui/wedding-input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface WeddingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const WeddingInput = React.forwardRef<HTMLInputElement, WeddingInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("input", className)}
        {...props}
      />
    )
  }
)
WeddingInput.displayName = "WeddingInput"