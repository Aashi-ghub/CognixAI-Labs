"use client"
import { useEffect, useRef, useState } from "react"
import { useConsultationPopup } from "@/lib/consultation-popup-context"

const typewriterWords = [
  "AI Workflow Designers",
  "Client Outreach Bots",
  "Operations Assistants",
  "Sales Automators",
  "Data Sync Agents"
]

export default function HeroClean() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const typewriterRef = useRef<HTMLSpanElement>(null)
  const { openWorkflowAnalysis } = useConsultationPopup()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const elements: HTMLElement[] = [h1Ref.current, ctasRef.current].filter(Boolean) as HTMLElement[]
    if (!elements.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add("opacity-100", "translate-y-0")
            el.classList.remove("opacity-0", "translate-y-2")
          }
        })
      },
      { threshold: 0.2 },
    )

    elements.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-2", "transition-all", "duration-700", "will-change-transform")
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (!typewriterRef.current) return
    
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100
    let timeoutId: NodeJS.Timeout | null = null
    let isActive = true

    const type = () => {
      if (!isActive || !typewriterRef.current) return
      
      const currentWord = typewriterWords[wordIndex]
      
      if (isDeleting) {
        typewriterRef.current.textContent = currentWord.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        typewriterRef.current.textContent = currentWord.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % typewriterWords.length
        typingSpeed = 500
      }

      if (isActive) {
        timeoutId = setTimeout(type, typingSpeed)
      }
    }

    timeoutId = setTimeout(type, 1000)
    return () => {
      isActive = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] bg-white text-neutral-900 overflow-hidden"
      aria-label="Hero"
      style={{ perspective: "1000px" }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <div className="animated-grid" />
      </div>

      {/* Multiple Aurora background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <div className="aurora-1" />
        <div className="aurora-2" />
        <div className="aurora-3" />
        <div className="aurora-4" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden" aria-hidden>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden" aria-hidden>
        <div 
          className="glow-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        <div
          className="glow-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <div
          className="glow-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * -25}px)`,
          }}
        />
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden" aria-hidden>
        <div className="geometric-shape shape-1" />
        <div className="geometric-shape shape-2" />
        <div className="geometric-shape shape-3" />
        </div>

      <div 
        className="relative z-10 mx-auto max-w-6xl px-4 flex items-center justify-center min-h-[100svh]"
        style={{
          transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="w-full text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--brand)] mb-3 animate-fade-in">
            <span className="inline-block animate-pulse">Automation.</span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.2s" }}>Intelligence.</span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.4s" }}>Scale.</span>
          </p>
          <h1
            ref={h1Ref}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center px-4 break-words overflow-wrap-anywhere"
          >
            Turn your business into<br className="hidden sm:block" />
            <span className="animated-gradient-text block sm:inline sm:whitespace-nowrap">
              an automated powerhouse
            </span>
          </h1>

          <h2 className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium text-neutral-700 animate-slide-up px-4">
            Build. Launch. Scale. All with AI automation.
          </h2>

          <div
            ref={ctasRef}
            className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4"
          >
            <a
              href="/services"
              aria-label="Explore Our Services"
              className="group relative rounded-full bg-[color:var(--brand)] w-full sm:w-auto px-6 py-3 text-sm font-medium text-[color:var(--on-brand)] shadow-[0_0_30px_rgba(0,230,195,0.35)] hover:shadow-[0_0_50px_rgba(0,230,195,0.6)] transition-all duration-300 hover:scale-105 overflow-hidden text-center"
            >
              <span className="relative z-10">Explore Our Services</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                openWorkflowAnalysis()
              }}
              aria-label="Get Free Workflow Analysis"
              className="group relative rounded-full bg-[color:var(--brand)] w-full sm:w-auto px-6 py-3 text-sm font-medium text-[color:var(--on-brand)] shadow-[0_0_30px_rgba(0,230,195,0.35)] hover:shadow-[0_0_50px_rgba(0,230,195,0.6)] transition-all duration-300 hover:scale-105 overflow-hidden text-center"
            >
              <span className="relative z-10">Get Free Workflow Analysis</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
            <a
              href="#contact"
              aria-label="Book Strategy Call"
              className="group relative rounded-full border border-neutral-300 w-full sm:w-auto px-6 py-3 text-sm font-medium hover:bg-neutral-100 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
            >
              <span className="relative z-10">Book Strategy Call</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
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
        /* Animated grid background */
        .animated-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 230, 195, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 230, 195, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        /* Aurora effects */
        .aurora-1 {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 80%;
          height: 40%;
          background: radial-gradient(ellipse 60% 50% at 30% 50%, rgba(0, 230, 195, 0.08), transparent);
          animation: aurora1 25s ease-in-out infinite;
          filter: blur(80px);
        }

        .aurora-2 {
          position: absolute;
          top: 20%;
          right: -15%;
          width: 70%;
          height: 50%;
          background: radial-gradient(ellipse 50% 60% at 70% 40%, rgba(0, 230, 195, 0.06), transparent);
          animation: aurora2 30s ease-in-out infinite;
          filter: blur(70px);
        }

        .aurora-3 {
          position: absolute;
          bottom: -10%;
          left: 10%;
          width: 60%;
          height: 35%;
          background: radial-gradient(ellipse 70% 40% at 50% 60%, rgba(0, 230, 195, 0.07), transparent);
          animation: aurora3 22s ease-in-out infinite;
          filter: blur(75px);
        }

        .aurora-4 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 55%;
          height: 55%;
          background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0, 230, 195, 0.05), transparent);
          animation: aurora4 28s ease-in-out infinite;
          filter: blur(90px);
        }

        @keyframes aurora1 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          33% {
            transform: translate(5%, -3%) scale(1.1) rotate(2deg);
            opacity: 0.85;
          }
          66% {
            transform: translate(-3%, 4%) scale(0.95) rotate(-1deg);
            opacity: 1;
          }
        }

        @keyframes aurora2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          33% {
            transform: translate(-4%, 5%) scale(1.05) rotate(-2deg);
            opacity: 0.9;
          }
          66% {
            transform: translate(3%, -2%) scale(0.98) rotate(1deg);
            opacity: 1;
          }
        }

        @keyframes aurora3 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          33% {
            transform: translate(4%, 3%) scale(1.08) rotate(1.5deg);
            opacity: 0.88;
          }
          66% {
            transform: translate(-5%, -4%) scale(0.92) rotate(-1.5deg);
            opacity: 1;
          }
        }

        @keyframes aurora4 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          33% {
            transform: translate(-48%, -52%) scale(1.12) rotate(3deg);
            opacity: 0.82;
          }
          66% {
            transform: translate(-52%, -48%) scale(0.9) rotate(-2deg);
            opacity: 1;
          }
        }

        /* Floating particles */
        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 230, 195, 0.4);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0, 230, 195, 0.5);
          animation: floatParticle linear infinite;
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(100px) scale(1);
            opacity: 0;
          }
        }

        /* Glowing orbs */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          transition: transform 0.3s ease-out;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 230, 195, 0.4), transparent);
          top: 10%;
          left: 10%;
          animation: orbPulse1 4s ease-in-out infinite;
        }

        .orb-2 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0, 230, 195, 0.3), transparent);
          bottom: 20%;
          right: 15%;
          animation: orbPulse2 5s ease-in-out infinite;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(0, 230, 195, 0.35), transparent);
          top: 50%;
          right: 20%;
          animation: orbPulse3 6s ease-in-out infinite;
        }

        @keyframes orbPulse1 {
          0%, 100% { opacity: 0.5; filter: blur(40px) brightness(1); }
          50% { opacity: 0.8; filter: blur(35px) brightness(1.2); }
        }

        @keyframes orbPulse2 {
          0%, 100% { opacity: 0.4; filter: blur(40px) brightness(1); }
          50% { opacity: 0.7; filter: blur(30px) brightness(1.3); }
        }

        @keyframes orbPulse3 {
          0%, 100% { opacity: 0.45; filter: blur(40px) brightness(1); }
          50% { opacity: 0.75; filter: blur(35px) brightness(1.15); }
        }

        /* Geometric shapes */
        .geometric-shape {
          position: absolute;
          border: 2px solid rgba(0, 230, 195, 0.2);
          animation: rotateShape linear infinite;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          right: 10%;
          border-radius: 20% 80% 20% 80%;
          animation-duration: 20s;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          bottom: 30%;
          left: 15%;
          border-radius: 50%;
          animation-duration: 25s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          top: 60%;
          left: 80%;
          transform: rotate(45deg);
          animation-duration: 15s;
        }

        @keyframes rotateShape {
          0% { transform: rotate(0deg); opacity: 0.2; }
          50% { opacity: 0.4; }
          100% { transform: rotate(360deg); opacity: 0.2; }
        }

        /* Animated gradient text */
        .animated-gradient-text {
          background: linear-gradient(
            90deg,
            rgba(0, 230, 195, 1) 0%,
            rgba(0, 230, 195, 1) 25%,
            rgba(6, 182, 212, 1) 50%,
            rgba(0, 230, 195, 1) 75%,
            rgba(0, 230, 195, 1) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Text animations */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.3s both;
        }
      `}</style>
    </section>
  )
}
