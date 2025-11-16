import ScrollReveal from "./scroll-reveal"

export default function Hero() {
  return (
    <header className="section pt-10 md:pt-16">
      <div className="max-w-6xl mx-auto">
        {/* Navbar */}
        <nav className="mb-6 md:mb-10 flex items-center justify-between surface px-3 md:px-4 py-2 md:py-3">
          <div className="font-semibold text-sm md:text-base" style={{ color: "var(--brand)" }}>
            AI Automation Agency
          </div>
          <ul className="hidden md:flex gap-6 text-sm text-[var(--muted-fg)]">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#case-studies">Case Studies/Demos</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#testimonials">Client Testimonials</a>
            </li>
            <li>
              <a href="#contact">Contact &amp; Inquiry</a>
            </li>
          </ul>
        </nav>

        <div className="max-w-5xl mx-auto text-center px-4">
          <ScrollReveal>
            <h1 className="display display-xl text-balance mb-4 md:mb-5 px-2">
              AI‑Powered Automation to Optimize Your Business Workflows
            </h1>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <p className="max-w-2xl mx-auto text-[var(--muted-fg)] leading-relaxed text-sm md:text-base px-2">save time, cut costs, scale fast</p>
          </ScrollReveal>

          <ScrollReveal delayMs={180}>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
              <a href="#contact" className="btn w-full sm:w-auto text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3">
                Contact &amp; Inquiry
              </a>
              <a
                href="#services"
                className="btn w-full sm:w-auto text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3"
                style={{ background: "transparent", color: "var(--fg)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Services
              </a>
            </div>
          </ScrollReveal>

          {/* From-scratch mock "hero board" replacing prior image */}
          <ScrollReveal delayMs={240}>
            <div className="mt-8 md:mt-14 img-frame mx-auto max-w-3xl p-3 md:p-5">
              <div className="mock-panel">
                <span className="mock-chip text-xs md:text-sm">AI Automation</span>
                <div className="mock-title" />
                <div className="mock-line" />
                <div className="mock-line" />
                <div className="mock-line" style={{ width: "70%" }} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </header>
  )
}
