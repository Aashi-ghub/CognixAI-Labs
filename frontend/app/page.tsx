import HeroClean from "@/components/hero-clean"
import ShowcaseScroller from "@/components/showcase-scroller"
import AutomationCommandCenter from "@/components/automation-command-center"
import TestimonialsRightStack from "@/components/testimonials-right-stack"
import ContactForm from "@/components/contact-form"
import SiteFooter from "@/components/site-footer"
import GetStartedFlow from "@/components/get-started-flow"

export default function Page() {
  return (
    <main>
      <HeroClean />
      <ShowcaseScroller />
      <GetStartedFlow />
      <AutomationCommandCenter />
      <TestimonialsRightStack />
      <ContactForm />
      <SiteFooter />
    </main>
  )
}
