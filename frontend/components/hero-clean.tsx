"use client"
import { useEffect, useRef } from "react"

export default function HeroClean() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {}, [])

  return (
    <section
      className="relative min-h-[100svh] bg-white text-neutral-900 overflow-hidden"
      aria-label="Hero"
    >
      {/* Minimal AI-styled background: dot grid, soft glow, fine lines */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden>
        {/* subtle dot grid */}
        <div
          className="absolute inset-0 bg-dots"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0",
          }}
        />
        {/* soft brand glow in the top-right */}
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-20 glow"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,230,195,0.28), rgba(0,230,195,0))",
          }}
        />
        {/* soft vignette bottom center */}
        <div
          className="absolute inset-x-0 bottom-0 h-[50%] vignette"
          style={{
            background:
              "radial-gradient(800px 320px at 50% 100%, rgba(0,0,0,0.09), rgba(0,0,0,0))",
          }}
        />
        {/* fine circuit-like lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="35%" stopColor="rgba(0,0,0,0.14)" />
              <stop offset="65%" stopColor="rgba(0,0,0,0.14)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
          <path d="M 5 25 H 95" stroke="url(#line-fade)" strokeWidth="0.25" fill="none" style={{ strokeDasharray: "120 240", animation: "dash 7s linear infinite" }} />
          <path d="M 10 45 C 35 40, 65 50, 90 45" stroke="url(#line-fade)" strokeWidth="0.25" fill="none" style={{ strokeDasharray: "100 200", animation: "dash 9s linear infinite", animationDelay: "1s" }} />
          <path d="M 8 70 H 92" stroke="url(#line-fade)" strokeWidth="0.25" fill="none" style={{ strokeDasharray: "110 220", animation: "dash 8s linear infinite", animationDelay: "0.5s" }} />
        </svg>

        {/* diagonal highlight sweep */}
        <div className="absolute inset-0 mix-blend-normal">
          <div className="absolute -inset-20 sweep-gradient" />
        </div>

        {/* floating dots */}
        <div className="absolute inset-0">
          <span className="float-dot" style={{ left: "15%", bottom: "10%", animationDelay: "0s" }} />
          <span className="float-dot" style={{ left: "32%", bottom: "14%", animationDelay: "2s" }} />
          <span className="float-dot" style={{ left: "58%", bottom: "12%", animationDelay: "1s" }} />
          <span className="float-dot" style={{ left: "72%", bottom: "8%", animationDelay: "3s" }} />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 flex items-center justify-center min-h-[100svh]">
        <div className="w-full text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--brand)] mb-3">
            Automation. Intelligence. Scale.
          </p>
          <h1
            ref={h1Ref}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-center"
          >
            Turn your business into<br />
            <span className="bg-gradient-to-r from-[color:var(--brand)] to-cyan-500 bg-clip-text text-transparent whitespace-nowrap">an automated powerhouse</span>
          </h1>

          <h2 className="mt-6 text-xl md:text-2xl leading-relaxed font-medium text-neutral-700">
            Build. Launch. Scale. All with AI automation.
          </h2>

          <div
            ref={ctasRef}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#contact"
              aria-label="Get Free Workflow Analysis"
              className="rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-medium text-[color:var(--on-brand)] shadow-[0_0_30px_rgba(0,230,195,0.16)]"
            >
              Get Free Workflow Analysis
            </a>
            <a
              href="#contact"
              aria-label="Book Strategy Call"
              className="rounded-full border border-black px-5 py-2.5 text-sm font-medium hover:bg-neutral-100"
            >
              Book Strategy Call
            </a>
          </div>

        </div>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CognixAI Labs",
              url: "/",
              logo: "/images/logo.png",
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "AI Automation Solutions",
              provider: { "@type": "Organization", name: "CognixAI Labs" },
              areaServed: "Global",
              description:
                "Custom AI automations for business workflow automation to streamline workflows and accelerate growth.",
              url: "#analysis",
            },
            {
              "@context": "https://schema.org",
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Free Workflow Analysis" },
              price: "0",
              priceCurrency: "USD",
              url: "#analysis",
              availability: "https://schema.org/InStock",
            },
          ]),
        }}
      />
      <style jsx>{`
        @keyframes panGrid {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .bg-dots { animation: panGrid 22s linear infinite; }

        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -6px) scale(1.02); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes pulse {
          0% { opacity: 0.16; }
          50% { opacity: 0.28; }
          100% { opacity: 0.16; }
        }
        .glow { animation: drift 18s ease-in-out infinite, pulse 7s ease-in-out infinite; }

        @keyframes vignettePulse {
          0% { opacity: 0.9; }
          50% { opacity: 1; }
          100% { opacity: 0.9; }
        }
        .vignette { animation: vignettePulse 16s ease-in-out infinite; }

        @keyframes dash { to { stroke-dashoffset: -360; } }

        /* diagonal sweep */
        .sweep-gradient {
          background: linear-gradient(60deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0) 65%);
          animation: sweep 14s linear infinite;
        }
        @keyframes sweep {
          0% { transform: translateX(-20%) translateY(0); }
          100% { transform: translateX(20%) translateY(0); }
        }

        /* floating dots */
        .float-dot {
          position: absolute;
          width: 6px; height: 6px;
          border-radius: 9999px;
          background: rgba(0,0,0,0.20);
          box-shadow: 0 0 10px rgba(0,0,0,0.10);
          animation: floatUp 10s ease-in-out infinite;
        }
        @keyframes floatUp {
          0%   { transform: translateY(0) translateX(0); opacity: 0.0; }
          10%  { opacity: 0.5; }
          50%  { transform: translateY(-40px) translateX(6px); opacity: 0.35; }
          90%  { opacity: 0.0; }
          100% { transform: translateY(-80px) translateX(12px); opacity: 0.0; }
        }
      `}</style>
    </section>
  )
}
