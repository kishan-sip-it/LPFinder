"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "missing", label: "Missing" },
  { key: "investigating", label: "Investigating" },
  { key: "found", label: "Found" },
];

export default function PublicPersonsList() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    setLoading(true);

    const params = new URLSearchParams();

    if (filter !== "all") {
      params.set("status", filter);
    }

    if (q.trim()) {
      params.set("q", q.trim());
    }

    try {
      const res = await fetch(
        `/api/public/persons?${params.toString()}`,
        { cache: "no-store" }
      );

      const data = await res.json();
      setPersons(data.persons || []);
    } catch {
      setPersons([]);
    } finally {
      setLoading(false);
    }
  }, [filter, q]);

  useEffect(() => {
    const timer = setTimeout(load, 250);
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <main className="dashboard-theme min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-semibold text-violet-300 hover:text-white"
            >
              ← ReuniteFind
            </Link>

            <h1 className="mt-3 text-3xl font-black text-white">
              Browse reports
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              View listed missing-person cases. This page is read-only.
              Editing is available only from a user's own submitted reports.
            </p>
          </div>

          <Link
            href="/login?intent=reporter"
            className="rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg"
          >
            Report someone
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === item.key
                    ? "bg-indigo-600 text-white"
                    : "border border-violet-300/20 bg-white/5 text-slate-300 hover:bg-violet-500/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or location..."
            className="w-full rounded-xl border border-violet-300/20 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-400 lg:w-80"
          />
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-violet-300/10 bg-white/5"
              />
            ))}
          </div>
        ) : persons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-violet-300/20 bg-white/5 p-16 text-center">
            <div className="text-4xl">🔎</div>

            <h2 className="mt-4 text-xl font-bold text-white">
              No matching reports
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Try a different name, location, or status.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {persons.map((person) => (
              <Link
                key={person.id}
                href={`/browse/${person.id}`}
                className="group overflow-hidden rounded-2xl border border-violet-300/15 bg-white/[0.04] transition hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                  {person.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.photoUrl}
                      alt={person.fullName}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-6xl text-slate-700">
                      👤
                    </div>
                  )}

                  <div className="absolute left-3 top-3">
                    <StatusBadge status={person.status} />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="truncate font-bold text-white">
                    {person.fullName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {person.age ? `${person.age} yrs` : "Age N/A"}
                    {person.gender ? ` · ${person.gender}` : ""}
                  </p>

                  <p className="mt-3 truncate text-sm text-slate-400">
                    📍 {person.lastSeenLocation || "Location unknown"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}