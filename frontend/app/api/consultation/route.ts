import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendConsultationSubmissionEmail } from "@/lib/email"

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

    const { name, contact, company, goal, industry, teamSize, challenge, wantsCall, email, phone, companyWebsite, automationRequirements } = body || {}
    
    // Handle both old and new formats
    if (industry && teamSize && challenge) {
      // New format: AI Workflow Audit - use new structured fields
      const goalText = goal || `AI Workflow Audit - Industry: ${industry}, Team Size: ${teamSize}, Challenge: ${challenge}${wantsCall ? " - Wants Strategy Call" : ""}`
      
      // Build contact info - prefer email/phone from form, fallback to old contact field
      const contactInfo = email || phone || contact || "via-popup"
      const contactName = name?.trim() || email?.split("@")[0] || "AI Audit Lead"
      
      const insertData: any = { 
        name: contactName, 
        contact: contactInfo, 
        company: company || null, 
        goal: goalText,
        industry: industry,
        team_size: teamSize,
        challenge: challenge,
        wants_call: wantsCall === true
      }
      
      // Add new fields if they exist
      if (email) insertData.email = email
      if (phone) insertData.phone = phone
      if (companyWebsite) insertData.company_website = companyWebsite
      if (automationRequirements) insertData.automation_requirements = automationRequirements
      
      const { data, error } = await supabase.from("consultation_requests").insert(insertData).select()
      if (error) {
        console.error("Database insert error (new format):", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        return NextResponse.json({ 
          error: error.message || "Failed to insert consultation request",
          details: error.details 
        }, { status: 500 })
      }
      if (!data) {
        console.error("No data returned from insert (new format), but no error")
        return NextResponse.json({ error: "Failed to insert consultation request" }, { status: 500 })
      }
      
      // Send email notification (don't fail if email fails)
      try {
        await sendConsultationSubmissionEmail({
          name: contactName,
          email: email || undefined,
          phone: phone || undefined,
          company: company || undefined,
          goal: goalText,
          industry: industry || undefined,
          teamSize: teamSize || undefined,
          challenge: challenge || undefined,
          wantsCall: wantsCall === true,
          companyWebsite: companyWebsite || undefined,
          automationRequirements: automationRequirements || undefined
        })
        console.log("Email notification sent successfully (new format)")
      } catch (emailError) {
        console.error("Failed to send email notification (non-critical):", emailError)
      }
      
      return NextResponse.json({ ok: true })
    }
    
    // Old format (backward compatibility)
    // For popup: contact can come from email field, so check both
    const contactValue = contact || email || phone
    if (!name || !contactValue || !goal) {
      console.error("Missing required fields:", { name: !!name, contact: !!contactValue, goal: !!goal })
      return NextResponse.json({ error: "Missing required fields: name, contact (or email/phone), and goal are required" }, { status: 400 })
    }

    const insertData: any = { 
      name: name.trim(), 
      contact: contactValue, 
      company: company || null, 
      goal: goal.trim(),
      industry: null,
      team_size: null,
      challenge: null,
      wants_call: false
    }
    
    // Add new fields if they exist
    if (email) insertData.email = email
    if (phone) insertData.phone = phone
    if (companyWebsite) insertData.company_website = companyWebsite
    if (automationRequirements) insertData.automation_requirements = automationRequirements

    const { data, error } = await supabase.from("consultation_requests").insert(insertData).select()
    if (error) {
      console.error("Database insert error (old format):", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json({ 
        error: error.message || "Failed to insert consultation request",
        details: error.details 
      }, { status: 500 })
    }
    if (!data) {
      console.error("No data returned from insert (old format), but no error")
      return NextResponse.json({ error: "Failed to insert consultation request" }, { status: 500 })
    }
    
    // Send email notification (don't fail if email fails)
    try {
      await sendConsultationSubmissionEmail({
        name: name.trim(),
        email: email || undefined,
        phone: phone || undefined,
        company: company || undefined,
        goal: goal.trim(),
        industry: undefined,
        teamSize: undefined,
        challenge: undefined,
        wantsCall: false,
        companyWebsite: companyWebsite || undefined,
        automationRequirements: automationRequirements || undefined
      })
      console.log("Email notification sent successfully (old format)")
    } catch (emailError) {
      console.error("Failed to send email notification (non-critical):", emailError)
    }
    
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error("Unexpected error in consultation route:", {
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


