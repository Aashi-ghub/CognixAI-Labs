"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ScrollGlassNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [navStyle, setNavStyle] = useState<React.CSSProperties>({})
  const [onWhiteBg, setOnWhiteBg] = useState(false)
  useEffect(() => {
    function checkNavContrast() {
      const navY = 60 // 12px (top-3) + ~48px nav height
      const navX = window.innerWidth / 2
      const el = document.elementFromPoint(navX, navY)
      if (!el) return setOnWhiteBg(false)
      const bg = window.getComputedStyle(el).backgroundColor
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (match) {
        const r = parseInt(match[1], 10)
        const g = parseInt(match[2], 10)
        const b = parseInt(match[3], 10)
        // Near-white (bright bg): make navStyle dark and opaque
        if (r > 230 && g > 230 && b > 230) {
          setOnWhiteBg(true)
          setNavStyle({
            background: "rgba(17,24,39,0.98)", // Tailwind gray-900 ~95%
            color: "#fff",
            border: "1px solid var(--glass-border, #e5e7eb)",
            boxShadow: "0 1.5px 20px 0 rgba(14,18,40,0.25)",
            WebkitBackdropFilter: "none",
            backdropFilter: "none",
            transition: "background 180ms",
          })
          return
        }
      }
      // Otherwise: glass style
      setOnWhiteBg(false)
      setNavStyle({
        background: "rgba(32,41,53,0.50)",
        color: "#fff",
        border: "1px solid var(--glass-border, #e5e7eb)",
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 1.5px 20px 0 rgba(14,18,40,0.18)",
        transition: "background 180ms",
      })
    }
    // Also respond to scrolling and resizing
    function onScrollResize() {
      setIsScrolled(window.scrollY > 12)
      checkNavContrast()
    }
    onScrollResize()
    window.addEventListener("scroll", onScrollResize, { passive: true })
    window.addEventListener("resize", checkNavContrast)
    return () => {
      window.removeEventListener("scroll", onScrollResize)
      window.removeEventListener("resize", checkNavContrast)
    }
    // eslint-disable-next-line
  }, [])

  if (!isScrolled) return null

  return (
    <div
      aria-label="Centered navigation"
      className="fixed left-1/2 top-3 -translate-x-1/2 z-50 transform"
    >
      <nav
        className={`rounded-full px-4 py-2 shadow-md border ${onWhiteBg ? "" : ""}`}
        style={navStyle}
      >
        <ul className="flex items-center gap-3"
            // If on white background, keep text-white still for clarity, but visually the nav is dark
        >
          <li>
            <Link
              href="/services"
              className={`text-sm font-medium transition ${
                onWhiteBg ? "text-white" : "text-white"
              } hover:opacity-80`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#demo"
              className={`text-sm font-medium transition ${
                onWhiteBg ? "text-white" : "text-white"
              } hover:opacity-80`}
            >
              Demo
            </Link>
          </li>
          <li className="ml-1">
            <Link
              href="#contact"
              className={`inline-flex items-center rounded-full border border-white px-3 py-1.5 text-xs font-semibold transition ${
                onWhiteBg ? "text-white" : "text-white"
              } hover:opacity-90`}
              style={onWhiteBg ? { borderColor: "#fff" } : undefined}
            >
              Book free consultation
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
