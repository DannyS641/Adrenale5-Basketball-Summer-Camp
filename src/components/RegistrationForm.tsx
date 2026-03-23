"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gradeLevel: "",
  experience: "Intermediate",
  guardianName: "",
  emergencyContactName: "",
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

      setStatus("success");
      if (data?.emailSent) {
        setMessage(
          "Registration received! Check your email for confirmation and pricing.",
        );
      } else {
        setMessage(
          "Registration received! We'll follow up shortly with next steps.",
        );
      }
      setFormData(initialState);
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : "Unable to submit right now.";
      setStatus("error");
      setMessage(messageText);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5 overflow-hidden rounded-[28px] border border-white/40 bg-gradient-to-br from-white/95 via-white/90 to-sand/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
    >
      <div>
        <label
          className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
          htmlFor="fullName"
        >
          Player full name
        </label>
        <input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink placeholder:text-stone/50 shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
          placeholder="Jordan Matthews"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink placeholder:text-stone/50 shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
            placeholder="player@email.com"
          />
        </div>
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink placeholder:text-stone/50 shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
            placeholder="(555) 111-2244"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
            htmlFor="age"
          >
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
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink placeholder:text-stone/50 shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
            placeholder="12"
          />
        </div>
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
            htmlFor="gradeLevel"
          >
            Grade level
          </label>
          <input
            id="gradeLevel"
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink placeholder:text-stone/50 shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
            placeholder="10th Grade"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
            htmlFor="experience"
          >
            Experience level
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
            htmlFor="guardianName"
          >
            Guardian name
          </label>
          <input
            id="guardianName"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink placeholder:text-stone/50 shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
            placeholder="Avery Matthews"
          />
        </div>
      </div>
      <div>
        <label
          className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
          htmlFor="emergencyContactName"
        >
          Emergency contact
        </label>
        <input
          id="emergencyContactName"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink placeholder:text-stone/50 shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
          placeholder="Name + phone"
        />
      </div>
      <div>
        <label
          className="text-xs font-semibold uppercase tracking-[0.3em] text-stone"
          htmlFor="notes"
        >
          Special notes or goals
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="mt-2 w-full rounded-2xl border border-stone/20 bg-white/80 px-4 py-3 text-ink placeholder:text-stone/50 shadow-sm transition focus:border-citrus focus:outline-none focus:ring-2 focus:ring-citrus/30"
          placeholder="Tell us what you want to improve this summer."
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-forest px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#143d36] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Submitting..." : "Submit Registration"}
      </button>
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
  );
}
