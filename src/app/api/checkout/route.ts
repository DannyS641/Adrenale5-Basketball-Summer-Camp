import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePriceId = process.env.STRIPE_PRICE_ID;

export async function POST(request: Request) {
  try {
    if (!stripeSecretKey || !stripePriceId) {
      return NextResponse.json(
        { error: "Stripe environment variables are missing." },
        { status: 500 },
      );
    }

    const { registrationId, email, fullName } = (await request.json()) as {
      registrationId?: string;
      email?: string;
      fullName?: string;
    };

    const origin =
      request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;

    if (!origin) {
      return NextResponse.json(
        { error: "Missing site URL for checkout redirect." },
        { status: 500 },
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=cancel`,
      customer_email: email,
      metadata: {
        registrationId: registrationId ?? "",
        fullName: fullName ?? "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
