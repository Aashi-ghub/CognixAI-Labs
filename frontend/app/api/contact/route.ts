import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendContactSubmissionEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    // Hardcoded Supabase credentials
    const supabaseUrl = "https://wyqhofuwxzyyjnffavgq.supabase.co"
    const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5cWhvZnV3eHp5eWpuZmZhdmdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDQ4MzU4MywiZXhwIjoyMDgwMDU5NTgzfQ.oF5oekaf0y9E8MUsg1aLeTF_aik-aAeMMF8ScY8A-h0"
    
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    let body
    try {
      body = await req.json()
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { name, email, company, message } = body || {}
    if (!name || !email || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, message: !!message })
      return NextResponse.json({ error: "Missing required fields: name, email, and message are required" }, { status: 400 })
    }

    const { data, error } = await supabase.from("contact_submissions").insert({ 
      name: name.trim(), 
      email: email.trim(), 
      company: company?.trim() || null, 
      message: message.trim() 
    }).select()
    
    if (error) {
      console.error("Database insert error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json({ 
        error: error.message || "Failed to insert contact submission",
        details: error.details 
      }, { status: 500 })
    }
    
    if (!data) {
      console.error("No data returned from insert, but no error")
      return NextResponse.json({ error: "Failed to insert contact submission" }, { status: 500 })
    }
    
    // Send email notification (don't fail if email fails)
    try {
      await sendContactSubmissionEmail({
        name: name.trim(),
        email: email.trim(),
        company: company?.trim(),
        message: message.trim()
      })
      console.log("Email notification sent successfully")
    } catch (emailError) {
      console.error("Failed to send email notification (non-critical):", emailError)
      // Don't fail the request if email fails
    }
    
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error("Unexpected error in contact route:", {
      message: e?.message,
      stack: e?.stack,
      name: e?.name,
      cause: e?.cause
    })
    
    // Check if it's a fetch/network error
    if (e?.message?.includes("fetch failed") || e?.name === "TypeError") {
      return NextResponse.json({ 
        error: "Database connection failed. Please check your Supabase configuration.",
        details: e?.message 
      }, { status: 500 })
    }
    
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}





