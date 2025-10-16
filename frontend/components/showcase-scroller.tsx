"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Panel = {
  id: string
  title: string
  description: string
  // Provide video srcs later; we render a placeholder panel shape for now.
  videoSrc?: string
}

export default function ShowcaseScroller() {
  // Professional name instead of "Interactive Demos"
  const panels: Panel[] = useMemo(
    () => [
      {
        id: "inbox",
        title: "AI Inbox Triage",
        description: "Auto-classify, summarize, and route emails to the right owners with SLAs.",
      },
      {
        id: "support",
        title: "Support Assistant",
        description: "Reduce time-to-resolution with context-aware, secure responses.",
      },
      {
        id: "reports",
        title: "Auto-Reporting",
        description: "Generate weekly insights, charts, and summaries from your data.",
      },
    ],
    [],
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0 → 1 across the section

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      setProgress(total > 0 ? scrolled / total : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const translateX = `translateX(-${progress * (100 * (panels.length - 1))}vw)`

  return (
    <section
      id="showcase"
      className="relative"
      aria-label="Solutions Showcase"
      ref={containerRef}
      style={{ height: `${panels.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[color:var(--charcoal)]">
        <div className="absolute inset-0 flex items-center">
          <div
            className="flex h-full w-[calc(100vw*3)] transition-transform will-change-transform"
            style={{ transform: translateX }}
          >
            {panels.map((p) => (
              <article key={p.id} className="w-[100vw] h-full p-0" aria-label={p.title}>
                <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                  {/* Media */}
                  <div className="relative min-h-[50vh] md:min-h-[100svh]">
                    {/* Replace with real <video> */}
                    <div className="absolute inset-0 grid place-items-center text-[color:var(--text-muted)] text-sm">
                      Video placeholder
                    </div>
                  </div>
                  {/* Case study text */}
                  <div className="flex items-center justify-center">
                    <div className="max-w-xl p-8 md:p-14">
                      <h3 className="text-2xl md:text-4xl font-semibold text-[color:var(--text-strong)]">{p.title}</h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--text)]">{p.description}</p>
                      <ul className="mt-6 grid gap-2 text-[14px] text-[color:var(--text)]">
                        <li>• Measurable impact within weeks</li>
                        <li>• Secure by design, role-aware</li>
                        <li>• Integrates with your stack</li>
                      </ul>
                      <div className="mt-7 flex gap-3">
                        <a
                          href="#contact"
                          className="rounded-full bg-[color:var(--brand)] px-4 py-2 text-sm font-medium text-[color:var(--on-brand)]"
                        >
                          Request this solution
                        </a>
                        <a
                          href="#contact"
                          className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--text-strong)]"
                        >
                          Get a custom demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        {/* Skip Showcase */}
        <div className="absolute bottom-4 right-4">
          <a
            href="#about"
            className="rounded-full bg-[color:var(--bg-elevated-solid)] border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--text-strong)]"
          >
            Skip Showcase
          </a>
        </div>
      </div>
    </section>
  )
}
