import React from "react";

export default function Topbar({ title, subtitle, isLive }) {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-line bg-paper">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-mute mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span
          className={`w-2 h-2 rounded-full ${isLive ? "bg-success" : "bg-amber"}`}
        />
        <span className="text-mute">
          {isLive ? "Connected to live API" : "Demo data (API offline)"}
        </span>
      </div>
    </header>
  );
}
