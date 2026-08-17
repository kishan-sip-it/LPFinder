"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CameraCapture from "./CameraCapture";

const EMPTY = {
  fullName: "",
  age: "",
  gender: "",
  height: "",
  complexion: "",
  identifyingMarks: "",
  photoUrl: "",
  lastSeenLocation: "",
  lastSeenDate: "",
  clothingDescription: "",
  status: "missing",
  description: "",
  reporterName: "",
  reporterRelation: "",
  contactPhone: "",
  contactEmail: "",
};

export default function PersonForm({ initial = null, personId = null }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...EMPTY, ...(initial || {}) });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isEdit = Boolean(personId);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(
        isEdit ? `/api/persons/${personId}` : "/api/persons",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      router.push(`/dashboard/persons/${data.person.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEdit ? "Edit report" : "New report"}
          </h1>
          <p className="mt-1 text-slate-500">
            Provide as much detail as possible to help identify the person.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Photo */}
        <Section title="Photo" subtitle="Camera or upload">
          <CameraCapture
            value={form.photoUrl}
            onChange={(v) => setForm((f) => ({ ...f, photoUrl: v }))}
          />
        </Section>

        <div className="space-y-6">
          {/* Identity */}
          <Section title="Identity" subtitle="Who is missing">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name *" value={form.fullName} onChange={set("fullName")} />
              <Input label="Age" type="number" value={form.age} onChange={set("age")} />
              <Select
                label="Gender"
                value={form.gender}
                onChange={set("gender")}
                options={["", "Male", "Female", "Other"]}
              />
              <Input label="Height" value={form.height} onChange={set("height")} placeholder="e.g. 5'6&quot;" />
              <Input label="Complexion" value={form.complexion} onChange={set("complexion")} />
              <Select
                label="Case status"
                value={form.status}
                onChange={set("status")}
                options={["missing", "investigating", "found"]}
                labels={{ missing: "Missing", investigating: "Investigating", found: "Found" }}
              />
            </div>
            <Textarea
              label="Identifying marks"
              value={form.identifyingMarks}
              onChange={set("identifyingMarks")}
              placeholder="Scars, tattoos, birthmarks…"
            />
          </Section>

          {/* Last seen */}
          <Section title="Last seen" subtitle="When & where">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Location"
                value={form.lastSeenLocation}
                onChange={set("lastSeenLocation")}
                placeholder="Area, city"
              />
              <Input
                label="Date"
                type="date"
                value={form.lastSeenDate}
                onChange={set("lastSeenDate")}
              />
            </div>
            <Textarea
              label="Clothing description"
              value={form.clothingDescription}
              onChange={set("clothingDescription")}
            />
            <Textarea
              label="Additional details"
              value={form.description}
              onChange={set("description")}
              placeholder="Circumstances, medical conditions, anything helpful…"
            />
          </Section>

          {/* Informer */}
          <Section title="Informer" subtitle="Contact details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Your name" value={form.reporterName} onChange={set("reporterName")} />
              <Input
                label="Relation"
                value={form.reporterRelation}
                onChange={set("reporterRelation")}
                placeholder="e.g. Mother"
              />
              <Input label="Phone" value={form.contactPhone} onChange={set("contactPhone")} />
              <Input label="Email" type="email" value={form.contactEmail} onChange={set("contactEmail")} />
            </div>
          </Section>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {busy ? "Saving…" : isEdit ? "Save changes" : "Create report"}
        </button>
      </div>
    </form>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <textarea
        rows={3}
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
    </label>
  );
}

function Select({ label, options, labels = {}, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <select
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "" ? "Select…" : labels[o] || o}
          </option>
        ))}
      </select>
    </label>
  );
}
