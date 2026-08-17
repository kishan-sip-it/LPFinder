"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import StatusBadge from "./StatusBadge";

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [s, p] = await Promise.all([
          fetch("/api/stats").then((r) => r.json()),
          fetch("/api/persons").then((r) => r.json()),
        ]);
        if (!active) return;
        setStats(s.stats);
        setRecent((p.persons || []).slice(0, 5));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const cards = [
    { key: "total", label: "Total Reports", icon: "🗂️", color: "indigo" },
    { key: "missing", label: "Missing", icon: "🔴", color: "rose" },
    { key: "investigating", label: "Investigating", icon: "🟡", color: "amber" },
    { key: "found", label: "Found", icon: "🟢", color: "emerald" },
  ];

  const colorCls = {
    indigo: "from-indigo-500 to-violet-500",
    rose: "from-rose-500 to-pink-500",
    amber: "from-amber-500 to-orange-500",
    emerald: "from-emerald-500 to-teal-500",
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-slate-500">
            Here is an overview of your reported cases.
          </p>
        </div>
        <Link
          href="/dashboard/persons/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700"
        >
          ➕ New Report
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.key}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${colorCls[c.color]} text-lg`}
            >
              {c.icon}
            </div>
            {loading ? (
              <div className="h-8 w-12 animate-pulse rounded bg-slate-100" />
            ) : (
              <p className="text-3xl font-bold">{stats?.[c.key] ?? 0}</p>
            )}
            <p className="mt-1 text-sm text-slate-500">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold">Recent reports</h2>
          <Link
            href="/dashboard/persons"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/dashboard/persons/${p.id}`}
                  className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50"
                >
                  <Avatar person={p} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-800">
                      {p.fullName}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {p.lastSeenLocation || "Location unknown"}
                    </p>
                  </div>
                  <StatusBadge status={p.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Avatar({ person }) {
  if (person.photoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={person.photoUrl}
        alt={person.fullName}
        className="h-12 w-12 rounded-xl object-cover"
      />
    );
  }
  return (
    <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 font-semibold text-slate-500">
      {person.fullName?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-3xl">
        🗂️
      </div>
      <h3 className="font-semibold text-slate-800">No reports yet</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Start by creating a report for a missing loved one with their photo and
        details.
      </p>
      <Link
        href="/dashboard/persons/new"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
      >
        ➕ Create your first report
      </Link>
    </div>
  );
}
