"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// Hardcoded Supabase credentials (same as API routes)
const SUPABASE_URL = "https://wyqhofuwxzyyjnffavgq.supabase.co"
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5cWhvZnV3eHp5eWpuZmZhdmdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDQ4MzU4MywiZXhwIjoyMDgwMDU5NTgzfQ.oF5oekaf0y9E8MUsg1aLeTF_aik-aAeMMF8ScY8A-h0"

// Admin credentials
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin@1281"
const AUTH_STORAGE_KEY = "admin_authenticated"

interface ConsultationRequest {
  id: string
  name: string
  contact: string
  email?: string
  phone?: string
  company?: string
  goal: string
  industry?: string
  team_size?: string
  challenge?: string
  wants_call: boolean
  created_at: string
}

interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  message: string
  created_at: string
}

export default function SubmissionsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"consultations" | "contacts">("consultations")
  const [searchQuery, setSearchQuery] = useState("")

  // Check if already authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authStatus = sessionStorage.getItem(AUTH_STORAGE_KEY)
      if (authStatus === "true") {
        setIsAuthenticated(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    fetchData()
    // Set up real-time subscription
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    const consultationChannel = supabase
      .channel("consultation-submissions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "consultation_requests" },
        () => {
          fetchData() // Refresh on new submission
        }
      )
      .subscribe()

    const contactChannel = supabase
      .channel("contact-submissions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_submissions" },
        () => {
          fetchData() // Refresh on new submission
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(consultationChannel)
      supabase.removeChannel(contactChannel)
    }
  }, [isAuthenticated])

  const fetchData = async () => {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
      
      const [consultationsRes, contactsRes] = await Promise.all([
        supabase
          .from("consultation_requests")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100),
        supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100)
      ])

      if (consultationsRes.data) setConsultations(consultationsRes.data)
      if (contactsRes.data) setContacts(contactsRes.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredConsultations = consultations.filter((item) => {
    const query = searchQuery.toLowerCase()
    return (
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.phone?.toLowerCase().includes(query) ||
      item.company?.toLowerCase().includes(query) ||
      item.goal?.toLowerCase().includes(query)
    )
  })

  const filteredContacts = contacts.filter((item) => {
    const query = searchQuery.toLowerCase()
    return (
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.company?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query)
    )
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      if (typeof window !== "undefined") {
        sessionStorage.setItem(AUTH_STORAGE_KEY, "true")
      }
    } else {
      setAuthError("Invalid username or password")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(AUTH_STORAGE_KEY)
    }
    setUsername("")
    setPassword("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const exportToCSV = () => {
    const data = activeTab === "consultations" ? filteredConsultations : filteredContacts
    const headers = activeTab === "consultations" 
      ? ["Name", "Email", "Phone", "Company", "Goal", "Industry", "Team Size", "Wants Call", "Date"]
      : ["Name", "Email", "Company", "Message", "Date"]
    
    const csv = [
      headers.join(","),
      ...data.map((item: any) => {
        if (activeTab === "consultations") {
          return [
            `"${item.name || ""}"`,
            `"${item.email || ""}"`,
            `"${item.phone || ""}"`,
            `"${item.company || ""}"`,
            `"${item.goal || ""}"`,
            `"${item.industry || ""}"`,
            `"${item.team_size || ""}"`,
            item.wants_call ? "Yes" : "No",
            `"${formatDate(item.created_at)}"`
          ].join(",")
        } else {
          return [
            `"${item.name || ""}"`,
            `"${item.email || ""}"`,
            `"${item.company || ""}"`,
            `"${(item.message || "").replace(/"/g, '""')}"`,
            `"${formatDate(item.created_at)}"`
          ].join(",")
        }
      })
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeTab}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 rounded-lg border border-white/10 p-8 backdrop-blur-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
            <p className="text-white/60 text-sm">Enter your credentials to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-[#18e2a5]"
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-[#18e2a5]"
                placeholder="Enter password"
                required
              />
            </div>
            {authError && (
              <div className="text-red-400 text-sm">{authError}</div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#18e2a5] text-black rounded-md font-medium hover:bg-[#18e2a5]/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18e2a5] mx-auto mb-4"></div>
          <p>Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Form Submissions Dashboard</h1>
            <p className="text-white/60">Monitor all form submissions in real-time</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white hover:bg-white/10 transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2 border-b border-white/10">
            <button
              onClick={() => setActiveTab("consultations")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "consultations"
                  ? "border-b-2 border-[#18e2a5] text-[#18e2a5]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Consultations ({consultations.length})
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "contacts"
                  ? "border-b-2 border-[#18e2a5] text-[#18e2a5]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Contacts ({contacts.length})
            </button>
          </div>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-[#18e2a5]"
            />
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-[#18e2a5] text-black rounded-md font-medium hover:bg-[#18e2a5]/90 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Consultations Table */}
        {activeTab === "consultations" && (
          <div className="bg-white/5 rounded-lg border border-white/10 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Industry</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Wants Call</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredConsultations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-white/40">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  filteredConsultations.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{item.email || item.contact}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{item.phone || "-"}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{item.company || "-"}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{item.industry || "-"}</td>
                      <td className="px-4 py-3 text-sm">
                        {item.wants_call ? (
                          <span className="px-2 py-1 bg-[#18e2a5]/20 text-[#18e2a5] rounded text-xs">Yes</span>
                        ) : (
                          <span className="text-white/40">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/60">{formatDate(item.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Contacts Table */}
        {activeTab === "contacts" && (
          <div className="bg-white/5 rounded-lg border border-white/10 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{item.email}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{item.company || "-"}</td>
                      <td className="px-4 py-3 text-sm text-white/80 max-w-xs truncate">{item.message}</td>
                      <td className="px-4 py-3 text-sm text-white/60">{formatDate(item.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg border border-white/10 p-4">
            <div className="text-2xl font-bold text-[#18e2a5]">{consultations.length}</div>
            <div className="text-sm text-white/60">Total Consultations</div>
          </div>
          <div className="bg-white/5 rounded-lg border border-white/10 p-4">
            <div className="text-2xl font-bold text-[#18e2a5]">{contacts.length}</div>
            <div className="text-sm text-white/60">Total Contacts</div>
          </div>
          <div className="bg-white/5 rounded-lg border border-white/10 p-4">
            <div className="text-2xl font-bold text-[#18e2a5]">
              {consultations.filter((c) => c.wants_call).length}
            </div>
            <div className="text-sm text-white/60">Want Strategy Call</div>
          </div>
        </div>
      </div>
    </div>
  )
}

