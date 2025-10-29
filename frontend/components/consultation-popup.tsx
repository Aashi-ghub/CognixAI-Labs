"use client"

import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
// Using external free API (Clearbit autocomplete) for company suggestions
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface ConsultationPopupProps {
  delayMs?: number
}

export default function ConsultationPopup({ delayMs = 20000 }: ConsultationPopupProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [company, setCompany] = useState("")
  const [companyQuery, setCompanyQuery] = useState("")
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([])
  const [showCompanyList, setShowCompanyList] = useState(false)
  const [companyChoice, setCompanyChoice] = useState<string>("") // chosen suggestion or "__other__"
  const [goal, setGoal] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Only show once per session
  const storageKey = useMemo(() => "cognixai-consultation-popup-shown", [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(storageKey) === "1") return
    const t = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem(storageKey, "1")
    }, delayMs)
    return () => clearTimeout(t)
  }, [delayMs, storageKey])

  // Fetch company suggestions from external free API as user types
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    if (!name.trim() || !contact.trim() || !goal.trim()) {
      setStatus("error")
      setErrorMessage("Please fill in name, contact, and goal")
      return
    }

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, company: company || null, goal }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to submit")
      }
      setStatus("sent")
      // Optionally close shortly after success
      setTimeout(() => setOpen(false), 1200)
      setName("")
      setContact("")
      setCompany("")
      setGoal("")
    } catch (err: any) {
      setStatus("error")
      setErrorMessage(err?.message || "Something went wrong")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          // Semi-transparent, glassy panel with rounded corners; smooth fade handled by Dialog
          "rounded-all bg-black/70 border-white/10 text-white backdrop-blur-md",
          "shadow-[0_0_40px_rgba(24,226,165,0.35)]",
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-white">
            Free Automation Roadmap Consultation
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-white/80 -mt-2">
          Map your automation opportunities with CognixAI. Share a few details and we’ll reach out.
        </p>

        <form onSubmit={onSubmit} className="mt-3 space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-white/90">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact" className="text-white/90">Contact (email or phone)</Label>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="jane@company.com or +1 555 123 4567"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company" className="text-white/90">Company</Label>
            <div className="relative">
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
              />
              {showCompanyList && companySuggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full rounded-md border border-white/10 bg-black/80 backdrop-blur-md text-white shadow-lg max-h-56 overflow-auto no-scrollbar">
                  {companySuggestions.map((c) => (
                    <button
                      type="button"
                      key={c}
                      className="w-full text-left px-3 py-2 hover:bg-white/10"
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
                    className="w-full text-left px-3 py-2 hover:bg-white/10"
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
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="goal" className="text-white/90">Automation goal</Label>
            <Textarea
              id="goal"
              value={goal}
              onChange={e => {
                setGoal(e.target.value);
                // Autosize height
                const ta = e.target as HTMLTextAreaElement;
                ta.style.height = "auto";
                ta.style.height = ta.scrollHeight + "px";
              }}
              placeholder="Briefly describe the workflow or process you want to automate."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11 resize-none no-scrollbar"
              required
              style={{ resize: 'none', overflow: 'hidden' }}
              rows={1}
            />
          </div>

          {status === "error" && (
            <div className="text-[#ffb4b4] text-sm">
              {errorMessage}
            </div>
          )}
          {status === "sent" && (
            <div className="flex items-start gap-2 rounded-md border border-[color:var(--brand,#18e2a5)]/30 bg-[color:var(--brand,#18e2a5)]/10 px-3 py-2 text-sm">
              <CheckCircle2 className="shrink-0 text-[color:var(--brand,#18e2a5)]" />
              <div className="text-white/90">
                Thank you! We’ll contact you soon to schedule your call.
              </div>
            </div>
          )}

          <div className="pt-1">
            <Button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "w-full h-11 rounded-all font-semibold",
                // Glowing green CTA matching hero accent
                "bg-[var(--color-accent,#18e2a5)] text-black hover:bg-[var(--color-accent,#18e2a5)]/90",
                "shadow-[0_0_24px_rgba(24,226,165,0.6)] hover:shadow-[0_0_36px_rgba(24,226,165,0.75)]",
              )}
            >
              {status === "sending" ? "Submitting…" : "Book a Call"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


