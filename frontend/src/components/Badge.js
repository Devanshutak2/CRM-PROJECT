import React from "react";

const STYLES = {
  Hot: "bg-redline/10 text-redline border-redline/30",
  Warm: "bg-amber/10 text-amber border-amber/40",
  Cold: "bg-gray-100 text-mute border-gray-300",
  New: "bg-blue-50 text-blue-600 border-blue-200",
  Won: "bg-success/10 text-success border-success/30",
  Lost: "bg-gray-100 text-mute border-gray-300",
  Done: "bg-success/10 text-success border-success/30",
  "In Progress": "bg-amber/10 text-amber border-amber/40",
  Scheduled: "bg-blue-50 text-blue-600 border-blue-200",
  Cancelled: "bg-gray-100 text-mute border-gray-300",
  "Awaiting Parts": "bg-redline/10 text-redline border-redline/30",
  Healthy: "bg-success/10 text-success border-success/30",
  Low: "bg-amber/10 text-amber border-amber/40",
  Critical: "bg-redline/10 text-redline border-redline/30",
};

export default function Badge({ children }) {
  const style = STYLES[children] || "bg-gray-100 text-mute border-gray-300";
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${style}`}
    >
      {children}
    </span>
  );
}
