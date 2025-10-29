import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Server misconfiguration: missing Supabase env vars" }, { status: 500 })
    }
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


