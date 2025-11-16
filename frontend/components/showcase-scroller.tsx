"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Volume2 } from "lucide-react"

type Panel = {
  id: string
  title: string
  description: string
  videoSrc?: string
}

export default function ShowcaseScroller() {
  const panels: Panel[] = useMemo(
    () => [
      {
        id: "call-agent",
        title: "Call Agent",
        description:
          "Automate outbound and inbound calls with human-like voice AI. Handles scheduling, reminders, lead qualification, and feedback collection — all without manual intervention.",
        videoSrc: "/voiceagent.mp4",
      },
      {
        id: "hiring-agent",
        title: "Hiring Agent",
        description:
          "AI-driven recruiter that screens, evaluates, and shortlists candidates automatically. Reads resumes, ranks talent, and conducts structured pre-screening interviews.",
        videoSrc: "/hiring.mp4",
      },
      {
        id: "smart-quote-ai",
        title: "AutoQuote AI",
        description:
          "Automate quote generation from inquiries, instantly and accurately. Extracts customer requirements, applies pricing logic, and generates ready-to-send quotes in seconds.",
        videoSrc: "/smartquote.mp4",
      },
      {
        id: "sales-agent",
        title: "Sales Agent",
        description:
          "Your AI-powered closer that engages leads, follows up, and books meetings automatically. Personalizes outreach, nurtures prospects, and syncs updates directly into your CRM.",
        videoSrc: "/sales.mp4",
      },
    ],
    []
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const [progress, setProgress] = useState(0)
  const [activePanelId, setActivePanelId] = useState<string | null>(null)
  const [unmutedPanels, setUnmutedPanels] = useState<Record<string, boolean>>({})
  const [inView, setInView] = useState(false)
  const rafIdRef = useRef<number | null>(null)
  const lastProgressRef = useRef(0)

  // Track if showcase is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Track scroll for horizontal translation with requestAnimationFrame
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateProgress = () => {
      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer) {
        rafIdRef.current = null
        return
      }
      
      const rect = container.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const newProgress = total > 0 ? scrolled / total : 0
      
      // Always update transform for smoothness, but throttle state updates
      const translateX = -newProgress * (100 * (panels.length - 1))
      scrollContainer.style.transform = `translate3d(${translateX}vw, 0, 0)`
      
      // Only update state if progress changed significantly (reduce re-renders)
      if (Math.abs(newProgress - lastProgressRef.current) > 0.001) {
        lastProgressRef.current = newProgress
        setProgress(newProgress)
      }
      
      rafIdRef.current = null
    }

    const onScroll = () => {
      // Use requestAnimationFrame to throttle updates
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updateProgress)
      }
    }

    // Wait for next tick to ensure refs are ready
    const initTimeout = setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true })
      updateProgress() // Initial update
    }, 10)
    
    return () => {
      clearTimeout(initTimeout)
      window.removeEventListener("scroll", onScroll)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [panels.length])

  // Determine active panel
  useEffect(() => {
    const maxIndex = panels.length - 1
    const index = Math.round(progress * maxIndex)
    const nextId = panels[index]?.id ?? null
    if (nextId !== activePanelId) setActivePanelId(nextId)
  }, [progress, panels, activePanelId])

  // Play/pause based on active panel & visibility
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return
      if (inView && id === activePanelId) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activePanelId, inView])

  const handleUnmute = (panelId: string) => {
    const video = videoRefs.current[panelId]
    if (!video) return
    video.muted = false
    setUnmutedPanels((prev) => ({ ...prev, [panelId]: true }))
    video.play().catch(() => {})
  }

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative"
      style={{ height: `${panels.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[color:var(--charcoal)]">
        <div className="absolute inset-0 flex items-center">
          <div
            ref={scrollContainerRef}
            className="flex h-full"
            style={{ 
              width: `calc(100vw * ${panels.length})`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            {panels.map((p) => (
              <article key={p.id} className="w-[100vw] h-full">
                <div className="grid h-full grid-cols-1 md:grid-cols-2">
                  {/* Video side */}
                  <div className="relative flex items-center justify-center p-4 md:p-8">
                    {p.videoSrc ? (
                      <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg">
                        <video
                          ref={(el) => {
                            videoRefs.current[p.id] = el
                          }}
                          className="w-full h-full object-cover"
                          muted={!unmutedPanels[p.id]}
                          loop
                          playsInline
                          preload="metadata"
                        >
                          <source src={p.videoSrc} type="video/mp4" />
                        </video>

                        {!unmutedPanels[p.id] && activePanelId === p.id && (
                          <button
                            onClick={() => handleUnmute(p.id)}
                            aria-label="Unmute video"
                            className="absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black/70 backdrop-blur-sm"
                          >
                            <Volume2 className="h-4 w-4" aria-hidden />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="w-full max-w-2xl aspect-video rounded-lg border border-gray-600 bg-gray-800 grid place-items-center text-gray-300 text-sm">
                        Video placeholder
                      </div>
                    )}
                  </div>

                  {/* Text side */}
                  <div className="flex items-center justify-center p-4 md:p-8">
                    <div className="max-w-xl text-center md:text-left">
                      <h3 className="text-2xl md:text-4xl font-semibold text-white">
                        {p.title}
                      </h3>
                      <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-gray-300">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Skip button */}
        <div className="absolute bottom-4 right-4 z-10">
          <a
            href="#about"
            className="rounded-full bg-black/40 border border-gray-500 px-3 md:px-4 py-2 text-xs text-white"
          >
            Skip Showcase
          </a>
        </div>
      </div>
    </section>
  )
}
