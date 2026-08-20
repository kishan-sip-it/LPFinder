"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";

const STATUSES = [
  { key: "missing", label: "Missing" },
  { key: "investigating", label: "Investigating" },
  { key: "found", label: "Found" },
];

export default function PersonDetail({ personId }) {
  const router = useRouter();
  const { user } = useAuth();
  const canManage = user?.role === "admin" || user?.role === "reporter";
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch(`/api/persons/${personId}`);
      if (!active) return;
      if (res.status === 404) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPerson(data.person);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [personId]);

  const updateStatus = async (status) => {
    if (!person || status === person.status) return;
    const prev = person.status;
    // optimistic update
    setPerson((p) => ({ ...p, status }));
    setSavingStatus(true);
    try {
      const res = await fetch(`/api/persons/${personId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setPerson((p) => ({ ...p, status: prev })); // rollback
    } finally {
      setSavingStatus(false);
    }
  };

  const remove = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/persons/${personId}`, { method: "DELETE" });
      router.push("/dashboard/persons");
      router.refresh();
    } catch {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="aspect-square animate-pulse rounded-2xl bg-slate-200" />
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 animate-pulse rounded bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !person) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <div className="text-5xl">🔎</div>
        <h2 className="mt-4 text-xl font-bold">Report not found</h2>
        <p className="mt-1 text-slate-500">
          It may have been removed or does not belong to your account.
        </p>
        <Link
          href="/dashboard/persons"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white"
        >
          Back to reports
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/dashboard/persons"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        ← Back to reports
      </Link>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <div className="aspect-square w-full">
              {person.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={person.photoUrl}
                  alt={person.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-6xl text-slate-300">
                  👤
                </div>
              )}
            </div>
          </div>

          {user?.role === "admin" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Update status
              </p>

              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s.key}
                    disabled={savingStatus}
                    onClick={() => updateStatus(s.key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
                      person.status === s.key
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {canManage && (
            <div className="flex gap-2">
              <Link
                href={`/dashboard/persons/${person.id}/edit`}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                ✏️ Edit
              </Link>

              <button
                onClick={() => setConfirming(true)}
                className="flex-1 rounded-xl border border-rose-200 px-4 py-2.5 font-semibold text-rose-600 transition hover:bg-rose-50"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                {person.fullName}
              </h1>
              <StatusBadge status={person.status} />
            </div>
            <p className="mt-1 text-slate-500">
              {person.age ? `${person.age} years old` : "Age unknown"}
              {person.gender ? ` · ${person.gender}` : ""}
            </p>
          </div>

          <InfoCard title="Identity">
            <Row label="Height" value={person.height} />
            <Row label="Complexion" value={person.complexion} />
            <Row label="Identifying marks" value={person.identifyingMarks} />
          </InfoCard>

          <InfoCard title="Last seen">
            <Row label="Location" value={person.lastSeenLocation} />
            <Row label="Date" value={person.lastSeenDate} />
            <Row label="Clothing" value={person.clothingDescription} />
            <Row label="Details" value={person.description} />
          </InfoCard>

          <InfoCard title="Informer & contact">
            <Row label="Reported by" value={person.reporterName} />
            <Row label="Relation" value={person.reporterRelation} />
            <Row label="Phone" value={person.contactPhone} />
            <Row label="Email" value={person.contactEmail} />
          </InfoCard>
        </div>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold">Delete this report?</h3>
            <p className="mt-1 text-sm text-slate-500">
              This will permanently remove {person.fullName}&apos;s record. This
              cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={remove}
                disabled={deleting}
                className="rounded-xl bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 font-semibold text-slate-800">{title}</h2>
      <dl className="space-y-2.5">{children}</dl>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-3 text-sm">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-slate-800">
        {value ? value : <span className="text-slate-300">—</span>}
      </dd>
    </div>
  );
}
