import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "../lib/auth-context"
import DynamicFavicon from "../components/dynamic-favicon"
import Header from "../components/header"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "CognixAI Labs - AI Automation Solutions",
    template: "%s | CognixAI Labs"
  },
  description: "Transform your business with custom AI automation solutions. We help agencies, startups, and enterprises streamline workflows, reduce costs, and accelerate growth through intelligent automation.",
  keywords: ["AI automation", "business automation", "workflow automation", "AI solutions", "automation consulting", "AI chatbots", "data analytics", "process optimization"],
  authors: [{ name: "CognixAI Labs" }],
  creator: "CognixAI Labs",
  publisher: "CognixAI Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cognixai-labs.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-light.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon-light.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/favicon-light.png", sizes: "180x180", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", sizes: "180x180", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cognixai-labs.vercel.app",
    siteName: "CognixAI Labs",
    title: "CognixAI Labs - AI Automation Solutions",
    description: "Transform your business with custom AI automation solutions. We help agencies, startups, and enterprises streamline workflows, reduce costs, and accelerate growth through intelligent automation.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "CognixAI Labs - AI Automation Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CognixAI Labs - AI Automation Solutions",
    description: "Transform your business with custom AI automation solutions. We help agencies, startups, and enterprises streamline workflows, reduce costs, and accelerate growth through intelligent automation.",
    images: ["/images/logo.png"],
    creator: "@cognixailabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={"antialiased"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee&family=Dosis:wght@200..800&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00e28f" />
      </head>
      <body className="font-sans scroll-smooth">
        <DynamicFavicon />
        <AuthProvider>
          <Header />
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
