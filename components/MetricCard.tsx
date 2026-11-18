"use client";

import React from "react";
import { TrendUpIcon, TrendDownIcon } from "./Icons";

export interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBgColor: string;
  trendPercentage: string;
  trendText: string;
  isUp: boolean;
  onClick?: () => void;
}

export default function MetricCard({
  title,
  value,
  icon,
  iconBgColor,
  trendPercentage,
  trendText,
  isUp,
  onClick,
}: MetricCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between w-full group active:scale-[0.99]"
    >
      {/* Top Row: Title + Icon */}
      <div className="flex items-start justify-between w-full">
        <div>
          <span className="text-sm font-semibold text-gray-500 block">{title}</span>
          <span className="text-2xl font-bold text-[#202224] mt-2 block tracking-tight">
            {value}
          </span>
        </div>
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>

      {/* Bottom Row: Trend indicator */}
      <div className="flex items-center gap-1.5 mt-5 text-xs">
        <span
          className={`flex items-center gap-1 font-semibold ${
            isUp ? "text-[#00B69B]" : "text-[#EA0234]"
          }`}
        >
          {isUp ? (
            <TrendUpIcon className="w-3.5 h-3.5" />
          ) : (
            <TrendDownIcon className="w-3.5 h-3.5" />
          )}
          <span>{trendPercentage}</span>
        </span>
        <span className="text-gray-500 font-normal">{trendText}</span>
      </div>
    </button>
  );
}
