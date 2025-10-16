import { ScrollReveal } from "./scroll-reveal"

export default function AboutCompany() {
  return (
    <section id="about" className="section-light">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <ScrollReveal>
          <div>
            <h2 className="h2">About the Company</h2>
            <p className="p muted mt-3">
              We deliver production-grade AI automations that reduce costs and unlock growth—with security and
              governance by default.
            </p>

            <div className="mt-10 max-w-4xl">
              <h3 className="font-semibold text-lg mb-6">Our Services</h3>
              <p className="text-sm leading-7 mb-6">
                We build custom AI automation solutions for email management, customer support, data processing, and workflow integration to transform your business operations.
              </p>
              
              <h3 className="font-semibold text-lg mb-6">Our Approach</h3>
              <p className="text-sm leading-7 mb-6">
                We use outcome-first design with rapid deployment, comprehensive team training, and continuous optimization to deliver measurable business value.
              </p>
              
              <h3 className="font-semibold text-lg mb-6">Why Choose Us</h3>
              <p className="text-sm leading-7 mb-6">
                With over 5 years of experience in AI automation, we've helped 200+ businesses reduce operational costs by 40% on average while improving efficiency and customer satisfaction. Our team combines deep technical expertise with business acumen to deliver solutions that drive real results.
              </p>
              
              <h3 className="font-semibold text-lg mb-6">Our Process</h3>
              <p className="text-sm leading-7 mb-6">
                We start with a comprehensive workflow analysis to identify automation opportunities. Our 4-phase approach includes discovery, design, development, and deployment, with each phase including stakeholder reviews and iterative improvements to ensure optimal outcomes.
              </p>
              
              <h3 className="font-semibold text-lg mb-6">Industry Expertise</h3>
              <p className="text-sm leading-7">
                We specialize in serving SaaS companies, e-commerce businesses, professional services firms, and healthcare organizations. Our solutions are tailored to meet industry-specific compliance requirements and operational challenges.
              </p>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
