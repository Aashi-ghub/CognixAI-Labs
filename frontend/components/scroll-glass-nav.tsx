"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ScrollGlassNav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!isScrolled) return null

  return (
    <div aria-label="Centered navigation" className="fixed left-1/2 top-3 -translate-x-1/2 z-50 transform">
      <nav
        className="rounded-full px-4 py-2 shadow-md"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
        }}
      >
        <ul className="flex items-center gap-3">
          <li>
            <Link
              href="/services"
              className="text-sm font-medium text-[color:var(--text-strong-fixed)] hover:opacity-80 transition"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#demo"
              className="text-sm font-medium text-[color:var(--text-strong-fixed)] hover:opacity-80 transition"
            >
              Demo
            </Link>
          </li>
          <li className="ml-1">
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full border border-[color:var(--text-strong-fixed)] px-3 py-1.5 text-xs font-semibold text-[color:var(--text-strong-fixed)] hover:opacity-90 transition"
            >
              Book free consultation
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
