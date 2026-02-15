import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TABLE_NAME = "camp_registrations";

type RegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  experience: string;
  guardianName?: string;
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistrationPayload;
    const { fullName, email, phone, age, experience, guardianName, notes } = body;

    if (!fullName || !email || !phone || !experience) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(age)) {
      return NextResponse.json({ error: "Age must be a number." }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase environment variables are missing." },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          age,
          experience,
          guardian_name: guardianName || null,
          notes: notes || null,
          payment_status: "pending",
        },
      ])
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit registration.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
