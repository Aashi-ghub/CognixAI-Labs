"use client"
import ScrollGlassNav from "./scroll-glass-nav"
import { useAuth } from "../lib/auth-context"
import { useRouter } from "next/navigation"
import { getUrl } from "../lib/config"

export default function Header() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push(getUrl.home())
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href={getUrl.home()} className="flex items-center space-x-2">
            <img 
              src="/images/logo.png" 
              alt="CognixAI Labs" 
              className="h-8 w-auto"
            />
            <span className="font-semibold tracking-tight text-[color:var(--bg)]">
              CognixAI Labs
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-5 md:ml-auto md:justify-end">
            <a href={getUrl.route("/services")} className="text-[color:var(--bg)] hover:opacity-80 transition">
              Services
            </a>
            <a href="#demo" className="text-[color:var(--bg)] hover:opacity-80 transition">
              Demo
            </a>
            {user ? (
              <div className="flex items-center gap-3">
                <a 
                  href={getUrl.dashboard()} 
                  className="text-[color:var(--bg)] hover:opacity-80 transition text-sm"
                >
                  Dashboard
                </a>
                <span className="text-[color:var(--bg)] text-sm">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-[color:var(--bg)] hover:opacity-80 transition text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href={getUrl.login()}
                className="text-[color:var(--bg)] hover:opacity-80 transition"
              >
                Login
              </a>
            )}
            <a
              href="#contact"
              className="btn btn-primary glow-teal !px-3 !py-1.5 text-xs md:!px-3 md:!py-1.5 md:text-sm"
            >
              Book Free Consultation
            </a>
          </nav>
        </div>
      </header>
      <ScrollGlassNav />
    </>
  )
}
