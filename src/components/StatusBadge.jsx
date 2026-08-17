const MAP = {
  missing: { label: "Missing", cls: "bg-rose-50 text-rose-700 ring-rose-200" },
  investigating: {
    label: "Investigating",
    cls: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  found: { label: "Found", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
};

export default function StatusBadge({ status }) {
  const s = MAP[status] || MAP.missing;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${s.cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}
