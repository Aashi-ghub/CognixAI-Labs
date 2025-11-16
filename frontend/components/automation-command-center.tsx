"use client"
import { ScrollReveal } from "./scroll-reveal"

export default function AutomationCommandCenter() {
  return (
    <section className="bg-white" aria-labelledby="automation-command-center-heading">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 md:pb-24">

        <div className="mt-8 md:mt-10 grid gap-8 md:gap-10 md:grid-cols-2 items-center">
          <ScrollReveal>
            <div
              className="relative md:mx-0 mx-auto max-w-4xl sm:max-w-3xl px-4 md:px-0"
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
            <div className="max-w-prose md:mx-0 mx-auto px-4 md:px-0 text-center md:text-left">
              <h2 id="automation-command-center-heading" className="text-2xl sm:text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: "#000" }}>
                The Automation Command Center
              </h2>
              <p className="mt-3 text-sm md:text-base leading-7 text-slate-700 md:text-slate-800">
                Orchestrate end-to-end workflows from a single command center. Monitor status, trigger actions,
                and review outcomes — all with AI agents collaborating in real time.
              </p>
              <ul className="mt-5 space-y-3 text-sm md:text-base text-slate-700 md:text-slate-800">
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full flex-shrink-0" style={{ background: "var(--brand)" }} />
                  <span>Lead intake to qualification, routed automatically</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full flex-shrink-0" style={{ background: "var(--brand)" }} />
                  <span>Scheduling, reminders, and follow-ups handled by AI</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full flex-shrink-0" style={{ background: "var(--brand)" }} />
                  <span>Analytics with insights and suggested next actions</span>
                </li>
              </ul>

              {/* Dual CTAs with proof checklist */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#showcase"
                  className="rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-medium text-black shadow-[0_0_24px_rgba(0,226,143,0.35)] hover:shadow-[0_0_36px_rgba(0,226,143,0.5)] transition-all duration-300 hover:scale-105 text-center"
                >
                  See the Command Center Live
                </a>
                <a
                  href="#contact"
                  className="rounded-full border-2 border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-300 hover:scale-105 text-center"
                >
                  Get Your Automation Blueprint
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}


