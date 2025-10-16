"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus("error")
      return
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setStatus("error")
    } else {
      setStatus("sent")
    }
  }

  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    const emailVal = (data.get("email") as string) || ""
    const passwordVal = (data.get("password") as string) || ""
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus("error")
      return
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { error } = await supabase.auth.signInWithPassword({ email: emailVal, password: passwordVal })
    setStatus(error ? "error" : "sent")
  }

  async function signInWithGoogle() {
    setStatus("sending")
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus("error")
      return
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" })
    setStatus(error ? "error" : "idle")
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <form onSubmit={sendMagicLink} className="rounded-3xl border p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-sm opacity-80">We'll email you a secure sign-in link.</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-11 rounded-xl border px-3 bg-transparent"
          />
          <button disabled={status === "sending"} className="btn w-full">
            {status === "sending" ? "Sending..." : "Send Magic Link"}
          </button>
          {status === "sent" && <div className="text-sm text-[color:var(--brand)]">Check your email.</div>}
          {status === "error" && <div className="text-sm text-red-400">Failed to send link.</div>}
        </form>

        <form onSubmit={signInWithPassword} className="rounded-3xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Email & Password</h2>
          <input name="email" type="email" required placeholder="you@example.com" className="w-full h-11 rounded-xl border px-3 bg-transparent" />
          <input name="password" type="password" required placeholder="Your password" className="w-full h-11 rounded-xl border px-3 bg-transparent" />
          <button disabled={status === "sending"} className="btn w-full">Sign In</button>
          {status === "error" && <div className="text-sm text-red-400">Invalid credentials.</div>}
        </form>

        <div className="rounded-3xl border p-6 space-y-4 text-center">
          <h2 className="text-lg font-semibold">Or continue with</h2>
          <button onClick={signInWithGoogle} className="btn w-full">Google</button>
        </div>
      </div>
    </main>
  )
}




