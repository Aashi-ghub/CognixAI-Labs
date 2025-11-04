"use client"

import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Using external free API (Clearbit autocomplete) for company suggestions
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface ConsultationPopupProps {
  delayMs?: number
}

type Step = 1 | 2 | 3 | 4 | 5

export default function ConsultationPopup({ delayMs = 20000 }: ConsultationPopupProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>(1)
  
  // Contact form fields (Steps 1-2)
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [contactCompany, setContactCompany] = useState("")
  const [contactCompanyQuery, setContactCompanyQuery] = useState("")
  const [contactCompanySuggestions, setContactCompanySuggestions] = useState<string[]>([])
  const [showContactCompanyList, setShowContactCompanyList] = useState(false)
  const [contactCompanyChoice, setContactCompanyChoice] = useState<string>("")
  const [contactCompanyOther, setContactCompanyOther] = useState<string>("")
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  
  // Audit form fields (Steps 3-5)
  const [industry, setIndustry] = useState("")
  const [teamSize, setTeamSize] = useState("")
  const [challenge, setChallenge] = useState("")
  const [company, setCompany] = useState("")
  const [companyQuery, setCompanyQuery] = useState("")
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([])
  const [showCompanyList, setShowCompanyList] = useState(false)
  const [companyChoice, setCompanyChoice] = useState<string>("")
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

  const handleClose = () => {
    setOpen(false)
    sessionStorage.setItem(storageKey, "1")
    // Reset to step 1 when closed
    setStep(1)
    // Reset contact form
    setContactName("")
    setContactEmail("")
    setContactMessage("")
    setContactCompany("")
    setContactCompanyQuery("")
    setContactCompanyChoice("")
    setContactCompanyOther("")
    setContactStatus("idle")
    // Reset audit form
    setIndustry("")
    setTeamSize("")
    setChallenge("")
    setCompany("")
    setCompanyQuery("")
    setCompanyChoice("")
    setErrorMessage("")
    setStatus("idle")
  }

  // Fetch company suggestions for contact form
  useEffect(() => {
    let cancelled = false
    const q = contactCompanyQuery.trim()
    if (!q || q.length < 2) {
      setContactCompanySuggestions([])
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
          setContactCompanySuggestions(names.slice(0, 12))
        }
      } catch {
        // ignore
      }
    }, 200)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [contactCompanyQuery])

  // Fetch company suggestions for audit form
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

  // Contact form handlers (Steps 1-2)
  const handleContactSubmit = async () => {
    if (!contactName || !contactEmail) {
      setErrorMessage("Please fill in name and email")
      return
    }
    const companyResolved = contactCompanyChoice === "__other__" ? contactCompanyOther : contactCompanyChoice
    if (!companyResolved && !contactCompany) {
      setErrorMessage("Please enter your company name")
      return
    }
    setContactStatus("sending")
    setErrorMessage("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          company: companyResolved || contactCompany,
          message: contactMessage || "Interested in 20% discount offer"
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to submit")
      }
      setContactStatus("sent")
      setTimeout(() => {
        setStep(3) // Proceed to audit workflow
        setContactStatus("idle")
      }, 1500)
    } catch (err: any) {
      setContactStatus("error")
      setErrorMessage(err?.message || "Something went wrong")
    }
  }

  // Audit form handlers (Steps 3-5)
  const handleStep3Next = () => {
    setStep(4)
  }

  const handleStep4Next = () => {
    if (!industry || !teamSize || !challenge.trim()) {
      setErrorMessage("Please fill in all fields")
      return
    }
    const companyResolved = companyChoice === "__other__" ? company : companyChoice
    if (!companyResolved && !company) {
      setErrorMessage("Please enter your company name")
      return
    }
    setStep(5)
    setErrorMessage("")
  }

  const handleStep5Submit = async (bookCall: boolean) => {
    setStatus("sending")
    setErrorMessage("")

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          industry, 
          teamSize, 
          challenge,
          company: company || null,
          goal: `AI Workflow Audit - Industry: ${industry}, Team Size: ${teamSize}, Challenge: ${challenge}${bookCall ? " - Wants Strategy Call" : ""}`,
          wantsCall: bookCall
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

  const renderProgressBar = () => {
    const totalSteps = step <= 2 ? 2 : 5
    const stepsToShow = step <= 2 ? [1, 2] : [1, 2, 3, 4, 5]
    return (
      <div className="flex gap-2 mb-6">
        {stepsToShow.map((s) => (
          <div
            key={s}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              s <= step
                ? "bg-[var(--color-accent,#18e2a5)]"
                : "bg-white/10"
            )}
          />
        ))}
      </div>
    )
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
        {renderProgressBar()}

        {/* Step 1: Welcome with 20% Off Offer */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            {/* 20% Off Badge */}
            <div className="absolute -top-4 right-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-accent,#18e2a5)] rounded-full blur-md opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-br from-[var(--color-accent,#18e2a5)] to-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  20% OFF
                </div>
              </div>
            </div>
            <DialogHeader>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[var(--color-accent,#18e2a5)]/10 border border-[var(--color-accent,#18e2a5)]/20 mx-auto">
                <div className="h-2 w-2 rounded-full bg-[var(--color-accent,#18e2a5)] animate-pulse" />
                <span className="text-xs font-semibold text-[var(--color-accent,#18e2a5)] uppercase tracking-wide">
                  Limited Time Offer
                </span>
              </div>
              <DialogTitle className="text-2xl text-white text-center">
                Get Started Today & Save 20% 🎉
              </DialogTitle>
            </DialogHeader>
            <p className="text-center text-white/80 text-sm">
              Fill out the form below and get <span className="font-semibold text-[var(--color-accent,#18e2a5)]">20% off</span> your first automation project. No commitment required.
            </p>
            <Button
              onClick={() => setStep(2)}
              className={cn(
                "w-full h-12 rounded-lg font-semibold text-base",
                "bg-[var(--color-accent,#18e2a5)] text-black hover:bg-[var(--color-accent,#18e2a5)]/90",
                "shadow-[0_0_24px_rgba(24,226,165,0.6)] hover:shadow-[0_0_36px_rgba(24,226,165,0.75)]",
              )}
            >
              Claim Your 20% Discount
            </Button>
          </div>
        )}

        {/* Step 2: Contact Form */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">
                Get Your 20% Discount
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="contactName" className="text-white/90 text-sm">Name *</Label>
                <Input
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contactEmail" className="text-white/90 text-sm">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contactCompany" className="text-white/90 text-sm">Company *</Label>
                <div className="relative">
                  <Input
                    id="contactCompany-search"
                    value={contactCompanyChoice === "__other__" ? contactCompanyOther : (contactCompanyChoice || contactCompanyQuery)}
                    onChange={(e) => {
                      const v = e.target.value
                      setContactCompanyChoice("")
                      setContactCompanyOther("")
                      setContactCompanyQuery(v)
                      setShowContactCompanyList(true)
                    }}
                    onFocus={() => setShowContactCompanyList(true)}
                    onBlur={() => setTimeout(() => setShowContactCompanyList(false), 200)}
                    placeholder="Search or enter company name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
                    required
                  />
                  {showContactCompanyList && contactCompanySuggestions.length > 0 && (
                    <div className="absolute z-50 mt-1 w-full rounded-md border border-white/10 bg-black/90 backdrop-blur-md text-white shadow-lg max-h-56 overflow-auto">
                      {contactCompanySuggestions.map((c) => (
                        <button
                          type="button"
                          key={c}
                          className="w-full text-left px-3 py-2 hover:bg-white/10 transition"
                          onClick={() => {
                            setContactCompanyChoice(c)
                            setContactCompany(c)
                            setContactCompanyQuery("")
                            setShowContactCompanyList(false)
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
                          setContactCompanyChoice("__other__")
                          setContactCompany("")
                          setShowContactCompanyList(false)
                        }}
                      >
                        Other
                      </button>
                    </div>
                  )}
                </div>
                {contactCompanyChoice === "__other__" && (
                  <Input
                    id="contactCompany"
                    value={contactCompanyOther}
                    onChange={(e) => setContactCompanyOther(e.target.value)}
                    placeholder="Enter company name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11"
                    required
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contactMessage" className="text-white/90 text-sm">Message (Optional)</Label>
                <Textarea
                  id="contactMessage"
                  value={contactMessage}
                  onChange={(e) => {
                    setContactMessage(e.target.value)
                    const ta = e.target as HTMLTextAreaElement
                    ta.style.height = "auto"
                    ta.style.height = ta.scrollHeight + "px"
                  }}
                  placeholder="Tell us about your automation goals..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 resize-none min-h-[80px]"
                  rows={3}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-[#ffb4b4] text-sm">
                {errorMessage}
              </div>
            )}

            {contactStatus === "sent" && (
              <div className="flex items-start gap-2 rounded-md border border-[color:var(--brand,#18e2a5)]/30 bg-[color:var(--brand,#18e2a5)]/10 px-4 py-3 text-sm">
                <CheckCircle2 className="shrink-0 text-[color:var(--brand,#18e2a5)] mt-0.5" />
                <div className="text-white/90">
                  Thank you! We'll contact you soon with your discount code.
                </div>
              </div>
            )}

            <Button
              onClick={handleContactSubmit}
              disabled={contactStatus === "sending" || contactStatus === "sent"}
              className={cn(
                "w-full h-12 rounded-lg font-semibold text-base",
                "bg-[var(--color-accent,#18e2a5)] text-black hover:bg-[var(--color-accent,#18e2a5)]/90",
                "shadow-[0_0_24px_rgba(24,226,165,0.6)] hover:shadow-[0_0_36px_rgba(24,226,165,0.75)]",
              )}
            >
              {contactStatus === "sending" ? "Submitting..." : contactStatus === "sent" ? "✓ Submitted!" : "Claim Your 20% Discount"}
            </Button>

            <p className="text-xs text-center text-white/50 mt-2">
              🔒 Your information is secure. We'll never share your details.
            </p>
          </div>
        )}

        {/* Step 3: Welcome to Audit Workflow */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white text-center">
                Let's Audit Your Workflow for AI Opportunities 🚀
              </DialogTitle>
            </DialogHeader>
            <p className="text-center text-white/80 text-sm">
              We'll analyze your business and share where AI can save time & boost sales.
            </p>
            <Button
              onClick={handleStep3Next}
              className={cn(
                "w-full h-12 rounded-lg font-semibold text-base",
                "bg-[var(--color-accent,#18e2a5)] text-black hover:bg-[var(--color-accent,#18e2a5)]/90",
                "shadow-[0_0_24px_rgba(24,226,165,0.6)] hover:shadow-[0_0_36px_rgba(24,226,165,0.75)]",
              )}
            >
              Start My Free AI Audit
            </Button>
          </div>
        )}

        {/* Step 4: Audit Form */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">
                Quick Details
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="industry" className="text-white/90 text-sm">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 w-full">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10 text-white">
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="teamSize" className="text-white/90 text-sm">Team Size</Label>
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 w-full">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10 text-white">
                    <SelectItem value="1-10">1–10</SelectItem>
                    <SelectItem value="10-50">10–50</SelectItem>
                    <SelectItem value="50-200">50–200</SelectItem>
                    <SelectItem value="200+">200+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="challenge" className="text-white/90 text-sm">
                  Biggest challenge your team faces?
                </Label>
                <Textarea
                  id="challenge"
                  value={challenge}
                  onChange={(e) => {
                    setChallenge(e.target.value)
                    const ta = e.target as HTMLTextAreaElement
                    ta.style.height = "auto"
                    ta.style.height = ta.scrollHeight + "px"
                  }}
                  placeholder="Tell us about your biggest challenge..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 resize-none min-h-[80px]"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company" className="text-white/90 text-sm">Company *</Label>
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
                    required
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
                    required
                  />
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="text-[#ffb4b4] text-sm">
                {errorMessage}
              </div>
            )}

            <Button
              onClick={handleStep4Next}
              className={cn(
                "w-full h-12 rounded-lg font-semibold text-base",
                "bg-[var(--color-accent,#18e2a5)] text-black hover:bg-[var(--color-accent,#18e2a5)]/90",
                "shadow-[0_0_24px_rgba(24,226,165,0.6)] hover:shadow-[0_0_36px_rgba(24,226,165,0.75)]",
              )}
            >
              Generate My AI Roadmap →
            </Button>
          </div>
        )}

        {/* Step 5: Thank You */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white text-center">
                Awesome! We're creating your AI Roadmap 🧠
              </DialogTitle>
            </DialogHeader>
            <p className="text-center text-white/80 text-sm">
              Want to discuss it live with our AI Consultant?
            </p>

            {status === "error" && (
              <div className="text-[#ffb4b4] text-sm text-center">
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

            <div className="space-y-3">
              <Button
                onClick={() => handleStep5Submit(true)}
                disabled={status === "sending" || status === "sent"}
                className={cn(
                  "w-full h-12 rounded-lg font-semibold text-base",
                  "bg-[var(--color-accent,#18e2a5)] text-black hover:bg-[var(--color-accent,#18e2a5)]/90",
                  "shadow-[0_0_24px_rgba(24,226,165,0.6)] hover:shadow-[0_0_36px_rgba(24,226,165,0.75)]",
                )}
              >
                {status === "sending" ? "Submitting…" : "Book a Quick Strategy Call"}
              </Button>

              <button
                onClick={() => handleStep5Submit(false)}
                disabled={status === "sending" || status === "sent"}
                className="w-full text-center text-white/60 hover:text-white/80 text-sm transition underline"
              >
                No thanks, just send me the report.
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


