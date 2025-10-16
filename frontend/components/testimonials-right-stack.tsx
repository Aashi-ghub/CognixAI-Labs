"use client"

import { useEffect, useRef, useState } from "react"

type Testimonial = {
  id: string
  quote: string
  name: string
  role?: string
}

const TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "Cut our triage time by 70% within a month.", name: "A. Gupta", role: "Head of Ops" },
  { id: "t2", quote: "The automation quality is outstanding.", name: "S. Kim", role: "VP Support" },
  { id: "t3", quote: "Fast delivery and measurable results.", name: "M. Rivera", role: "COO" },
  { id: "t4", quote: "Security and governance we can trust.", name: "J. Patel", role: "CISO" },
  { id: "t5", quote: "Seamless integration with our stack.", name: "L. Chen", role: "Platform Lead" },
  { id: "t6", quote: "Real business impact, not just hype.", name: "P. Nguyen", role: "GM" },
]

export default function TestimonialsRightStack() {
  const [stack, setStack] = useState<Testimonial[]>([TESTIMONIALS[0]])
  const idxRef = useRef(1)

  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const next = TESTIMONIALS[idxRef.current % TESTIMONIALS.length]
        idxRef.current += 1
        // Keep last 4 cards visible
        const updated = [...prev, next].slice(-4)
        return updated
      })
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="testimonials" className="relative bg-[color:var(--section-dark)] text-[color:var(--text)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[color:var(--text-strong)]">What clients say</h2>
            <p className="mt-4 text-[15px] text-[color:var(--text-muted)]">
              Results-focused partnerships—continuous stacking of outcomes, not just features.
            </p>
          </div>
          <div className="relative h-[60vh] overflow-visible">
            {/* Cards stack from the right, offset so they don't fully overlap */}
            <div className="absolute right-0 top-0 h-full w-[min(340px,36vw)]">
              {stack.map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className="absolute right-0"
                  style={{
                    top: `${i * 14}px`,
                    zIndex: 10 + i,
                  }}
                >
                  <div className="animate-[stackPopInLeft_600ms_ease-out]">
                    <article
                      className="w-full rounded-[22px] border border-[color:var(--border)] bg-[color:var(--bg-elevated-solid)] shadow-xl md:min-h-[260px] min-h-[220px]"
                      style={{
                        transform: `translateX(${-i * 20}px)`,
                      }}
                      aria-label={`Testimonial ${t.name}`}
                    >
                      <div className="p-5">
                        <p className="text-[15px] leading-relaxed text-[color:var(--text)]">“{t.quote}”</p>
                        <p className="mt-3 text-sm font-medium text-[color:var(--text-strong)]">{t.name}</p>
                        {t.role ? <p className="text-xs text-[color:var(--text-muted)]">{t.role}</p> : null}
                      </div>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
