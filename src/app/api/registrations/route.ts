import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import emailjs from "@emailjs/nodejs";

const TABLE_NAME = "camp_registrations";
const CAMP_PRICE = "$15,000";
const CAMP_DATES = "July 20-26, 2026";
const CAMP_LOCATION = "Los Angeles, California";
const CAMP_HOURS = "8:30am - 6:00pm daily";
const CONTACT_EMAIL = "ballarkafrica@gmail.com";
const CONTACT_PHONE = "09067831477";
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER ?? "resend";

type RegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gradeLevel: string;
  experience: string;
  guardianName?: string;
  emergencyContactName?: string;
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistrationPayload;
    const {
      fullName,
      email,
      phone,
      age,
      gradeLevel,
      experience,
      guardianName,
      emergencyContactName,
      notes,
    } = body;

    if (!fullName || !email || !phone || !gradeLevel || !experience) {
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
          grade_level: gradeLevel,
          experience,
          guardian_name: guardianName || null,
          emergency_contact_name: emergencyContactName || null,
          notes: notes || null,
          payment_status: "not_required",
        },
      ])
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let emailSent = false;
    const registrationId = data?.id ?? "";

    if (EMAIL_PROVIDER === "emailjs") {
      const serviceId = process.env.EMAILJS_SERVICE_ID;
      const templateId = process.env.EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.EMAILJS_PUBLIC_KEY;
      const privateKey = process.env.EMAILJS_PRIVATE_KEY;

      if (serviceId && templateId && publicKey && privateKey) {
        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              to_name: fullName,
              to_email: email,
              camp_price: CAMP_PRICE,
              camp_dates: CAMP_DATES,
              camp_location: CAMP_LOCATION,
              camp_hours: CAMP_HOURS,
              registration_id: registrationId,
              message:
                "Thanks for registering for Adrenale 5 Basketball Summer Camp. Our team will follow up shortly with next steps.",
              contact_email: CONTACT_EMAIL,
              contact_phone: CONTACT_PHONE,
            },
            {
              publicKey,
              privateKey,
            },
          );
          emailSent = true;
        } catch (error) {
          emailSent = false;
        }
      }
    } else if (EMAIL_PROVIDER === "resend") {
      const resendKey = process.env.RESEND_API_KEY;
      const resendFrom = process.env.RESEND_FROM_EMAIL;

      if (!resendKey || !resendFrom) {
        return NextResponse.json(
          { error: "Resend environment variables are missing." },
          { status: 500 },
        );
      }

      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: resendFrom,
          to: email,
          subject: "Registration received - Adrenale 5 Basketball Summer Camp",
          text: [
            `Hi ${fullName},`,
            "",
            "Thanks for registering for Adrenale 5 Basketball Summer Camp.",
            "Your registration has been received and our team will review it within 24 hours.",
            "",
            `Camp price: ${CAMP_PRICE} (USD). Payment is handled offline after review.`,
            "",
            "Camp details:",
            `- Dates: ${CAMP_DATES}`,
            `- Location: ${CAMP_LOCATION}`,
            `- Hours: ${CAMP_HOURS}`,
            registrationId ? `- Registration ID: ${registrationId}` : "",
            "",
            "If any details are incorrect, reply to this email and we'll update your record.",
            `Questions? Contact us at ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
          ].join("\n"),
          html: `
            <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
              <p>Hi ${fullName},</p>
              <p>Thanks for registering for Adrenale 5 Basketball Summer Camp.</p>
              <p>Your registration has been received and our team will review it within 24 hours.</p>
              <p><strong>Camp price:</strong> ${CAMP_PRICE} (USD). Payment is handled offline after review.</p>
              <div style="margin: 16px 0; padding: 12px 16px; background: #f4f0e8; border-radius: 12px;">
                <p style="margin: 0 0 8px;"><strong>Camp details</strong></p>
                <ul style="margin: 0; padding-left: 18px;">
                  <li>Dates: ${CAMP_DATES}</li>
                  <li>Location: ${CAMP_LOCATION}</li>
                  <li>Hours: ${CAMP_HOURS}</li>
                  ${registrationId ? `<li>Registration ID: ${registrationId}</li>` : ""}
                </ul>
              </div>
              <p>If any details are incorrect, reply to this email and we'll update your record.</p>
              <p>Questions? Contact us at ${CONTACT_EMAIL} or ${CONTACT_PHONE}.</p>
            </div>
          `,
        });
        emailSent = true;
      } catch (error) {
        emailSent = false;
      }
    }

    return NextResponse.json({ ok: true, id: data?.id, emailSent });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit registration.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
