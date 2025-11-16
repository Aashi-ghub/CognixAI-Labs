"use client"

import { useEffect, useMemo, useState, useImperativeHandle, forwardRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PhoneInput from "@/components/phone-input"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface ConsultationPopupProps {
  delayMs?: number
}

export interface ConsultationPopupRef {
  open: () => void
  close: () => void
}

const ConsultationPopup = forwardRef<ConsultationPopupRef, ConsultationPopupProps>(
  ({ delayMs = 20000 }, ref) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [companyQuery, setCompanyQuery] = useState("")
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([])
  const [showCompanyList, setShowCompanyList] = useState(false)
  const [companyChoice, setCompanyChoice] = useState<string>("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Only show once per session
  const storageKey = useMemo(() => "cognixai-consultation-popup-shown", [])

  const handleClose = () => {
    setOpen(false)
    sessionStorage.setItem(storageKey, "1")
    // Reset form when closed
    setName("")
    setEmail("")
    setPhone("")
    setCompany("")
    setCompanyQuery("")
    setCompanyChoice("")
    setCompanySuggestions([])
    setShowCompanyList(false)
    setErrorMessage("")
    setStatus("idle")
  }

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => handleClose(),
  }))

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(storageKey) === "1") return
    const t = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem(storageKey, "1")
    }, delayMs)
    return () => clearTimeout(t)
  }, [delayMs, storageKey])

  // Fetch company suggestions from external free API (Clearbit autocomplete) as user types
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
      } catch {
        // ignore
      }
    }, 200)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [companyQuery])

  // Close company suggestions when clicking outside
  useEffect(() => {
    if (!showCompanyList) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.company-selector-container')) {
        setShowCompanyList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCompanyList])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    // Validation
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please fill in all required fields")
      setStatus("idle")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address")
      setStatus("idle")
      return
    }

    // Basic phone validation (at least 7 digits after country code)
    // Remove country code (usually 1-4 digits) and check remaining digits
    const numberWithoutCountryCode = phone.replace(/^\+\d{1,4}/, "").replace(/\D/g, "")
    if (numberWithoutCountryCode.length < 7) {
      setErrorMessage("Please enter a valid phone number")
      setStatus("idle")
      return
    }

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: name.trim(),
          contact: email,
          company: companyChoice === "__other__" ? company : (companyChoice || company || null),
          goal: "Quick consultation request from popup",
          email,
          phone
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to submit")
      }
      setStatus("sent")
      setTimeout(() => handleClose(), 2000)
    } catch (err: any) {
      setStatus("error")
      setErrorMessage(err?.message || "Something went wrong")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "rounded-lg bg-black/80 border-white/10 text-white backdrop-blur-md",
          "shadow-[0_0_40px_rgba(24,226,165,0.35)]",
          "max-w-md w-full mx-4"
        )}
        showCloseButton={true}
      >
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white text-center">
              Get in Touch 🚀
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-white/80 text-sm">
            Let's discuss how we can help automate your business.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white/90 text-sm">
                Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
                required
                disabled={status === "sending" || status === "sent"}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white/90 text-sm">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
                required
                disabled={status === "sending" || status === "sent"}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-white/90 text-sm">
                Phone Number <span className="text-red-400">*</span>
              </Label>
              <PhoneInput
                id="phone"
                value={phone}
                onChange={setPhone}
                placeholder="Phone number"
                required
                disabled={status === "sending" || status === "sent"}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company" className="text-white/90 text-sm">
                Company (Optional)
              </Label>
              <div className="relative company-selector-container">
                <Input
                  id="company-search"
                  value={companyChoice === "__other__" ? company : (companyChoice || companyQuery)}
                  onChange={(e) => {
                    const v = e.target.value
                    setCompanyChoice("")
                    setCompanyQuery(v)
                    setShowCompanyList(true)
                  }}
                  onFocus={() => setShowCompanyList(true)}
                  placeholder="Search company"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
                  disabled={status === "sending" || status === "sent"}
                />
                {showCompanyList && companySuggestions.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full rounded-md border border-white/10 bg-black/90 backdrop-blur-md text-white shadow-lg max-h-56 overflow-auto">
                    {companySuggestions.map((c) => (
                      <button
                        type="button"
                        key={c}
                        className="w-full text-left px-3 py-2 hover:bg-white/10 transition"
                        onClick={() => {
                          setCompanyChoice(c)
                          setCompany(c)
                          setCompanyQuery("")
                          setShowCompanyList(false)
                        }}
                      >
                        {c}
                      </button>
                    ))}
                    <div className="border-t border-white/10" />
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-white/10 transition"
                      onClick={() => {
                        setCompanyChoice("__other__")
                        setCompany("")
                        setShowCompanyList(false)
                      }}
                    >
                      Other
                    </button>
                  </div>
                )}
              </div>
              {companyChoice === "__other__" && (
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
                  disabled={status === "sending" || status === "sent"}
                />
              )}
            </div>

            {errorMessage && (
              <div className="text-[#ffb4b4] text-sm">
                {errorMessage}
              </div>
            )}

            {status === "sent" && (
              <div className="flex items-start gap-2 rounded-md border border-[color:var(--brand,#18e2a5)]/30 bg-[color:var(--brand,#18e2a5)]/10 px-4 py-3 text-sm">
                <CheckCircle2 className="shrink-0 text-[color:var(--brand,#18e2a5)] mt-0.5" />
                <div className="text-white/90">
                  Thank you! We'll be in touch soon.
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={cn(
                "w-full h-12 rounded-lg font-semibold text-base",
                "bg-[var(--color-accent,#18e2a5)] text-black hover:bg-[var(--color-accent,#18e2a5)]/90",
                "shadow-[0_0_24px_rgba(24,226,165,0.6)] hover:shadow-[0_0_36px_rgba(24,226,165,0.75)]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {status === "sending" ? "Submitting…" : status === "sent" ? "Submitted!" : "Submit"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
})

ConsultationPopup.displayName = "ConsultationPopup"

export default ConsultationPopup
