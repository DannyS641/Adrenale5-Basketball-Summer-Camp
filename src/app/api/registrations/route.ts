import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import emailjs from "@emailjs/nodejs";

export const runtime = "nodejs";

const TABLE_NAME = "camp_registrations";
const CAMP_PRICE = "$15,000";
const CAMP_DATES = "July 10-29, 2026";
const CAMP_LOCATION = "Los Angeles, California";
const CAMP_HOURS = "8:30am - 6:00pm daily";
const CONTACT_EMAIL = "oyemwenseoronsaye@gmail.com";
const CONTACT_PHONE = "+2348033762623";

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

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error.";
}

function getRegistrationErrorMessage(error: unknown) {
  const message = getErrorMessage(error);

  if (message.toLowerCase().includes("fetch failed")) {
    return "Could not reach the registration database. Check your Supabase connection and Vercel environment variables.";
  }

  return message;
}

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

    let data: { id?: string } | null = null;

    try {
      const response = await supabase
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

      if (response.error) {
        return NextResponse.json({ error: response.error.message }, { status: 500 });
      }

      data = response.data;
    } catch (error) {
      return NextResponse.json(
        { error: getRegistrationErrorMessage(error) },
        { status: 500 },
      );
    }

    let emailSent = false;
    const registrationId = data?.id ?? "";

    const emailProvider = (process.env.EMAIL_PROVIDER ?? "auto").toLowerCase();
    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM_EMAIL;
    const emailJsConfig = {
      serviceId: process.env.EMAILJS_SERVICE_ID,
      templateId: process.env.EMAILJS_TEMPLATE_ID,
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    };

    const canUseResend = Boolean(resendKey && resendFrom);
    const canUseEmailJs = Boolean(
      emailJsConfig.serviceId &&
        emailJsConfig.templateId &&
        emailJsConfig.publicKey &&
        emailJsConfig.privateKey,
    );

    if (
      (emailProvider === "auto" || emailProvider === "resend") &&
      canUseResend &&
      resendKey &&
      resendFrom
    ) {
      try {
        const resend = new Resend(resendKey);
        
        // Send confirmation email to registrant
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

        // Send notification email to contact person
        await resend.emails.send({
          from: resendFrom,
          to: CONTACT_EMAIL,
          subject: `New registration: ${fullName} - Adrenale 5 Basketball Summer Camp`,
          text: [
            `New registration received!`,
            "",
            `Registration ID: ${registrationId}`,
            `Player: ${fullName}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Age: ${age}`,
            `Grade: ${gradeLevel}`,
            `Experience: ${experience}`,
            guardianName ? `Guardian: ${guardianName}` : "",
            emergencyContactName ? `Emergency Contact: ${emergencyContactName}` : "",
            notes ? `Notes: ${notes}` : "",
          ].join("\n"),
          html: `
            <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
              <p><strong>New registration received!</strong></p>
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr>
                  <td style="padding: 8px; background: #f4f0e8; font-weight: bold;">Registration ID:</td>
                  <td style="padding: 8px; background: #f4f0e8;">${registrationId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Player Name:</td>
                  <td style="padding: 8px;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; background: #f4f0e8; font-weight: bold;">Email:</td>
                  <td style="padding: 8px; background: #f4f0e8;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; background: #f4f0e8; font-weight: bold;">Age:</td>
                  <td style="padding: 8px; background: #f4f0e8;">${age}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Grade Level:</td>
                  <td style="padding: 8px;">${gradeLevel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; background: #f4f0e8; font-weight: bold;">Experience:</td>
                  <td style="padding: 8px; background: #f4f0e8;">${experience}</td>
                </tr>
                ${guardianName ? `<tr><td style="padding: 8px; font-weight: bold;">Guardian:</td><td style="padding: 8px;">${guardianName}</td></tr>` : ""}
                ${emergencyContactName ? `<tr><td style="padding: 8px; background: #f4f0e8; font-weight: bold;">Emergency Contact:</td><td style="padding: 8px; background: #f4f0e8;">${emergencyContactName}</td></tr>` : ""}
              </table>
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
            </div>
          `,
        });
        
        emailSent = true;
      } catch {
        emailSent = false;
      }
    } else if (
      (emailProvider === "auto" || emailProvider === "emailjs") &&
      canUseEmailJs
    ) {
      try {
        // Send confirmation to registrant
        await emailjs.send(
          emailJsConfig.serviceId!,
          emailJsConfig.templateId!,
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
            publicKey: emailJsConfig.publicKey!,
            privateKey: emailJsConfig.privateKey!,
          },
        );
        
        // Send notification to contact person
        await emailjs.send(
          emailJsConfig.serviceId!,
          emailJsConfig.templateId!,
          {
            to_name: "Camp Admin",
            to_email: CONTACT_EMAIL,
            player_name: fullName,
            player_email: email,
            player_phone: phone,
            player_age: age,
            player_grade: gradeLevel,
            player_experience: experience,
            guardian_name: guardianName || "Not provided",
            emergency_contact: emergencyContactName || "Not provided",
            player_notes: notes || "None",
            registration_id: registrationId,
            message: `New registration: ${fullName}`,
            contact_email: CONTACT_EMAIL,
            contact_phone: CONTACT_PHONE,
          },
          {
            publicKey: emailJsConfig.publicKey!,
            privateKey: emailJsConfig.privateKey!,
          },
        );
        
        emailSent = true;
      } catch {
        emailSent = false;
      }
    }

    return NextResponse.json({ ok: true, id: data?.id, emailSent });
  } catch (error) {
    return NextResponse.json(
      { error: getRegistrationErrorMessage(error) },
      { status: 500 },
    );
  }
}
