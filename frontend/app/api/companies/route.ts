import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Hardcoded Supabase credentials
    const supabaseUrl = "https://wyqhofuwxzyyjnffavgq.supabase.co"
    const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5cWhvZnV3eHp5eWpuZmZhdmdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDQ4MzU4MywiZXhwIjoyMDgwMDU5NTgzfQ.oF5oekaf0y9E8MUsg1aLeTF_aik-aAeMMF8ScY8A-h0"
    const supabase = createClient(supabaseUrl, serviceKey)

    // Pull distinct non-empty company names from profiles
    const { data, error } = await supabase
      .from("profiles")
      .select("company")
      .not("company", "is", null)
      .neq("company", "")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const companies = Array.from(
      new Set((data || []).map((r: any) => String(r.company).trim()).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b))

    return NextResponse.json({ companies })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}


