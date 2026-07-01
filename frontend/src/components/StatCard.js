import React from "react";

export default function StatCard({ label, value, suffix, accent = "ink" }) {
  const accentClass = {
    ink: "text-ink",
    redline: "text-redline",
    success: "text-success",
    amber: "text-amber",
  }[accent];

  return (
    <div className="bg-white border border-line rounded-xl p-5 flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-mute font-display">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`readout text-3xl ${accentClass}`}>{value}</span>
        {suffix && <span className="text-sm text-mute">{suffix}</span>}
      </div>
    </div>
  );
}
