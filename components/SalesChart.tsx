"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "./Icons";

interface DataPoint {
  xLabel: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100 (where 0 is bottom, 100 is top)
  value: string;
  isPeak?: boolean;
}

type CoordPoint = DataPoint & { x: number; y: number };

export default function SalesChart() {
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<CoordPoint | null>(null);

  const months = ["January", "Feburary", "March","April", "May","June", "July","August","September", "October", "November", "December"];

  // Exact data points traced from the Figma line chart
  const points: DataPoint[] = [
    { xLabel: "5k", xPercent: 3, yPercent: 20, value: "24,120.00" },
    { xLabel: "", xPercent: 4.5, yPercent: 26, value: "28,500.00" },
    { xLabel: "", xPercent: 9, yPercent: 29, value: "31,200.00" },
    { xLabel: "10k", xPercent: 12, yPercent: 48, value: "48,900.00" },
    { xLabel: "", xPercent: 15, yPercent: 39, value: "40,100.00" },
    { xLabel: "15k", xPercent: 17.5, yPercent: 52, value: "52,400.00" },
    { xLabel: "", xPercent: 20, yPercent: 31, value: "32,800.00" },
    { xLabel: "", xPercent: 22, yPercent: 39, value: "39,500.00" },
    { xLabel: "20k", xPercent: 25, yPercent: 53, value: "54,200.00" },
    { xLabel: "", xPercent: 27, yPercent: 41, value: "42,000.00" },
    // Major Peak point (64,366.77)
    { xLabel: "", xPercent: 29, yPercent: 88, value: "64,366.77", isPeak: true },
    { xLabel: "25k", xPercent: 31, yPercent: 35, value: "36,000.00" },
    { xLabel: "", xPercent: 34, yPercent: 52, value: "53,100.00" },
    { xLabel: "", xPercent: 38, yPercent: 46, value: "47,500.00" },
    { xLabel: "30k", xPercent: 42, yPercent: 55, value: "56,200.00" },
    { xLabel: "", xPercent: 46, yPercent: 45, value: "46,800.00" },
    { xLabel: "35k", xPercent: 50, yPercent: 62, value: "62,100.00" },
    { xLabel: "", xPercent: 52, yPercent: 24, value: "25,000.00" },
    { xLabel: "", xPercent: 55, yPercent: 29, value: "30,200.00" },
    { xLabel: "40k", xPercent: 58, yPercent: 26, value: "27,400.00" },
    { xLabel: "", xPercent: 60, yPercent: 47, value: "48,000.00" },
    { xLabel: "", xPercent: 64, yPercent: 46, value: "47,800.00" },
    { xLabel: "45k", xPercent: 67, yPercent: 73, value: "73,400.00" },
    { xLabel: "", xPercent: 69, yPercent: 50, value: "51,000.00" },
    { xLabel: "", xPercent: 72, yPercent: 59, value: "59,600.00" },
    { xLabel: "50k", xPercent: 76, yPercent: 66, value: "66,200.00" },
    { xLabel: "", xPercent: 82, yPercent: 53, value: "54,000.00" },
    { xLabel: "55k", xPercent: 86, yPercent: 58, value: "58,700.00" },
    { xLabel: "", xPercent: 90, yPercent: 42, value: "43,000.00" },
    { xLabel: "60k", xPercent: 93, yPercent: 57, value: "57,500.00" },
    { xLabel: "", xPercent: 97, yPercent: 49, value: "50,200.00" },
    { xLabel: "", xPercent: 99, yPercent: 54, value: "55,000.00" },
  ];

  // SVG viewBox dimensions
  const svgWidth = 850;
  const svgHeight = 260;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // Convert percentages to SVG coordinates
  const coords = points.map((p) => {
    const x = paddingLeft + (p.xPercent / 100) * chartWidth;
    const y = paddingTop + chartHeight - (p.yPercent / 100) * chartHeight;
    return { ...p, x, y };
  });

  // Construct SVG Path strings
  const pathD = coords.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, "");

  // Area path (closed at the bottom)
  const first = coords[0];
  const last = coords[coords.length - 1];
  const bottomY = paddingTop + chartHeight;
  const areaD = `${pathD} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;

  // Find peak point & determine currently active tooltip point
  const peakPoint = coords.find((c) => c.isPeak) || coords[10];
  const activePoint = hoveredPoint || peakPoint;

  const yLabels = ["100%", "80%", "60%", "40%", "20%"];
  const xLabels = ["5k", "10k", "15k", "20k", "25k", "30k", "35k", "40k", "45k", "50k", "55k", "60k"];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#202224] tracking-tight">Sales Details</h2>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all shadow-xs"
          >
            <span>{selectedMonth}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20">
              {months.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setSelectedMonth(m);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors ${
                    selectedMonth === m ? "text-[#4880FF] font-bold" : "text-gray-600"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[650px] relative">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto select-none"
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4880FF" stopOpacity="0.28" />
                <stop offset="70%" stopColor="#4880FF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#4880FF" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines & Y-axis labels */}
            {yLabels.map((label, idx) => {
              const yPos = paddingTop + (idx / (yLabels.length - 1)) * chartHeight;
              return (
                <g key={label}>
                  <text
                    x={paddingLeft - 10}
                    y={yPos + 4}
                    textAnchor="end"
                    className="text-[11px] fill-gray-400 font-medium"
                  >
                    {label}
                  </text>
                  <line
                    x1={paddingLeft}
                    y1={yPos}
                    x2={svgWidth - paddingRight}
                    y2={yPos}
                    stroke="#F1F3F7"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* X-axis labels */}
            {xLabels.map((label, idx) => {
              const xPos =
                paddingLeft + (idx / (xLabels.length - 1)) * chartWidth;
              return (
                <text
                  key={label}
                  x={xPos}
                  y={svgHeight - 12}
                  textAnchor="middle"
                  className="text-[11px] fill-gray-400 font-medium"
                >
                  {label}
                </text>
              );
            })}

            {/* Gradient Area Fill */}
            <path d={areaD} fill="url(#salesGradient)" />

            {/* Stroke Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#4880FF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Guide line down from Active Point */}
            <line
              x1={activePoint.x}
              y1={activePoint.y}
              x2={activePoint.x}
              y2={bottomY}
              stroke="#4880FF"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              opacity="0.6"
              className="transition-all duration-150"
            />

            {/* Interactive Data Dots with generous hit target */}
            {coords.map((pt, i) => {
              const isSelected = activePoint === pt;
              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Invisible 28px hit area so users easily trigger hover */}
                  <circle cx={pt.x} cy={pt.y} r={14} fill="transparent" />
                  {/* Visible data point */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 5.5 : pt.isPeak ? 4.5 : 3}
                    fill="#4880FF"
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 2.5 : pt.isPeak ? 2 : 1.5}
                    className="transition-all duration-150"
                  />
                </g>
              );
            })}
          </svg>

          {/* Floating Tooltip Badge */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-150 ease-out"
            style={{
              left: `${(activePoint.x / svgWidth) * 100}%`,
              top: `${(activePoint.y / svgHeight) * 100}%`,
              marginTop: "-8px",
            }}
          >
            <div className="bg-[#4880FF] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center justify-center relative whitespace-nowrap">
              {activePoint.value}
              {/* Downward triangle pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-t-[#4880FF] border-t-4 border-x-transparent border-x-4 border-b-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
