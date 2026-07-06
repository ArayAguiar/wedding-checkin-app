// components/ui/wedding-button.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface WeddingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const WeddingButton = React.forwardRef<HTMLButtonElement, WeddingButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variantClasses = {
      primary: "btn btn-primary",
      secondary: "btn btn-secondary",
      outline: "btn btn-outline",
      ghost: "btn btn-ghost",
    }

    const sizeClasses = {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    }

    return (
      <button
        ref={ref}
        className={cn(variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
WeddingButton.displayName = "WeddingButton"