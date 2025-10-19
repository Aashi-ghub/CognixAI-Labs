import Header from "@/components/header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Automation Services",
  description: "Discover our comprehensive AI automation services including workflow automation, AI-driven reporting, chatbot solutions, and automation consulting for businesses.",
  keywords: ["AI automation services", "workflow automation", "AI reporting", "chatbot solutions", "automation consulting", "business automation"],
  openGraph: {
    title: "AI Automation Services | CognixAI Labs",
    description: "Discover our comprehensive AI automation services including workflow automation, AI-driven reporting, chatbot solutions, and automation consulting for businesses.",
    type: "website",
  },
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="text-[color:var(--bg)] bg-[color:var(--section-light)]">
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--brand)] mb-3">Our Services</p>
          <h1 className="text-balance text-4xl md:text-6xl font-semibold leading-tight">Bespoke AI Automation for Agencies & Businesses</h1>
          <p className="mt-4 max-w-3xl text-[15px] md:text-lg leading-relaxed">
            CognixAI Labs delivers tailor-made automation solutions to help marketing agencies, startups, and business
            teams scale faster, reduce manual workload, and unlock new growth. We blend the speed of AI with proven
            consulting to accelerate your operations.
          </p>
        </div>
      </section>

      {/* At-a-glance summary */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-all border border-[color:var(--border)] p-4 text-center">
              <div className="text-2xl font-semibold">4+</div>
              <div className="text-xs mt-1 opacity-80">Core Service Lines</div>
            </div>
            <div className="rounded-all border border-[color:var(--border)] p-4 text-center">
              <div className="text-2xl font-semibold">200+</div>
              <div className="text-xs mt-1 opacity-80">Automations Shipped</div>
            </div>
            <div className="rounded-all border border-[color:var(--border)] p-4 text-center">
              <div className="text-2xl font-semibold">40%</div>
              <div className="text-xs mt-1 opacity-80">Avg. Cost Reduction</div>
            </div>
            <div className="rounded-all border border-[color:var(--border)] p-4 text-center">
              <div className="text-2xl font-semibold">6–8 wks</div>
              <div className="text-xs mt-1 opacity-80">Typical Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified card: Workflow Automation */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h2 className="h2">Workflow Automation</h2>
                <p className="mt-3 text-sm leading-7">
                  Eliminate repetitive manual tasks across campaigns, sales, and operations. We design automations for
                  data entry, approvals, reporting, and notifications—so your team spends less time on routine work and
                  more on results.
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-7">
                  <li>• CRM and sales pipeline sync</li>
                  <li>• Scheduled email/campaign automation</li>
                  <li>• Real-time data extraction and update bots</li>
                  <li>• Integration with Zapier, Make, n8n, and custom APIs</li>
                </ul>
              </div>
              <div className="p-6 md:p-8 bg-[color:var(--bg-elevated)]">
                <h3 className="font-semibold mb-3">Examples</h3>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <div className="font-medium mb-1">Platforms</div>
                    <ul className="space-y-1">
                      <li>Gmail / Microsoft 365</li>
                      <li>HubSpot / Salesforce</li>
                      <li>Slack / Teams</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Industries</div>
                    <ul className="space-y-1">
                      <li>Agencies and B2B Services</li>
                      <li>E‑commerce and Retail</li>
                      <li>Startups and SMBs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified card: AI-Driven Reporting & Analytics */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-semibold">AI-Driven Reporting & Analytics</h2>
                <p className="mt-3 text-sm leading-7">
                  Transform raw data into actionable insights. Our AI-powered pipelines automate report creation,
                  consolidate data across platforms, and deliver smart dashboards—helping you track KPIs and identify
                  opportunities instantly.
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-7">
                  <li>• Automated cross-platform reports</li>
                  <li>• Smart alerting and anomaly detection</li>
                  <li>• Custom interactive dashboards</li>
                  <li>• Data visualization and export</li>
                </ul>
              </div>
              <div className="p-6 md:p-8 bg-[color:var(--bg-elevated)]">
                <h3 className="font-semibold mb-3">Examples</h3>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <div className="font-medium mb-1">Platforms</div>
                    <ul className="space-y-1">
                      <li>BigQuery / Snowflake / PostgreSQL</li>
                      <li>Looker / Power BI / Metabase</li>
                      <li>Segment / GA4</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Industries</div>
                    <ul className="space-y-1">
                      <li>Marketing and Growth</li>
                      <li>Product and Operations</li>
                      <li>E‑commerce and Retail</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified card: Chatbot Solutions */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h2 className="h2">Chatbot Solutions</h2>
                <p className="mt-3 text-sm leading-7">
                  Increase engagement and automate customer conversations. We build chatbots for websites, CRMs, and
                  messaging apps to qualify leads, answer FAQs, and provide instant support—24/7.
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-7">
                  <li>• AI chatbot setup (OpenAI, Dialogflow, Rasa, etc.)</li>
                  <li>• Lead qualification and scheduling</li>
                  <li>• Support and onboarding flows</li>
                  <li>• Custom integration with existing tools</li>
                </ul>
              </div>
              <div className="p-6 md:p-8 bg-[color:var(--bg-elevated)]">
                <h3 className="font-semibold mb-3">Examples</h3>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <div className="font-medium mb-1">Platforms</div>
                    <ul className="space-y-1">
                      <li>Web / WhatsApp / Messenger</li>
                      <li>HubSpot / Intercom / Zendesk</li>
                      <li>Slack / Teams</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Industries</div>
                    <ul className="space-y-1">
                      <li>Agencies</li>
                      <li>Customer Support</li>
                      <li>SaaS and B2B</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified card: Consulting & Automation Strategy */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h2 className="h2">Consulting & Automation Strategy</h2>
                <p className="mt-3 text-sm leading-7">
                  Not sure where to start? Our experts audit your workflows, uncover automation gaps, and map an
                  ROI-focused plan using industry best practices.
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-7">
                  <li>• Automation opportunity assessment</li>
                  <li>• Workflow audits and process mapping</li>
                  <li>• Implementation roadmaps</li>
                  <li>• Proof-of-concept demos</li>
                </ul>
              </div>
              <div className="p-6 md:p-8 bg-[color:var(--bg-elevated)]">
                <h3 className="font-semibold mb-3">Examples</h3>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <div className="font-medium mb-1">Platforms</div>
                    <ul className="space-y-1">
                      <li>OpenAI / Anthropic / Azure AI</li>
                      <li>LangChain / LlamaIndex</li>
                      <li>Vector DBs (Pinecone, pgvector)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Industries</div>
                    <ul className="space-y-1">
                      <li>SaaS and B2B</li>
                      <li>Consumer Apps</li>
                      <li>Enterprise IT</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </main>
    </>
  )
}


