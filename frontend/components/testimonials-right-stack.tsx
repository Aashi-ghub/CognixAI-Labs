"use client"

import { useEffect, useRef, useState } from "react"

type Testimonial = {
  id: string
  quote: string
  name: string
  role?: string
}

const TESTIMONIALS: Testimonial[] = [
  { 
    id: "t1", 
    quote: "The invoice automation they built reads PDFs, validates against our ERP, and auto-generates approvals. Cut our processing time by 70% and eliminated errors completely. The team really listened to what we needed—didn't just throw tech at us. Highly recommend!", 
    name: "Nimesh Raghuvanshi", 
    role: "Finance Head, Growmore" 
  },
  { 
    id: "t2", 
    quote: "We were taking 2 days per customer for onboarding. Now it's 2 hours—the automation handles CRM sync, personalized emails, follow-ups, and account setups across all platforms. Quality is top-notch and integrates perfectly with our tools.", 
    name: "Priya Sharma", 
    role: "VP Operations, TechVantage Solutions" 
  },
  { 
    id: "t3", 
    quote: "The AI sales assistant they built understands context, qualifies leads properly, books demos, and sends personalized proposals. It's handling 80% of our pre-sales conversations now, and the quality is actually better than manual. ROI showed up fast.", 
    name: "Rajesh Kumar", 
    role: "COO, InnovateCorp" 
  },
  { 
    id: "t4", 
    quote: "Security was my biggest concern, but they built proper governance from day one. Zero issues so far, and I sleep better knowing our automation is secure. They really get it.", 
    name: "Anjali Mehta", 
    role: "CISO, SecureTech India" 
  },
  { 
    id: "t5", 
    quote: "Integration was smooth—no headaches, no downtime. They worked with our existing stack and made everything talk to each other properly. Most vendors promise this, but these guys actually delivered.", 
    name: "Vikram Singh", 
    role: "Platform Lead, CloudFirst Systems" 
  },
  { 
    id: "t6", 
    quote: "I've seen automation projects that don't move the needle. This one? Different story. Real impact on our bottom line, not just fancy dashboards. The team understands business.", 
    name: "Deepak Agarwal", 
    role: "GM, DigitalEdge Technologies" 
  },
  { 
    id: "t7", 
    quote: "Our workflows were a mess with too many manual steps. They understood our process and rebuilt it properly. Everything flows now—like upgrading from a bicycle to a sports car.", 
    name: "Kavita Reddy", 
    role: "Head of Operations, GrowthLabs" 
  },
  { 
    id: "t8", 
    quote: "As CFO, I need numbers. They showed ROI within the first quarter—actual savings, actual time recovered. Investment paid for itself faster than expected.", 
    name: "Amit Joshi", 
    role: "CFO, ScaleUp Ventures" 
  },
]

export default function TestimonialsRightStack() {
  const [stack, setStack] = useState<Testimonial[]>([TESTIMONIALS[0]])
  const idxRef = useRef(1)

  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const next = TESTIMONIALS[idxRef.current % TESTIMONIALS.length]
        idxRef.current += 1
        // Keep last 4 cards visible
        const updated = [...prev, next].slice(-4)
        return updated
      })
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="testimonials" className="relative bg-[color:var(--section-dark)] text-[color:var(--text)] h-screen">
      <style jsx>{`
        .testimonial-text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          -webkit-line-clamp: 5;
        }
        @media (min-width: 768px) {
          .testimonial-text {
            -webkit-line-clamp: 6;
          }
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-10 items-center w-full">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-[color:var(--text-strong)]">What clients say</h2>
            <p className="mt-4 text-[15px] text-[color:var(--text-muted)]">
              Results-focused partnerships—continuous stacking of outcomes, not just features.
            </p>
          </div>
          <div className="relative h-full overflow-visible flex items-center justify-end">
            {/* Cards stack from the right, offset so they don't fully overlap */}
            <div className="relative w-full max-w-[340px] md:w-[min(340px,36vw)]">
              {stack.map((t, i) => {
                // Calculate center offset: stack height is approximately (card count - 1) * 14px
                const stackOffset = (stack.length - 1) * 14;
                const cardHeight = 200; // mobile height
                const centerOffset = (cardHeight / 2) - (stackOffset / 2);
                
                return (
                  <div
                    key={`${t.id}-${i}`}
                    className="absolute right-0"
                    style={{
                      top: `calc(50% - ${cardHeight / 2}px + ${i * 14}px)`,
                      zIndex: 10 + i,
                    }}
                  >
                    <div className="animate-[stackPopInLeft_600ms_ease-out]">
                      <article
                        className="w-full h-[200px] md:h-[240px] rounded-[22px] border border-[color:var(--border)] bg-[color:var(--bg-elevated-solid)] shadow-xl flex flex-col"
                        style={{
                          transform: `translateX(${-i * 20}px)`,
                        }}
                        aria-label={`Testimonial ${t.name}`}
                      >
                        <div className="p-5 md:p-6 flex flex-col flex-1 overflow-hidden">
                          <p className="testimonial-text text-[15px] md:text-[16px] leading-relaxed text-[color:var(--text)] flex-1 overflow-hidden">"{t.quote}"</p>
                          <div className="mt-4 flex-shrink-0">
                            <p className="text-sm font-medium text-[color:var(--text-strong)]">{t.name}</p>
                            {t.role ? <p className="text-xs text-[color:var(--text-muted)] mt-1">{t.role}</p> : null}
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
