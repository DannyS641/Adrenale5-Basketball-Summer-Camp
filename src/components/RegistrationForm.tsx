"use client";

import type { ChangeEvent, FormEvent } from "react";
import Script from "next/script";
import { useState } from "react";

const CAMP_PRICE_CENTS = 80000000;
const CAMP_CURRENCY = "NGN";

type PaystackResponse = {
  reference: string;
};

type PaystackSetup = (config: {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  metadata?: Record<string, string>;
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
}) => { openIframe: () => void };

declare global {
  interface Window {
    PaystackPop?: { setup: PaystackSetup };
  }
}

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  experience: "Intermediate",
  guardianName: "",
  notes: "",
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      if (typeof window === "undefined") {
        return;
      }

      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Something went wrong. Try again.");
      }

      const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

      if (!paystackKey) {
        throw new Error("Paystack public key is missing.");
      }

      if (!window.PaystackPop?.setup) {
        throw new Error("Payment library did not load. Try again.");
      }

      const reference = `camp_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: formData.email,
        amount: CAMP_PRICE_CENTS,
        currency: CAMP_CURRENCY,
        ref: reference,
        metadata: {
          registrationId: data?.id ?? "",
          fullName: formData.fullName,
          phone: formData.phone,
          experience: formData.experience,
        },
        callback: (paystackResponse) => {
          void (async () => {
            try {
              const verifyResponse = await fetch("/api/paystack/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  reference: paystackResponse.reference,
                  registrationId: data?.id ?? "",
                }),
              });

              const verifyData = await verifyResponse.json();

              if (!verifyResponse.ok || verifyData?.status !== "success") {
                throw new Error(
                  verifyData?.error ?? "Payment could not be verified.",
                );
              }

              setStatus("success");
              setMessage("Payment successful! We'll follow up within 24 hours.");
              setFormData(initialState);
            } catch (error) {
              const messageText =
                error instanceof Error
                  ? error.message
                  : "Payment verification failed.";
              setStatus("error");
              setMessage(messageText);
            }
          })();
        },
        onClose: () => {
          setStatus("idle");
          setMessage("Payment was canceled.");
        },
      });

      handler.openIframe();
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : "Unable to submit right now.";
      setStatus("error");
      setMessage(messageText);
    }
  };

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
      >
        <div>
          <label className="text-sm font-semibold text-stone" htmlFor="fullName">
            Player full name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-sand px-4 py-3 text-ink placeholder:text-stone/60 focus:border-ember focus:outline-none"
            placeholder="Jordan Matthews"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-stone" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-stone/20 bg-sand px-4 py-3 text-ink placeholder:text-stone/60 focus:border-ember focus:outline-none"
              placeholder="player@email.com"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-stone" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-stone/20 bg-sand px-4 py-3 text-ink placeholder:text-stone/60 focus:border-ember focus:outline-none"
              placeholder="(555) 111-2244"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-stone" htmlFor="age">
              Player age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min={8}
              max={18}
              value={formData.age}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-stone/20 bg-sand px-4 py-3 text-ink placeholder:text-stone/60 focus:border-ember focus:outline-none"
              placeholder="12"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-stone" htmlFor="experience">
              Experience level
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-stone/20 bg-sand px-4 py-3 text-ink focus:border-ember focus:outline-none"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-stone" htmlFor="guardianName">
            Guardian / Emergency contact
          </label>
          <input
            id="guardianName"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-sand px-4 py-3 text-ink placeholder:text-stone/60 focus:border-ember focus:outline-none"
            placeholder="Avery Matthews"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-stone" htmlFor="notes">
            Special notes or goals
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-sand px-4 py-3 text-ink placeholder:text-stone/60 focus:border-ember focus:outline-none"
            placeholder="Tell us what you want to improve this summer."
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-forest px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#0b2622] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Opening Paystack..." : "Pay & Register"}
        </button>
        <p className="text-xs text-stone">Secure payment handled by Paystack.</p>
        {message ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-forest" : "text-ember"
            }`}
          >
            {message}
          </p>
        ) : null}
      </form>
    </>
  );
}
