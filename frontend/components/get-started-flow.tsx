"use client"

import React, { useEffect, useRef, useState } from "react"

export default function GetStartedFlow() {
  const sectionRef = useRef<HTMLElement>(null)
  const [containerInView, setContainerInView] = useState(false)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const [cardInView, setCardInView] = useState<{[k: string]: boolean}>({})

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setContainerInView(true)
          }
          if (entry.target === card1Ref.current && entry.isIntersecting) setCardInView((s) => ({ ...s, c1: true }))
          if (entry.target === card2Ref.current && entry.isIntersecting) setCardInView((s) => ({ ...s, c2: true }))
          if (entry.target === card3Ref.current && entry.isIntersecting) setCardInView((s) => ({ ...s, c3: true }))
        })
      },
      { threshold: 0.3 },
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    if (card1Ref.current) obs.observe(card1Ref.current)
    if (card2Ref.current) obs.observe(card2Ref.current)
    if (card3Ref.current) obs.observe(card3Ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="How to Get Started"
      className="relative pt-20 md:pt-32 pb-16 md:pb-24 bg-white"
    >
      {/* Top fade to blend with dark Showcase above; no bottom fade so it meets white section cleanly */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--charcoal)] to-transparent z-10" />
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: "#000" }}>
          How to Get Started
        </h2>
        <p className="mt-3 text-center text-[15px]" style={{ color: "#111", opacity: 0.8 }}>
          We’ll tailor the automation to your business goals — no generic bots, only real results.
        </p>

        <div className={`relative mt-12 md:mt-16 transition-all duration-700 ${containerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Flow canvas */}
          <div className="pointer-events-none absolute inset-0">
            <svg viewBox="0 0 1600 400" className="hidden md:block w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Step 1 -> Step 2 */}
              <path d="M350,220 C600,80 900,100 1150,200" style={{ stroke: "var(--border)" }} strokeWidth="10" fill="none" />
              <path className="flow-line" d="M350,220 C600,80 900,100 1150,200" style={{ stroke: "var(--brand)" }} strokeWidth="6" fill="none" filter="url(#softGlow)" />
              {/* Step 2 -> Step 3 */}
              <path d="M1150,200 C1300,240 1400,240 1500,200" style={{ stroke: "var(--border)" }} strokeWidth="10" fill="none" />
              <path className="flow-line delay" d="M1150,200 C1300,240 1400,240 1500,200" style={{ stroke: "var(--brand)" }} strokeWidth="6" fill="none" filter="url(#softGlow)" />
            </svg>

            {/* Mobile vertical connectors */}
            <svg viewBox="0 0 400 800" className="md:hidden w-full h-[560px]" preserveAspectRatio="xMidYMid meet">
              <path d="M200,160 C220,260 220,340 200,420" style={{ stroke: "var(--border)" }} strokeWidth="10" fill="none" />
              <path className="flow-line" d="M200,160 C220,260 220,340 200,420" style={{ stroke: "var(--brand)" }} strokeWidth="6" fill="none" />
              <path d="M200,420 C180,500 180,580 200,660" style={{ stroke: "var(--border)" }} strokeWidth="10" fill="none" />
              <path className="flow-line delay" d="M200,420 C180,500 180,580 200,660" style={{ stroke: "var(--brand)" }} strokeWidth="6" fill="none" />
            </svg>
          </div>

          {/* Steps */}
          <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
            <div
              ref={card1Ref}
              className={`group rounded-2xl backdrop-blur bg-white/60 supports-[backdrop-filter]:bg-white/30 border border-[color:var(--border)] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 md:p-8 text-center hover:border-[color:var(--brand)] hover:shadow-[0_0_50px_rgba(0,226,143,0.15)] transition-all duration-700 ${cardInView.c1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] ring-1 ring-[color:var(--brand)]/25">
                {/* Chat/target icon */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/></svg>
              </div>
              <h3 className="font-semibold text-lg" style={{ color: "#000" }}>Share Your Goals</h3>
              <p className="mt-2 text-sm" style={{ color: "#1f2937" }}>Tell us your outcomes; we translate them into an automation plan.</p>
            </div>

            <div
              ref={card2Ref}
              className={`group rounded-2xl backdrop-blur bg-white/60 supports-[backdrop-filter]:bg-white/30 border border-[color:var(--border)] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 md:p-8 text-center hover:border-[color:var(--brand)] hover:shadow-[0_0_50px_rgba(0,226,143,0.15)] transition-all duration-700 ${cardInView.c2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] ring-1 ring-[color:var(--brand)]/25">
                {/* Cog/brain icon */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <h3 className="font-semibold text-lg" style={{ color: "#000" }}>Build Your Custom AI Agent</h3>
              <p className="mt-2 text-sm" style={{ color: "#1f2937" }}>We configure a tailored agent with your data, tools, and guardrails.</p>
            </div>

            <div
              ref={card3Ref}
              className={`group rounded-2xl backdrop-blur bg-white/60 supports-[backdrop-filter]:bg-white/30 border border-[color:var(--border)] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 md:p-8 text-center hover:border-[color:var(--brand)] hover:shadow-[0_0_50px_rgba(0,226,143,0.15)] transition-all duration-700 ${cardInView.c3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] ring-1 ring-[color:var(--brand)]/25">
                {/* Rocket/graph icon */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 21s3-1 6-4 6-8 6-8l3-3s-5 0-8 3-4 6-4 6l-3 3z"/><path d="M14 10l-4 4"/><path d="M9 5l1.5 1.5"/><path d="M18 12l1.5 1.5"/></svg>
              </div>
              <h3 className="font-semibold text-lg" style={{ color: "#000" }}>Launch & Scale</h3>
              <p className="mt-2 text-sm" style={{ color: "#1f2937" }}>Deploy quickly, measure impact, and scale with confidence.</p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center rounded-2xl bg-[color:var(--brand)] px-6 py-3 text-sm font-medium text-[color:var(--on-brand)] shadow-[0_0_30px_rgba(0,226,143,0.25)] transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]/60"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .flow-line {
          stroke-dasharray: 8 18;
          animation: dashFlow 6s linear infinite;
          stroke-linecap: round;
        }
        .flow-line.delay { animation-delay: 0.8s; }
        @keyframes dashFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -320; } }
      `}</style>
    </section>
  )
}


