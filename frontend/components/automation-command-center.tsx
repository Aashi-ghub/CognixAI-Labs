"use client"
import { ScrollReveal } from "./scroll-reveal"

export default function AutomationCommandCenter() {
  return (
    <section className="bg-white" aria-labelledby="automation-command-center-heading">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="automation-command-center-heading" className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: "#000" }}>
            The Automation Command Center
          </h2>
          <p className="mt-3 text-base md:text-lg text-[color:var(--text-muted)]">
            See how your entire workflow runs on autopilot — from lead capture to scheduling, follow-ups, and analytics — all powered by AI.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 items-center">
          <ScrollReveal>
            <div
              className="relative md:mx-0 mx-auto max-w-4xl sm:max-w-3xl"
              style={{
                perspective: "1200px",
              }}
            >
              <div
                className="rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
                style={{
                  transform: "rotateX(2.5deg)",
                  willChange: "transform",
                  border: "1px solid var(--brand)",
                }}
              >
                <img
                  src="/Gemini_Generated_Image_pzr8smpzr8smpzr8.png"
                  alt="CognixAI Automation Command Center dashboard"
                  className="w-full h-auto block"
                />
              </div>

              <div className="pointer-events-none absolute -inset-4 rounded-2xl -z-10 bg-[color:var(--brand)]/10 blur-xl" />
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100} className="md:pl-2">
            <div className="max-w-prose md:mx-0 mx-auto">
              <h3 className="text-xl md:text-2xl font-semibold" style={{ color: "#000" }}>Operate your business on autopilot</h3>
              <p className="mt-3 text-sm md:text-base leading-7 text-slate-700 md:text-slate-800">
                Orchestrate end-to-end workflows from a single command center. Monitor status, trigger actions,
                and review outcomes — all with AI agents collaborating in real time.
              </p>
              <ul className="mt-5 space-y-3 text-sm md:text-base text-slate-700 md:text-slate-800">
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: "var(--brand)" }} />
                  Lead intake to qualification, routed automatically
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: "var(--brand)" }} />
                  Scheduling, reminders, and follow-ups handled by AI
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: "var(--brand)" }} />
                  Analytics with insights and suggested next actions
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}


