"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";

export default function PublicPersonDetail({ id }) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/public/persons/${id}`, { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load report.");
        }

        return data;
      })
      .then((data) => setPerson(data.person))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="dashboard-theme min-h-screen px-6 py-10">
        <div className="mx-auto max-w-4xl animate-pulse rounded-3xl border border-violet-300/15 bg-white/5 p-10">
          <div className="h-8 w-1/3 rounded bg-white/10" />
          <div className="mt-6 h-72 rounded-2xl bg-white/10" />
        </div>
      </main>
    );
  }

  if (error || !person) {
    return (
      <main className="dashboard-theme min-h-screen grid place-items-center px-6">
        <div className="text-center">
          <p className="text-5xl">🔎</p>
          <h1 className="mt-4 text-2xl font-bold text-white">
            Report not found
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {error || "This report is unavailable."}
          </p>
          <Link
            href="/browse"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white"
          >
            Back to reports
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-theme min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/browse"
          className="text-sm font-semibold text-violet-300 hover:text-white"
        >
          ← Back to reports
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl border border-violet-300/15 bg-white/[0.04]">
          <div className="relative h-80 bg-black/30">
            {person.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={person.photoUrl}
                alt={person.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center text-7xl text-slate-700">
                👤
              </div>
            )}

            <div className="absolute left-5 top-5">
              <StatusBadge status={person.status} />
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <h1 className="text-3xl font-black text-white">
              {person.fullName}
            </h1>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Info label="Age" value={person.age ? `${person.age}` : "Not provided"} />
              <Info label="Gender" value={person.gender || "Not provided"} />
              <Info label="Height" value={person.height || "Not provided"} />
              <Info label="Complexion" value={person.complexion || "Not provided"} />
              <Info label="Last seen" value={person.lastSeenLocation || "Not provided"} />
              <Info label="Last seen date" value={person.lastSeenDate || "Not provided"} />
            </div>

            {person.clothingDescription && (
              <Section title="Clothing description">
                {person.clothingDescription}
              </Section>
            )}

            {person.identifyingMarks && (
              <Section title="Identifying marks">
                {person.identifyingMarks}
              </Section>
            )}

            {person.description && (
              <Section title="Description">
                {person.description}
              </Section>
            )}

            <div className="mt-8 rounded-2xl border border-violet-300/15 bg-black/20 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">
                Important
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                This public page is read-only. Report editing is restricted to
                the account that submitted the report.
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-200">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-7">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-violet-300">
        {title}
      </h2>
      <p className="mt-2 leading-7 text-slate-300">{children}</p>
    </section>
  );
}