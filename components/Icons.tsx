import React from "react";
import Image from "next/image";

export function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function BellIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <Image
      src="/icon.png"
      alt="Notification bell"
      width={32}
      height={32}
      className={`${className} object-contain`}
      style={{ width: "auto", height: "auto" }}
    />
  );
}

export function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FEC53D">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function HeartOutlineIcon({ className = "w-5 h-5", isFilled = false }: { className?: string; isFilled?: boolean }) {
  return (
    <svg
      className={className}
      fill={isFilled ? "#EA0234" : "none"}
      viewBox="0 0 24 24"
      stroke={isFilled ? "#EA0234" : "currentColor"}
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

export function UKFlagIcon({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} rounded-sm overflow-hidden`} viewBox="0 0 60 30" fill="none">
      <clipPath id="uk-clip">
        <path d="M0 0h60v30H0z"/>
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <path d="M0 0h60v30H0z" fill="#012169"/>
        <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6"/>
        <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}

// Stat Card Icons
export function UsersMetricIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* Secondary User (Back) */}
      <circle cx="16.5" cy="8.5" r="3" fill="#8280FF" fillOpacity="0.65" />
      <path
        d="M12 18.5C12.2 15.8 14.2 13.5 16.5 13.5C19 13.5 21 15.5 21 18.5H12Z"
        fill="#8280FF"
        fillOpacity="0.65"
      />

      {/* Primary User (Front) */}
      <circle cx="9" cy="8" r="3.5" fill="#8280FF" />
      <path
        d="M3 18.5C3 15.2 5.7 12.5 9 12.5C12.3 12.5 15 15.2 15 18.5H3Z"
        fill="#8280FF"
      />
    </svg>
  );
}

export function OrderBoxMetricIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="2 2 20 20" fill="none">
      {/* Top Face (Light) */}
      <path
        d="M12 4.2L19.4 8.4L12 12.6L4.6 8.4Z"
        fill="#FED976"
        stroke="#FED976"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* Left Face (Medium) */}
      <path
        d="M4.2 9.8L11.4 13.9V20.6L4.2 16.5Z"
        fill="#FFBD3D"
        stroke="#FFBD3D"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* Right Face (Deep / Shadow) */}
      <path
        d="M12.6 13.9L19.8 9.8V16.5L12.6 20.6Z"
        fill="#FFAF25"
        stroke="#FFAF25"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SalesChartMetricIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 6v11.5h11.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 14l3-3.5 2.5 2 4-5" />
    </svg>
  );
}

export function PendingClockMetricIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* Counter-clockwise arrow head */}
      <polygon points="4,7 9,3.5 9,10.5" fill="currentColor" />
      {/* Clock track */}
      <path
        d="M8.5 7.5a7.5 7.5 0 1 1-3.5 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Clock hands */}
      <path
        d="M12 8.5v4l2.8 1.8"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrendUpIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

export function TrendDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  );
}

export function FilterFunnelIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V19l-4 2v-5.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}

export function ResetReloadIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}
