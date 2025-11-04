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
        id: "call-agent",
        title: "Call Agent",
        description: "Automate outbound and inbound calls with human-like voice AI. Handles scheduling, reminders, lead qualification, and feedback collection — all without manual intervention.",
        videoSrc: "/voiceagent.mp4",
      },
      {
        id: "hiring-agent",
        title: "Hiring Agent",
        description: "AI-driven recruiter that screens, evaluates, and shortlists candidates automatically. Reads resumes, ranks talent, and conducts structured pre-screening interviews.",
        videoSrc: "/hiring.mp4",
      },
      {
        id: "smart-quote-ai",
        title: "AutoQuote AI",
        description: "Automate quote generation from inquiries, instantly and accurately. Extracts customer requirements, applies pricing logic, and generates ready-to-send quotes in seconds.",
        videoSrc: "/smartquote.mp4",
      },
      {
        id: "sales-agent",
        title: "Sales Agent",
        description: "Your AI-powered closer that engages leads, follows up, and books meetings automatically. Personalizes outreach, nurtures prospects, and syncs updates directly into your CRM.",
        videoSrc: "/sales.mp4",
      },
    ],
    [],
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [mutedById, setMutedById] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(panels.map((p) => [p.id, true])) as Record<string, boolean>,
  )
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const [activePanelId, setActivePanelId] = useState<string | null>(null)

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

  // Set active panel from scroll progress (more reliable for horizontal scroller)
  useEffect(() => {
    const maxIndex = panels.length - 1
    const approximateIndex = Math.round(progress * maxIndex)
    const clampedIndex = Math.max(0, Math.min(maxIndex, approximateIndex))
    const nextId = panels[clampedIndex]?.id ?? null
    if (nextId && nextId !== activePanelId) {
      setActivePanelId(nextId)
    }
  }, [progress, panels, activePanelId])

  // Ensure only the active panel's video is playing; pause others
  useEffect(() => {
    const entries = Object.entries(videoRefs.current)
    for (const [id, v] of entries) {
      if (!v) continue
      if (id === activePanelId) {
        // Attempt to play active video (allowed even unmuted after user gesture)
        v.play().catch(() => {})
      } else {
        // Pause all non-active videos to prevent overlapping audio
        try { v.pause() } catch {}
      }
    }
  }, [activePanelId])

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
        {/* Curved top divider to blend from light section into dark showcase */}
        {/* Separator curve now rendered in Hero section */}
        {/* Gradient overlay to blend with adjacent sections */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div
            className="flex h-full w-[calc(100vw*4)] transition-transform will-change-transform"
            style={{ transform: translateX }}
          >
            {panels.map((p) => (
              <article key={p.id} className="w-[100vw] h-full p-0" aria-label={p.title}>
                <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                  {/* Media */}
                  <div className="relative min-h-[50vh] md:min-h-[100svh] flex items-center justify-center p-8">
                    {p.videoSrc ? (
                      <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg">
                        <video
                          ref={(el) => {
                            videoRefs.current[p.id] = el
                          }}
                          className="w-full h-full object-cover"
                          // Avoid mass autoplay; we control play/pause via IntersectionObserver
                          // Autoplay not set; playback is managed in effect when panel is active
                          muted={mutedById[p.id] ?? true}
                          loop
                          playsInline
                          preload="metadata"
                        >
                          <source src={p.videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="w-full max-w-2xl aspect-video rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-elevated)] grid place-items-center text-[color:var(--text-muted)] text-sm">
                        Video placeholder
                      </div>
                    )}
                  </div>
                  {/* Case study text */}
                  <div className="flex items-center justify-center">
                    <div className="max-w-xl p-8 md:p-14">
                      <h3 className="text-2xl md:text-4xl font-semibold text-[color:var(--text-strong)]">{p.title}</h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--text)]">{p.description}</p>
                      <ul className="mt-6 grid gap-2 text-[14px] text-[color:var(--text)]">
                        {p.id === "call-agent" && (
                          <>
                            <li>• 24/7 availability with multilingual voice</li>
                            <li>• CRM-aware and context-adaptive</li>
                            <li>• Measurable conversion uplift</li>
                          </>
                        )}
                        {p.id === "hiring-agent" && (
                          <>
                            <li>• Reduces hiring time by 70%</li>
                            <li>• Bias-free candidate evaluation</li>
                            <li>• Integrates with ATS and HR tools</li>
                          </>
                        )}
                        {p.id === "smart-quote-ai" && (
                          <>
                            <li>• Works across email, chat, and CRM</li>
                            <li>• Customizable pricing rules</li>
                            <li>• Audit-ready and approval-aware</li>
                          </>
                        )}
                        {p.id === "sales-agent" && (
                          <>
                            <li>• Boosts conversion and follow-up rates</li>
                            <li>• Uses contextual personalization</li>
                            <li>• Integrates seamlessly with your sales stack</li>
                          </>
                        )}
                      </ul>
                      <div className="mt-7 flex gap-3">
                        <a
                          href="#contact"
                          className="rounded-full bg-[color:var(--brand)] px-4 py-2 text-sm font-medium text-[color:var(--on-brand)]"
                        >
                          Automate My Sales
                        </a>
                        <a
                          href="#contact"
                          className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--text-strong)]"
                        >
                          Talk to an AI Consultant
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