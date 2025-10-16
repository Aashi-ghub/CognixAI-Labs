"use client"
import { useEffect, useRef, useState } from "react"
const messages = ["Automate Fast.", "Save Time.", "Scale Smarter."] // from pasted brief

function useTypeCycle(words: string[], delay = 1800) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), delay)
    return () => clearInterval(t)
  }, [words, delay])
  return words[index]
}

export default function HeroCinematic() {
  const text = useTypeCycle(messages)
  const bg = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!bg.current) return
      const { clientX: x, clientY: y } = e
      bg.current.style.backgroundPosition = `${x / 20}px ${y / 20}px, center`
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [])

  return (
    <section className="relative hero-vignette min-h-[100svh] flex items-center">
      <div
        ref={bg}
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 20% 30%, rgba(24,226,165,0.25), transparent 60%), radial-gradient(2px 2px at 70% 60%, rgba(24,226,165,0.2), transparent 60%)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 w-full">
        <div className="mb-6 inline-flex items-center gap-2 rounded-all px-3 py-2 border border-white/10 bg-white/5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_16px_rgba(24,226,165,0.7)]" />
          <span className="text-sm tracking-tight">Cinematic AI Automation</span>
        </div>

        <h1 className="h1 text-balance font-semibold">
          The future of development is <span className="text-[var(--color-accent)] text-glow-teal">human + AI</span>
        </h1>
        <p className="p muted max-w-2xl mt-4">
          We help you map skills, track progress, and close gaps to thrive in a GenAI world.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <a href="#demos" className="btn btn-primary glow-teal">
            See Demos
          </a>
          <a href="#contact" className="btn btn-ghost">
            Book Free Consultation
          </a>
        </div>

        <div className="mt-10 rounded-all border border-white/10 bg-white/5 p-3 inline-flex">
          <span className="muted">Now:</span>
          <span className="ml-2 font-semibold">{text}</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 text-center text-xs muted">Scroll to explore</div>
    </section>
  )
}
