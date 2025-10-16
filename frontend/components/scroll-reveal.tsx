"use client"
import { useEffect, useRef, type ElementType, type ReactNode } from "react"

type Props = {
  as?: ElementType
  className?: string
  children: ReactNode
  delayMs?: number
}

export default function ScrollReveal({ as: Tag = "div", className = "", children, delayMs = 0 }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current as unknown as Element | null
    if (!node) return
    node.classList.add("reveal")
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const timer = setTimeout(() => el.classList.add("visible"), delayMs)
            return () => clearTimeout(timer)
          }
        })
      },
      { threshold: 0.2 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [delayMs])

  return (
    // @ts-expect-error dynamic element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

export { ScrollReveal }
