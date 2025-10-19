"use client"

import { useEffect, useRef } from "react"

export default function HeroClean() {
  const glowRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Subtle parallax glow
    const onMove = (e: MouseEvent) => {
      const el = glowRef.current
      if (!el) return
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    const elements: HTMLElement[] = [h1Ref.current, ctasRef.current].filter(Boolean) as HTMLElement[]
    if (!elements.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add("opacity-100", "translate-y-0")
            el.classList.remove("opacity-0", "translate-y-2")
          }
        })
      },
      { threshold: 0.2 },
    )

    elements.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-2", "transition-all", "duration-700", "will-change-transform")
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  return (
    <section
      className="relative min-h-[100svh] bg-[color:var(--surface)] text-[color:var(--bg)] overflow-hidden"
      aria-label="Hero"
    >
      {/* Background accents removed per request */}

      <div className="relative mx-auto max-w-6xl px-4 flex items-center justify-center min-h-[100svh]">
        <div className="max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--brand)] mb-3">
            Automation. Intelligence. Scale.
          </p>
          <h1
            ref={h1Ref}
            className="text-balance text-4xl md:text-6xl font-semibold leading-tight opacity-0 translate-y-2 transition-all duration-700 will-change-transform"
          >
            Accelerate Growth with <span className="text-[color:var(--brand)]">Business Workflow Automation</span>
          </h1>

          <h2 className="mt-4 text-[15px] md:text-lg leading-relaxed text-[color:var(--bg)]">
            We build custom AI automations that streamline workflows, cut costs, and free your team to focus on growth.
          </h2>

          <div
            ref={ctasRef}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 opacity-0 translate-y-2 transition-all duration-700 will-change-transform"
          >
            <a
              href="#analysis"
              aria-label="Get Free Workflow Analysis"
              className="rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-medium text-[color:var(--on-brand)] shadow-[0_0_30px_rgba(0,230,195,0.35)]"
            >
              Get Free Workflow Analysis
            </a>
            <a
              href="#strategy"
              aria-label="Book Strategy Call"
              className="rounded-full border border-[color:var(--border)] px-5 py-2.5 text-sm font-medium text-[color:var(--bg)] hover:bg-[color:var(--bg-elevated)]"
            >
              Book Strategy Call
            </a>
          </div>

        </div>
      </div>


      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CognixAI Labs",
              url: "/",
              logo: "/images/logo.png",
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "AI Automation Solutions",
              provider: { "@type": "Organization", name: "CognixAI Labs" },
              areaServed: "Global",
              description:
                "Custom AI automations for business workflow automation to streamline workflows and accelerate growth.",
              url: "#analysis",
            },
            {
              "@context": "https://schema.org",
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Free Workflow Analysis" },
              price: "0",
              priceCurrency: "USD",
              url: "#analysis",
              availability: "https://schema.org/InStock",
            },
          ]),
        }}
      />
    </section>
  )
}
