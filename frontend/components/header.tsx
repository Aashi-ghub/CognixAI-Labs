"use client"
import ScrollGlassNav from "./scroll-glass-nav"

export default function Header() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight text-[color:var(--bg)]">
            SwiftAI Labs
          </a>
          <nav className="hidden md:flex items-center gap-5 md:ml-auto md:justify-end">
            <a href="/services" className="text-[color:var(--bg)] hover:opacity-80 transition">
              Services
            </a>
            <a href="#demo" className="text-[color:var(--bg)] hover:opacity-80 transition">
              Demo
            </a>
            <a
              href="#contact"
              className="btn btn-primary glow-teal !px-3 !py-1.5 text-xs md:!px-3 md:!py-1.5 md:text-sm"
            >
              Book Free Consultation
            </a>
          </nav>
        </div>
      </header>
      <ScrollGlassNav />
    </>
  )
}
