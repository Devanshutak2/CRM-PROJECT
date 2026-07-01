import React from "react";

export default function Funnel({ stages }) {
  const max = stages[0]?.count || 1;
  return (
    <div className="flex flex-col gap-2.5">
      {stages.map((s, i) => {
        const widthPct = Math.max((s.count / max) * 100, 8);
        return (
          <div key={s.label} className="flex items-center gap-3">
            <span className="text-xs text-mute w-24 font-display uppercase tracking-wide shrink-0">
              {s.label}
            </span>
            <div className="flex-1 h-7 bg-paper rounded-md relative overflow-hidden">
              <div
                className="h-full rounded-md flex items-center justify-end pr-2 transition-all"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: i === 0 ? "#14171C" : `rgba(20,23,28,${1 - i * 0.16})`,
                }}
              >
                <span className="readout text-white text-xs">{s.count}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
