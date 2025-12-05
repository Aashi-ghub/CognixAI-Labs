"use client"

import { useConsultationPopup } from "@/lib/consultation-popup-context"
import { cn } from "@/lib/utils"

interface ConsultationButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary"
}

export default function ConsultationButton({ 
  children, 
  className,
  variant = "primary"
}: ConsultationButtonProps) {
  const { openConsultationPopup } = useConsultationPopup()

  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 hover:scale-105"
  
  const variantClasses = variant === "primary" 
    ? "bg-[color:var(--brand)] text-[color:var(--on-brand)] shadow-[0_0_24px_rgba(0,226,143,0.35)] hover:shadow-[0_0_36px_rgba(0,226,143,0.5)]"
    : "border border-[color:var(--brand)] text-[color:var(--brand)] hover:bg-[color:var(--brand)]/10"

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        openConsultationPopup()
      }}
      className={cn(baseClasses, variantClasses, className)}
    >
      {children}
    </button>
  )
}

