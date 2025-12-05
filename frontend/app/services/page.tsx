import Header from "@/components/header"
import ConsultationButton from "@/components/consultation-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Automation Services",
  description: "Discover our comprehensive AI automation services including workflow automation, AI-driven reporting, chatbot solutions, AI-powered IoT/PLC solutions, EMS, ERP/CRM development, landing pages, conversion optimization, and automation consulting for businesses.",
  keywords: ["AI automation services", "workflow automation", "AI reporting", "chatbot solutions", "automation consulting", "business automation", "AI-powered IoT solutions", "PLC programming", "EMS energy management", "ERP development", "CRM development", "landing pages", "conversion optimization", "CRO"],
  openGraph: {
    title: "AI Automation Services | CognixAI Labs",
    description: "Discover our comprehensive AI automation services including workflow automation, AI-driven reporting, chatbot solutions, AI-powered IoT/PLC solutions, EMS, ERP/CRM development, landing pages, conversion optimization, and automation consulting for businesses.",
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
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <ConsultationButton className="px-6 py-3 text-sm w-full sm:w-auto">
              Book Free Consultation
            </ConsultationButton>
          </div>
        </div>
      </section>

      {/* At-a-glance summary */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-all border border-[color:var(--border)] p-4 text-center">
              <div className="text-2xl font-semibold">7+</div>
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
                <ConsultationButton className="mt-6 px-5 py-2.5 text-sm">
                  Eliminate 90% of Manual Work
                </ConsultationButton>
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
                <ConsultationButton className="mt-6 px-5 py-2.5 text-sm">
                  Turn Data Into Insights Instantly
                </ConsultationButton>
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
                <ConsultationButton className="mt-6 px-5 py-2.5 text-sm">
                  Automate Your Lead Conversations
                </ConsultationButton>
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
                <ConsultationButton className="mt-6 px-5 py-2.5 text-sm">
                  Get Your Free Automation Roadmap
                </ConsultationButton>
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

      {/* Unified card: AI-Powered IoT Solutions (PLCs & EMS) */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h2 className="h2">AI-Powered IoT Solutions</h2>
                <p className="mt-3 text-sm leading-7">
                  Connect and automate industrial systems with AI-powered IoT solutions, PLC programming, and Energy Management Systems (EMS). 
                  We design, program, and deploy intelligent IoT solutions that leverage AI for real-time monitoring, predictive analytics, 
                  control, and optimization of manufacturing processes and energy consumption.
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-7">
                  <li>• AI-powered IoT solutions and intelligent automation</li>
                  <li>• PLC programming and integration (Siemens, Allen-Bradley, etc.)</li>
                  <li>• Energy Management Systems (EMS) design and implementation</li>
                  <li>• Sensor networks and data acquisition systems</li>
                  <li>• Real-time monitoring dashboards and SCADA systems</li>
                  <li>• Predictive maintenance and AI-driven analytics</li>
                </ul>
                <ConsultationButton className="mt-6 px-5 py-2.5 text-sm">
                  Optimize Your Systems With AI IoT
                </ConsultationButton>
              </div>
              <div className="p-6 md:p-8 bg-[color:var(--bg-elevated)]">
                <h3 className="font-semibold mb-3">Technologies & Industries</h3>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <div className="font-medium mb-1">Technologies</div>
                    <ul className="space-y-1">
                      <li>PLCs (Siemens, Allen-Bradley)</li>
                      <li>EMS & Smart Meters</li>
                      <li>IoT Sensors & Gateways</li>
                      <li>SCADA Systems</li>
                      <li>MQTT / Modbus / OPC-UA</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Industries</div>
                    <ul className="space-y-1">
                      <li>Manufacturing</li>
                      <li>Energy & Utilities</li>
                      <li>Smart Buildings</li>
                      <li>Agriculture & Smart Farming</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified card: ERP & CRM Development */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h2 className="h2">ERP & CRM Development</h2>
                <p className="mt-3 text-sm leading-7">
                  Build custom Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) systems 
                  tailored to your business needs. We develop comprehensive solutions that streamline operations, 
                  improve customer relationships, and provide real-time insights across your organization.
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-7">
                  <li>• Custom ERP system development and integration</li>
                  <li>• CRM platform design and implementation</li>
                  <li>• Multi-module business management systems</li>
                  <li>• Data migration and system integration</li>
                  <li>• User training and ongoing support</li>
                </ul>
                <ConsultationButton className="mt-6 px-5 py-2.5 text-sm">
                  Build a Custom ERP/CRM for Your Team
                </ConsultationButton>
              </div>
              <div className="p-6 md:p-8 bg-[color:var(--bg-elevated)]">
                <h3 className="font-semibold mb-3">Capabilities & Industries</h3>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <div className="font-medium mb-1">Capabilities</div>
                    <ul className="space-y-1">
                      <li>Inventory Management</li>
                      <li>Sales & Order Processing</li>
                      <li>Financial Management</li>
                      <li>HR & Payroll Systems</li>
                      <li>Reporting & Analytics</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Industries</div>
                    <ul className="space-y-1">
                      <li>Manufacturing</li>
                      <li>Retail & E-commerce</li>
                      <li>Professional Services</li>
                      <li>Healthcare</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified card: Landing Pages & Conversion Optimization */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h2 className="h2">Landing Pages & Conversion Optimization</h2>
                <p className="mt-3 text-sm leading-7">
                  Build high-converting landing pages using proven frameworks and conversion optimization techniques. 
                  We create fast, mobile-first pages that turn visitors into customers with strategic design, 
                  persuasive copywriting, and data-driven optimization.
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-7">
                  <li>• Conversion-focused landing page design</li>
                  <li>• A/B testing and conversion rate optimization (CRO)</li>
                  <li>• SEO-optimized, fast-loading pages</li>
                  <li>• Analytics integration and performance tracking</li>
                  <li>• Proven frameworks (Unbounce, Instapage, custom builds)</li>
                </ul>
                <ConsultationButton className="mt-6 px-5 py-2.5 text-sm">
                  Boost Your Page Conversions
                </ConsultationButton>
              </div>
              <div className="p-6 md:p-8 bg-[color:var(--bg-elevated)]">
                <h3 className="font-semibold mb-3">Techniques & Use Cases</h3>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <div className="font-medium mb-1">Techniques</div>
                    <ul className="space-y-1">
                      <li>Conversion-Focused Design</li>
                      <li>Persuasive Copywriting</li>
                      <li>Social Proof & Testimonials</li>
                      <li>Mobile-First Approach</li>
                      <li>Speed & Performance</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Use Cases</div>
                    <ul className="space-y-1">
                      <li>Lead Generation</li>
                      <li>Product Launches</li>
                      <li>Sales Funnels</li>
                      <li>E-commerce</li>
                      <li>Event Registration</li>
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


