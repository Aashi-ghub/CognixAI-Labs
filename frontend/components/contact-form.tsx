"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    try {
      const form = e.currentTarget
      const data = Object.fromEntries(new FormData(form).entries())
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

  return (
    <section id="contact" className="bg-[color:var(--section-light)] text-[color:var(--text)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-black">Contact & Enquiry</h2>
        <p className="mt-4 text-center text-[15px] text-[color:var(--text-muted)] max-w-2xl mx-auto">
          Tell us about your workflow and outcomes you want. We’ll reply with a tailored plan.
        </p>
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 max-w-2xl grid gap-4 rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6"
        >
          <label className="grid gap-1">
            <span className="text-sm text-black font-medium">Name</span>
            <input
              name="name"
              required
              className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 text-[color:var(--text-strong)] outline-none hover:border-black focus:border-black transition-colors"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-black font-medium">Email</span>
            <input
              name="email"
              type="email"
              required
              className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 text-[color:var(--text-strong)] outline-none hover:border-black focus:border-black transition-colors"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-black font-medium">Company</span>
            <input
              name="company"
              className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 text-[color:var(--text-strong)] outline-none hover:border-black focus:border-black transition-colors"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-black font-medium">Message</span>
            <textarea
              name="message"
              rows={5}
              required
              className="rounded-xl border border-[color:var(--border)] bg-transparent px-3 py-2 text-[color:var(--text-strong)] outline-none hover:border-black focus:border-black transition-colors"
            />
          </label>

          <div className="flex gap-3 justify-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-medium text-[color:var(--on-brand)]"
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>
            {status === "sent" && <span className="text-sm text-[color:var(--brand)]">Thanks! We’ll be in touch.</span>}
            {status === "error" && <span className="text-sm text-red-400">Something went wrong.</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
