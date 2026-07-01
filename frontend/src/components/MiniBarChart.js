import React from "react";

export default function MiniBarChart({ data, valueKey = "units", labelKey = "month" }) {
  const max = Math.max(...data.map((d) => d[valueKey])) * 1.15;
  const barWidth = 28;
  const gap = 18;
  const chartHeight = 120;
  const width = data.length * (barWidth + gap);

  return (
    <svg viewBox={`0 0 ${width} ${chartHeight + 26}`} width="100%" height={chartHeight + 26}>
      {data.map((d, i) => {
        const h = (d[valueKey] / max) * chartHeight;
        const x = i * (barWidth + gap) + gap / 2;
        const isLast = i === data.length - 1;
        return (
          <g key={d[labelKey]}>
            <rect
              x={x}
              y={chartHeight - h}
              width={barWidth}
              height={h}
              rx="4"
              fill={isLast ? "#D7263D" : "#14171C"}
              opacity={isLast ? 1 : 0.85}
            />
            <text
              x={x + barWidth / 2}
              y={chartHeight - h - 8}
              textAnchor="middle"
              fontSize="11"
              className="font-mono"
              fill="#20242B"
            >
              {d[valueKey]}
            </text>
            <text
              x={x + barWidth / 2}
              y={chartHeight + 18}
              textAnchor="middle"
              fontSize="11"
              fill="#6B7280"
            >
              {d[labelKey]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
