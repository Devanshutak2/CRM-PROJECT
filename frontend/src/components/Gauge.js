import React from "react";

// A speedometer-style radial gauge — the dashboard's signature element.
// value/max drive the needle sweep across a 220-degree arc, with a
// redline zone near the top end, echoing an actual car's dial.
export default function Gauge({ value, max, label, unitLabel = "units" }) {
  const pct = Math.min(value / max, 1);
  const startAngle = -110;
  const endAngle = 110;
  const angle = startAngle + pct * (endAngle - startAngle);

  const size = 200;
  const cx = size / 2;
  const cy = size / 2 + 8;
  const r = 78;

  const pointAt = (deg, radius) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };

  const arcPath = (a1, a2, radius) => {
    const [x1, y1] = pointAt(a1, radius);
    const [x2, y2] = pointAt(a2, radius);
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  };

  const ticks = Array.from({ length: 12 }, (_, i) => startAngle + (i * (endAngle - startAngle)) / 11);
  const [needleX, needleY] = pointAt(angle, r);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size - 30}`} width="180" height="150">
        {/* base track */}
        <path d={arcPath(startAngle, endAngle, r)} stroke="#E4E2DC" strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* redline zone, last 15% of dial */}
        <path
          d={arcPath(startAngle + 0.85 * (endAngle - startAngle), endAngle, r)}
          stroke="#D7263D"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* progress fill */}
        <path d={arcPath(startAngle, angle, r)} stroke="#14171C" strokeWidth="10" fill="none" strokeLinecap="round" />

        {/* tick marks */}
        {ticks.map((t, i) => {
          const [x1, y1] = pointAt(t, r);
          const rad = ((t - 90) * Math.PI) / 180;
          const x2 = cx + (r - 14) * Math.cos(rad);
          const y2 = cy + (r - 14) * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9CA3AF" strokeWidth="2" />;
        })}

        {/* needle */}
        <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#D7263D" strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="5" fill="#14171C" />

        {/* center readout */}
        <text x={cx} y={cy - 22} textAnchor="middle" className="font-mono" fontSize="22" fontWeight="600" fill="#14171C">
          {value}
        </text>
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="9" fill="#6B7280" letterSpacing="1">
          / {max} {unitLabel.toUpperCase()}
        </text>
      </svg>
      <p className="text-xs uppercase tracking-widest text-mute mt-1 font-display">{label}</p>
    </div>
  );
}
