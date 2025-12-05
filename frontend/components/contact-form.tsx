"use client"

import type React from "react"
import { CheckCircle2 } from "lucide-react"

import { useEffect, useState } from "react"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [companyQuery, setCompanyQuery] = useState("")
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([])
  const [showCompanyList, setShowCompanyList] = useState(false)
  const [companyChoice, setCompanyChoice] = useState<string>("")
  const [companyOther, setCompanyOther] = useState<string>("")
  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      // Resolve company value: selected or other
      const companyResolved = companyChoice === "__other__" ? companyOther : companyChoice
      if (companyResolved) formData.set("company", companyResolved)
      const data = Object.fromEntries(formData.entries())
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to submit")
      setStatus("sent")
      form.reset()
    } catch (err) {
      setStatus("error")
    }
  }

  // Fetch suggestions from external free API (Clearbit) as user types
  useEffect(() => {
    let cancelled = false
    const q = companyQuery.trim()
    if (!q || q.length < 2) {
      setCompanySuggestions([])
      return
    }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(q)}`)
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled && Array.isArray(data)) {
          const names = Array.from(new Set(
            data.map((d: any) => (d && (d.name || d.domain) ? String(d.name || d.domain) : "")).filter(Boolean)
          ))
          setCompanySuggestions(names.slice(0, 12))
        }
      } catch {}
    }, 200)
    return () => { cancelled = true; clearTimeout(t) }
  }, [companyQuery])

  return (
    <section id="contact" className="bg-[color:var(--section-light)] text-[color:var(--text)]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-24">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-black px-4">Contact & Enquiry</h2>
        <p className="mt-3 md:mt-4 text-center text-sm sm:text-[15px] text-black max-w-2xl mx-auto px-4">
          Tell us about your workflow and outcomes you want. We'll reply with a tailored plan.
        </p>
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-6 md:mt-8 max-w-2xl grid gap-4 rounded-2xl md:rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4 sm:p-6"
        >
          <label className="grid gap-1">
            <span className="text-sm text-black font-medium">Name</span>
            <input
              name="name"
              required
              className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 text-black outline-none hover:border-black focus:border-black transition-colors"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-black font-medium">Email</span>
            <input
              name="email"
              type="email"
              required
              className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 text-black outline-none hover:border-black focus:border-black transition-colors"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-black font-medium">Company</span>
            <div className="relative">
              <input
                className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 text-black outline-none hover:border-black focus:border-black transition-colors"
                placeholder="Search company"
                value={companyChoice === "__other__" ? companyOther : (companyChoice || companyQuery)}
                onChange={(e) => {
                  const v = e.target.value
                  setCompanyChoice("")
                  setCompanyQuery(v)
                  setShowCompanyList(true)
                }}
                onFocus={() => setShowCompanyList(true)}
              />
              {showCompanyList && companySuggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full rounded-xl border border-[color:var(--border)] bg-white shadow-lg max-h-56 overflow-auto no-scrollbar text-black">
                  {companySuggestions.map((c) => (
                    <button
                      type="button"
                      key={c}
                      className="w-full text-left px-3 py-2 hover:bg-black/5 text-black"
                      onClick={() => {
                        setCompanyChoice(c)
                        setCompanyOther("")
                        setCompanyQuery("")
                        setShowCompanyList(false)
                      }}
                    >
                      {c}
                    </button>
                  ))}
                  <div className="border-t border-[color:var(--border)]" />
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-black/5 text-black"
                    onClick={() => {
                      setCompanyChoice("__other__")
                      setShowCompanyList(false)
                    }}
                  >
                    Other
                  </button>
                </div>
              )}
              {companyChoice === "__other__" && (
                <input
                  className="mt-2 h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 text-black outline-none hover:border-black focus:border-black transition-colors"
                  placeholder="Enter company name"
                  value={companyOther}
                  onChange={(e) => setCompanyOther(e.target.value)}
                />
              )}
              <input type="hidden" name="company" value={companyChoice === "__other__" ? companyOther : companyChoice} />
            </div>
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-black font-medium">Message</span>
            <textarea
              name="message"
              required
              rows={1}
              onInput={(e) => autoGrow(e.currentTarget)}
              className="h-10 min-h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 py-2 text-black outline-none hover:border-black focus:border-black transition-colors resize-none overflow-hidden no-scrollbar"
            />
          </label>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-medium text-[color:var(--on-brand)] shadow-[0_0_24px_rgba(0,226,143,0.35)] hover:shadow-[0_0_36px_rgba(0,226,143,0.5)] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === "sending" ? "Sending..." : "Get My Tailored Plan"}
            </button>
            <p className="text-xs text-center text-gray-500">
              Response within 24 hrs. NDA on request. Your data stays private. SOC-aligned practices.
            </p>
            {status === "sent" && (
              <span className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 px-3 py-2 text-xs sm:text-sm text-black text-center">
                <CheckCircle2 className="text-[color:var(--brand)] flex-shrink-0" />
                <span>Thank you! We'll contact you soon.</span>
              </span>
            )}
            {status === "error" && <span className="text-sm text-red-400 text-center">Something went wrong.</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
