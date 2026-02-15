import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const TABLE_NAME = "camp_registrations";

export async function POST(request: Request) {
  try {
    if (!paystackSecretKey) {
      return NextResponse.json(
        { error: "Paystack secret key is missing." },
        { status: 500 },
      );
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase environment variables are missing." },
        { status: 500 },
      );
    }

    const { reference, registrationId } = (await request.json()) as {
      reference?: string;
      registrationId?: string;
    };

    if (!reference || !registrationId) {
      return NextResponse.json(
        { error: "Payment reference and registration id are required." },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
        },
      },
    );

    const data = (await response.json()) as {
      status?: boolean;
      message?: string;
      data?: {
        status?: string;
        reference?: string;
        amount?: number;
        currency?: string;
      };
    };

    if (!response.ok || !data.status || data.data?.status !== "success") {
      return NextResponse.json(
        {
          error: data?.message ?? "Payment verification failed.",
          status: data?.data?.status ?? "failed",
        },
        { status: 400 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const { error } = await supabase
      .from(TABLE_NAME)
      .update({
        payment_reference: data.data?.reference ?? reference,
        payment_status: "paid",
        payment_amount: data.data?.amount ?? null,
        payment_currency: data.data?.currency ?? null,
        payment_verified_at: new Date().toISOString(),
      })
      .eq("id", registrationId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: "success", reference: data.data?.reference });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to verify payment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
