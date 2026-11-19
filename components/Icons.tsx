import React from "react";
import Image from "next/image";

export function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function BellIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image
      src="/icon.png"
      alt="Notification bell"
      width={24}
      height={26}
      className={`${className} object-contain`}
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

export function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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

export function EditSquareIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
}

export function TrashIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}

export function UserGearIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      {/* User Silhouette */}
      <path d="M7 3a3 3 0 100 6 3 3 0 000-6zM3 14a4 4 0 018 0v1H3v-1z" />
      {/* Gear */}
      <path
        fillRule="evenodd"
        d="M14.5 9.5a2 2 0 100 4 2 2 0 000-4zm-.8 2a.8.8 0 111.6 0 .8.8 0 01-1.6 0z"
        clipRule="evenodd"
      />
      <path d="M14.5 8.5v.7l.6.2.5-.5.6.6-.5.5.2.6h.7v.8h-.7l-.2.6.5.5-.6.6-.5-.5-.6.2v.7h-.8v-.7l-.6-.2-.5.5-.6-.6.5-.5-.2-.6h-.7v-.8h.7l.2-.6-.5-.5.6-.6.5.5.6-.2v-.7h.8z" />
    </svg>
  );
}

export function KeyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" transform="rotate(-45 12 12)" />
    </svg>
  );
}

export function ActivityLogIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.3}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

export function LogoutDoorIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

export function StarToggleIcon({ isStarred = false, className = "w-5 h-5" }: { isStarred?: boolean; className?: string }) {
  if (isStarred) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#FFB800">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#D5D8DF" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  );
}

export function CircleXIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#D5D8DF" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
    </svg>
  );
}

export function PrinterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 14h12v7H6z" />
    </svg>
  );
}

export function PaperAirplaneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}
