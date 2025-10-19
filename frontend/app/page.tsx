import HeroClean from "@/components/hero-clean"
import ShowcaseScroller from "@/components/showcase-scroller"
import AboutCompany from "@/components/about-company"
import TestimonialsRightStack from "@/components/testimonials-right-stack"
import ContactForm from "@/components/contact-form"
import SiteFooter from "@/components/site-footer"

export default function Page() {
  return (
    <main>
      <HeroClean />
      <ShowcaseScroller />
      <AboutCompany />
      <TestimonialsRightStack />
      <ContactForm />
      <SiteFooter />
    </main>
  )
}
