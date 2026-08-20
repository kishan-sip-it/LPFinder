"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PersonForm from "./PersonForm";

export default function PersonEdit({ personId }) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch(`/api/persons/${personId}`);
      if (!active) return;

      if (res.status === 403) {
        setForbidden(true);
        setLoading(false);
        return;
      }

      if (res.status === 404) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const p = data.person;

      if (!p) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const norm = {};
      Object.keys(p).forEach((k) => {
        norm[k] = p[k] == null ? "" : p[k];
      });
      setPerson(norm);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [personId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
        <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <div className="text-5xl">🔒</div>
        <h2 className="mt-4 text-xl font-bold">Access denied</h2>
        <p className="mt-1 text-slate-500">
          You can only edit your own reports.
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

  if (notFound || !person) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <div className="text-5xl">🔎</div>
        <h2 className="mt-4 text-xl font-bold">Report not found</h2>
        <Link
          href="/dashboard/persons"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white"
        >
          Back to reports
        </Link>
      </div>
    );
  }

  return <PersonForm initial={person} personId={personId} />;
}
