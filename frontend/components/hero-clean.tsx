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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[color:var(--brand)]/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-[color:var(--brand)]/30 to-emerald-400/30 rounded-full blur-lg animate-pulse delay-500" />
      <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-700" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-[color:var(--brand)]/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative mx-auto max-w-6xl px-4 flex items-center justify-center min-h-[100svh]">
        <div className="w-full text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--brand)] mb-3">
            Automation. Intelligence. Scale.
          </p>
          <h1
            ref={h1Ref}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-center opacity-0 translate-y-2 transition-all duration-700 will-change-transform bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent"
          >
            Turn your business into<br />
            <span className="bg-gradient-to-r from-[color:var(--brand)] to-cyan-500 bg-clip-text text-transparent whitespace-nowrap">an automated powerhouse</span>
          </h1>

          <h2 className="mt-6 text-xl md:text-2xl leading-relaxed text-gray-700 font-medium">
            Build. Launch. Scale. All with AI automation.
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
