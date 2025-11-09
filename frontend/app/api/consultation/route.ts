import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Server misconfiguration: missing Supabase env vars" }, { status: 500 })
    }
    const supabase = createClient(supabaseUrl, serviceKey)

    const body = await req.json()
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
      
      const { error } = await supabase.from("consultation_requests").insert(insertData)
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ ok: true })
    }
    
    // Old format (backward compatibility)
    if (!name || !contact || !goal) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const insertData: any = { 
      name, 
      contact, 
      company: company || null, 
      goal,
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

    const { error } = await supabase.from("consultation_requests").insert(insertData)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}


