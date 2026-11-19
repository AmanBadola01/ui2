"use client";

import React, { useState } from "react";
import { FilterFunnelIcon, ChevronDownIcon } from "./Icons";

export default function UiElementsView() {
  const [filterMode, setFilterMode] = useState("Charts");

  // Chart 1: Solid Blue Vertical Bars
  const solidBlueBars = [100, 48, 38, 78, 62, 32, 54];

  // Chart 2: 4-tier Stacked Turquoise / Mint Bars
  const fourTierTurquoiseBars = [
    { height: 100, cyan: 45, mint: 21, teal: 21, gray: 13 },
    { height: 60, cyan: 30, mint: 17, teal: 22, gray: 31 },
    { height: 80, cyan: 45, mint: 13, teal: 13, gray: 29 },
    { height: 83, cyan: 40, mint: 25, teal: 26, gray: 9 },
    { height: 75, cyan: 30, mint: 28, teal: 28, gray: 14 },
    { height: 90, cyan: 46, mint: 20, teal: 12, gray: 22 },
    { height: 100, cyan: 53, mint: 21, teal: 13, gray: 13 },
  ];

  // Chart 3: Clustered Blue & Orange Bars
  const clusteredBars = [
    { height: 42, color: "#4880FF" },
    { height: 54, color: "#FF9500" },
    { height: 68, color: "#4880FF" },
    { height: 82, color: "#FF9500" },
    { height: 65, color: "#4880FF" },
    { height: 78, color: "#FF9500" },
    { height: 62, color: "#4880FF" },
    { height: 72, color: "#FF9500" },
    { height: 90, color: "#4880FF" },
    { height: 100, color: "#FF9500" },
    { height: 35, color: "#4880FF" },
    { height: 46, color: "#FF9500" },
    { height: 60, color: "#FF9500" },
  ];

  // Chart 4: Pink Stacked Bars
  const pinkBars = [78, 55, 66, 74, 60, 84, 76];

  return (
    <div className="space-y-7">
      {/* Top Header: Title & Filter */}
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          UI Elements
        </h1>

        {/* Filter Control Banner */}
        <div className="flex items-center bg-white rounded-xl border border-gray-200/90 shadow-2xs divide-x divide-gray-100">
          <div className="p-3 text-gray-500 flex items-center justify-center">
            <FilterFunnelIcon className="w-4 h-4 text-[#202224]" />
          </div>
          <div className="px-4 py-2.5 text-xs font-semibold text-[#202224] font-['Nunito_Sans',sans-serif]">
            Filter By
          </div>
          <div className="px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-[#202224] cursor-pointer hover:bg-gray-50/50 rounded-r-xl transition-colors font-['Nunito_Sans',sans-serif]">
            <span>{filterMode}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Card 1: Bar Chart */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs p-8 w-full">
        <h3 className="text-sm font-bold text-[#202224] mb-8 font-['Nunito_Sans',sans-serif]">
          Bar Chart
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-end justify-items-center h-48 py-2">
          {/* 1. Solid Blue Bars */}
          <div className="flex items-end gap-3 h-40">
            {solidBlueBars.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-2.5 bg-[#4880FF] rounded-full transition-all duration-300 hover:opacity-85"
              />
            ))}
          </div>

          {/* 2. Turquoise / Mint Stacked Bars (4 tiers matching Figma) */}
          <div className="flex items-end gap-3 h-40">
            {fourTierTurquoiseBars.map((bar, i) => (
              <div
                key={i}
                style={{ height: `${bar.height}%` }}
                className="w-2.5 flex flex-col overflow-hidden rounded-full transition-all duration-300 hover:opacity-90"
              >
                <div style={{ height: `${bar.cyan}%` }} className="w-full bg-[#D0F1FA]" />
                <div style={{ height: `${bar.mint}%` }} className="w-full bg-[#BDEEE1]" />
                <div style={{ height: `${bar.teal}%` }} className="w-full bg-[#1CCAB8]" />
                <div style={{ height: `${bar.gray}%` }} className="w-full bg-[#EDF0F4]" />
              </div>
            ))}
          </div>

          {/* 3. Clustered Blue & Orange Bars */}
          <div className="flex items-end gap-1.5 h-40">
            {clusteredBars.map((bar, i) => (
              <div
                key={i}
                style={{ height: `${bar.height}%`, backgroundColor: bar.color }}
                className="w-1.5 rounded-full transition-all duration-300 hover:opacity-85"
              />
            ))}
          </div>

          {/* 4. Pink Stacked Bars */}
          <div className="flex items-end gap-3 h-40">
            {pinkBars.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-2.5 flex flex-col justify-end overflow-hidden rounded-full bg-[#FFE9EE]"
              >
                <div className="w-full bg-[#FFE9EE] flex-1 rounded-t-full" />
                <div className="w-full bg-[#FF8FAB] h-6" />
                <div className="w-full bg-[#FF3B69] h-4 rounded-b-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2: Pie Chart */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs p-8 w-full">
        <h3 className="text-sm font-bold text-[#202224] mb-8 font-['Nunito_Sans',sans-serif]">
          Pie Chart
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center py-4">
          {/* Pie 1: Primary Blue Sector (~25% bottom-left) */}
          <div className="hover:scale-105 transition-transform">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="60" fill="#E8F0FE" />
              <path
                d="M 65 65 L 5 65 A 60 60 0 0 0 65 125 Z"
                fill="#4880FF"
              />
            </svg>
          </div>

          {/* Pie 2: Violet/Purple Sector (~25% top-right) */}
          <div className="hover:scale-105 transition-transform">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="60" fill="#E8F0FE" />
              <path
                d="M 65 65 L 65 5 A 60 60 0 0 1 125 65 Z"
                fill="#A855F7"
              />
            </svg>
          </div>

          {/* Pie 3: Orange Sector (~35% right side) */}
          <div className="hover:scale-105 transition-transform">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="60" fill="#E8F0FE" />
              <path
                d="M 65 65 L 65 5 A 60 60 0 0 1 117 95 Z"
                fill="#FF7A2F"
              />
            </svg>
          </div>

          {/* Pie 4: Sky Blue Majority Sector (~65% left side) */}
          <div className="hover:scale-105 transition-transform">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="60" fill="#E8F0FE" />
              <path
                d="M 65 65 L 65 5 A 60 60 0 1 0 117 95 Z"
                fill="#3B82F6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Card 3: Donut Chart */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs p-8 w-full">
        <h3 className="text-sm font-bold text-[#202224] mb-8 font-['Nunito_Sans',sans-serif]">
          Donut Chart
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center py-4">
          {/* Donut 1: Teal / Mint Arc */}
          <div className="hover:scale-105 transition-transform">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#E8EDF5"
                strokeWidth="22"
              />
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#00B69B"
                strokeWidth="22"
                strokeDasharray="108 200"
                strokeDashoffset="-77"
              />
            </svg>
          </div>

          {/* Donut 2: Blue + Orange Arcs */}
          <div className="hover:scale-105 transition-transform">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#E8EDF5"
                strokeWidth="22"
              />
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="22"
                strokeDasharray="108 200"
                strokeDashoffset="-77"
              />
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#FF7A2F"
                strokeWidth="22"
                strokeDasharray="46 262"
                strokeDashoffset="-185"
              />
            </svg>
          </div>

          {/* Donut 3: Yellow + Teal Arcs */}
          <div className="hover:scale-105 transition-transform">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#E8EDF5"
                strokeWidth="22"
              />
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#FFB800"
                strokeWidth="22"
                strokeDasharray="92 216"
                strokeDashoffset="-170"
              />
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#00B69B"
                strokeWidth="22"
                strokeDasharray="92 216"
                strokeDashoffset="-77"
              />
            </svg>
          </div>

          {/* Donut 4: Orange + Yellow + Teal Arcs */}
          <div className="hover:scale-105 transition-transform">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#E8EDF5"
                strokeWidth="22"
              />
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#FFB800"
                strokeWidth="22"
                strokeDasharray="77 231"
                strokeDashoffset="-154"
              />
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#00B69B"
                strokeWidth="22"
                strokeDasharray="77 231"
                strokeDashoffset="-77"
              />
              <circle
                cx="65"
                cy="65"
                r="49"
                fill="none"
                stroke="#FF7A2F"
                strokeWidth="22"
                strokeDasharray="77 231"
                strokeDashoffset="-231"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
