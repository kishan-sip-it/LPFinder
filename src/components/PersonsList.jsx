"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "missing", label: "Missing" },
  { key: "investigating", label: "Investigating" },
  { key: "found", label: "Found" },
];

export default function PersonsList({
  title = "Reports",
  description = "All missing person cases you have reported.",
}) {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "all") params.set("status", filter);
    if (debouncedQ) params.set("q", debouncedQ);
    const res = await fetch(`/api/persons?${params.toString()}`);
    const data = await res.json();
    setPersons(data.persons || []);
    setLoading(false);
  }, [filter, debouncedQ]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-slate-500">{description}</p>
        </div>
        <Link
          href="/dashboard/persons/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700"
        >
          ➕ New Report
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === f.key
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or location…"
            className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-72"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      ) : persons.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-3xl">
            {debouncedQ || filter !== "all" ? "🔍" : "🗂️"}
          </div>
          <h3 className="font-semibold text-slate-800">
            {debouncedQ || filter !== "all"
              ? "No matching reports"
              : "No reports yet"}
          </h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            {debouncedQ || filter !== "all"
              ? "Try adjusting your search or filters."
              : "Create a report to start tracking a missing loved one."}
          </p>
          {!debouncedQ && filter === "all" && (
            <Link
              href="/dashboard/persons/new"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
            >
              ➕ Create report
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {persons.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/persons/${p.id}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {p.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photoUrl}
                    alt={p.fullName}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-5xl text-slate-300">
                    👤
                  </div>
                )}
                <div className="absolute left-3 top-3">
                  <StatusBadge status={p.status} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="truncate font-semibold text-slate-800">
                  {p.fullName}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {p.age ? `${p.age} yrs` : "Age N/A"}
                  {p.gender ? ` · ${p.gender}` : ""}
                </p>
                <p className="mt-2 flex items-center gap-1.5 truncate text-sm text-slate-500">
                  📍 {p.lastSeenLocation || "Location unknown"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
