"use client"

import { useState, useEffect } from "react"
import { supabase, isSupabaseConfigured } from "../../lib/supabase-client"
import { useAuth } from "../../lib/auth-context"
import { useRouter } from "next/navigation"
import { getUrl } from "../../lib/config"
import { Button } from "../../components/ui/button"

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin"
const ADMIN_PASSWORD = "admin@1281"
const ADMIN_SESSION_KEY = "admin_logged_in"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [isClient, setIsClient] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  // Check if admin is already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminLoggedIn = sessionStorage.getItem(ADMIN_SESSION_KEY)
      if (adminLoggedIn === "true") {
        // Redirect to home if admin is logged in
        router.push(getUrl.home())
      }
    }
  }, [router])

  // Fix hydration by ensuring client-side only rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Clear form fields when switching between sign in and sign up
  const clearForm = () => {
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setCompany("")
    setPhone("")
    setAcceptTerms(false)
    setStatus("idle")
    setErrorMessage("")
  }

  // Redirect if already logged in
  if (user) {
    router.push(getUrl.home())
    return null
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-[color:var(--surface)] text-[color:var(--bg)] py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 space-y-4 text-center shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[color:var(--brand)] mx-auto"></div>
            <h1 className="text-xl font-semibold text-gray-900">Loading...</h1>
            <p className="text-sm text-gray-600">Checking configuration...</p>
          </div>
        </div>
      </main>
    )
  }

  // Show configuration error if Supabase is not configured (client-side only)
  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-[color:var(--surface)] text-[color:var(--bg)] py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-red-300 bg-red-50/80 backdrop-blur-sm p-8 space-y-4 text-center shadow-lg">
            <h1 className="text-xl font-semibold text-red-600">Configuration Error</h1>
            <p className="text-sm text-gray-700">
              Supabase environment variables are not configured. Please check your .env file.
            </p>
            <div className="text-xs text-gray-500 mt-4 space-y-1">
              <p>Debug info:</p>
              <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET'}</p>
              <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'}</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")
    
    // Check for hardcoded admin credentials first
    if (!isSignUp && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Admin login - set session and redirect
      if (typeof window !== "undefined") {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "true")
      }
      setStatus("idle")
      router.push(getUrl.home())
      return
    }
    
    // Validation for sign up
    if (isSignUp) {
      if (!firstName.trim() || !lastName.trim()) {
        setStatus("error")
        setErrorMessage("First name and last name are required")
        return
      }
      if (!acceptTerms) {
        setStatus("error")
        setErrorMessage("Please accept the terms and conditions")
        return
      }
    }
    
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              company: company || null,
              phone: phone || null,
            }
          }
    })
    
    if (error) {
      setStatus("error")
      setErrorMessage(error.message)
    } else {
      setStatus("sent")
    }
      } else {
    const { error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
    })
    
    if (error) {
      setStatus("error")
      setErrorMessage(error.message)
    } else {
      router.push(getUrl.home())
        }
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("An unexpected error occurred")
    }
  }

  async function signInWithGoogle() {
    setStatus("sending")
    setErrorMessage("")
    
    try {
    const { error } = await supabase.auth.signInWithOAuth({ 
        provider: "google",
        options: {
          redirectTo: getUrl.authCallback()
        }
    })
    
    if (error) {
      setStatus("error")
      if (error.message.includes("provider is not enabled") || error.message.includes("Unsupported provider")) {
        setErrorMessage("Google sign-in is not configured. Please use email/password or contact support.")
      } else {
        setErrorMessage(error.message)
      }
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("An unexpected error occurred")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[color:var(--surface)] text-[color:var(--bg)] py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header with Logo */}
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/images/logo.png" 
              alt="CognixAI Labs" 
              className="h-12 w-auto"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600">
              {isSignUp ? "Create your account" : "Sign in to your account"}
            </p>
          </div>
        </div>

        {/* Main Login Card */}
        <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 space-y-6 shadow-lg">
          {/* Google Sign In */}
          <Button
            onClick={signInWithGoogle}
            disabled={status === "sending"}
            variant="outline"
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border-gray-300 font-medium"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {/* Name fields for sign up */}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required={isSignUp}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:border-transparent transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required={isSignUp}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
          <input
                id="email"
                name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:border-transparent transition-colors"
              />
            </div>

            {/* Company field for sign up */}
            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company/Organization
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company name"
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:border-transparent transition-colors"
                />
              </div>
            )}

            {/* Phone field for sign up */}
            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:border-transparent transition-colors"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:border-transparent transition-colors"
              />
              {isSignUp && (
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-[color:var(--brand)] hover:text-[color:var(--brand)]/80 transition-colors"
                >
                  Forgot password?
          </button>
              </div>
            )}

            {/* Terms and conditions for sign up */}
            {isSignUp && (
              <div className="flex items-start space-x-3">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required={isSignUp}
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-[color:var(--brand)] border-gray-300 rounded focus:ring-[color:var(--brand)] focus:ring-2"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="/terms" className="text-[color:var(--brand)] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[color:var(--brand)] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full h-12 bg-[color:var(--brand)] hover:bg-[color:var(--brand)]/90 text-black font-semibold"
            >
              {status === "sending" ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  {isSignUp ? "Creating account..." : "Signing in..."}
                </div>
              ) : (
                isSignUp ? "Create account" : "Sign in"
              )}
            </Button>
        </form>

          {/* Status Messages */}
          {status === "sent" && isSignUp && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-700">
                Check your email for a confirmation link to complete your registration.
              </p>
            </div>
          )}
          
          {status === "error" && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{errorMessage || "An error occurred. Please try again."}</p>
            </div>
          )}
        </div>

        {/* Toggle Sign Up/Sign In */}
        <div className="text-center">
          <p className="text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                clearForm()
              }}
              className="text-[color:var(--brand)] hover:text-[color:var(--brand)]/80 font-medium transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}