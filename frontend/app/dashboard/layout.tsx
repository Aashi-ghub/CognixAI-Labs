import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access your CognixAI Labs dashboard to manage AI automation projects, view analytics, and monitor your automation workflows.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
