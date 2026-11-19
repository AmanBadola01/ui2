"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
  CheckIcon,
  UserGearIcon,
  KeyIcon,
  ActivityLogIcon,
  LogoutDoorIcon,
} from "./Icons";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const languages = [
  { name: "English", flag: "/uk_flag.png" },
  { name: "French", flag: "/french_flag.png" },
  { name: "Spanish", flag: "/spanish_flag.png" },
];

const notifications = [
  {
    id: 1,
    title: "Settings",
    subtitle: "Update Dashboard",
    bgGradient: "bg-gradient-to-b from-[#58A0FE] to-[#7DC6FD]",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Event Update",
    subtitle: "An event date update again",
    bgGradient: "bg-gradient-to-b from-[#F989DB] to-[#FFBBE5]",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5.5" width="17" height="15" rx="3" stroke="white" strokeWidth="2" />
        <path d="M3.5 10H20.5" stroke="white" strokeWidth="2" />
        <path d="M7.5 3V6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 3V6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <rect x="7" y="12.5" width="2" height="2" rx="0.5" fill="white" />
        <rect x="11" y="12.5" width="2" height="2" rx="0.5" fill="white" />
        <rect x="15" y="12.5" width="2" height="2" rx="0.5" fill="white" />
        <rect x="7" y="16" width="2" height="2" rx="0.5" fill="white" />
        <rect x="11" y="16" width="2" height="2" rx="0.5" fill="white" />
        <rect x="15" y="16" width="2" height="2" rx="0.5" fill="white" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Profile",
    subtitle: "Update your profile",
    bgGradient: "bg-gradient-to-b from-[#A997FE] to-[#E2C3FE]",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="8" r="3.75" />
        <path d="M5 19.5C5 15.91 8.134 13 12 13C15.866 13 19 15.91 19 19.5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Application Error",
    subtitle: "Check Your runnung application",
    bgGradient: "bg-gradient-to-b from-[#FF9999] to-[#FFBDBD]",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.75 5.5C10.75 4.81 11.31 4.25 12 4.25C12.69 4.25 13.25 4.81 13.25 5.5V13.5C13.25 14.19 12.69 14.75 12 14.75C11.31 14.75 10.75 14.19 10.75 13.5V5.5Z" />
        <circle cx="12" cy="18" r="1.6" />
      </svg>
    ),
  },
];

export default function Header({ onSearch }: HeaderProps = {}) {
  const [searchValue, setSearchValue] = useState("");
  const [notificationsCount, setNotificationsCount] = useState(6);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        langRef.current &&
        !langRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="py-2 bg-white border-b border-gray-100 pl-[78px] pr-8 sm:pr-10 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-[388px] h-[30px]">
        <div className="relative flex items-center h-full">
          <span className="absolute left-4 text-gray-400">
            <SearchIcon className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            placeholder="Search"
            className="w-full h-full bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 pl-11 pr-4 rounded-full border border-gray-200/70 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-[#4880FF]/15 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Notification Bell Button & Popover */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            title="Notifications"
            className="relative p-2 text-gray-500 hover:text-[#4880FF] hover:bg-gray-50 rounded-full transition-all active:scale-95"
          >
            <BellIcon className="w-5 h-5 text-gray-500" />
            {notificationsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[11px] h-2.5 px-0.5 bg-[#EA0234] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-1 ring-white">
                {notificationsCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute -left-10 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-40">
              <div className="px-5 py-3.5">
                <h3 className="text-sm font-bold text-[#202224]">Notification</h3>
              </div>
              <div className="border-b border-gray-100" />
              <div className="py-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 px-5 py-2.5 hover:bg-gray-50/80 transition-colors cursor-pointer text-left w-full group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${item.bgGradient} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-[#202224]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100" />
              <button
                type="button"
                className="w-full py-3 text-center text-xs font-semibold text-gray-400 hover:text-[#4880FF] transition-colors cursor-pointer block"
              >
                See all notification
              </button>
            </div>
          )}
        </div>

        {/* Language Selector Button */}
        <div ref={langRef} className="relative">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
          >
            <div className="w-9 h-[23px] rounded-[2px] overflow-hidden shrink-0 shadow-2xs border border-gray-100 flex items-center justify-center bg-gray-50">
              <Image
                src={selectedLang.flag}
                alt={selectedLang.name}
                width={28}
                height={18}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-gray-700">
              {selectedLang.name}
            </span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-100 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-40">
              <div className="px-4 pb-2.5 text-[13px] font-semibold text-gray-700">
                Select Language
              </div>
              <div className="border-b border-gray-100 mb-2" />
              <div className="px-1.5 space-y-1">
                {languages.map((lang) => {
                  const isSelected = selectedLang.name === lang.name;
                  return (
                    <button
                      key={lang.name}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-[18px] rounded-[2px] overflow-hidden shrink-0 shadow-2xs border border-gray-100 flex items-center justify-center bg-gray-50">
                          <Image
                            src={lang.flag}
                            alt={lang.name}
                            width={28}
                            height={18}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {lang.name}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckIcon className="w-4 h-4 text-gray-600 stroke-[2.5]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Button with Popover */}
        <div ref={userMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 active:scale-98 transition-all group"
          >
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#FBCFE8]/50 ring-2 ring-gray-100 flex items-center justify-center shrink-0 relative shadow-xs">
              {/* Custom Moni Roy avatar illustration matching 3D character */}
              <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#FCE7F3" />
                {/* Outfit */}
                <path
                  d="M9 39C9 31.5 14.5 27 20 27C25.5 27 31 31.5 31 39"
                  fill="#7C3AED"
                />
                <path d="M17 27L20 31L23 27" fill="#DDD6FE" />
                {/* Neck */}
                <rect x="18" y="23" width="4" height="5" fill="#FBCFE8" />
                {/* Face */}
                <ellipse cx="20" cy="18" rx="6.5" ry="7.5" fill="#FDE4CF" />
                {/* Hair Buns */}
                <circle cx="12" cy="11" r="4.5" fill="#9333EA" />
                <circle cx="28" cy="11" r="4.5" fill="#9333EA" />
                <circle cx="12" cy="11" r="2.5" fill="#A855F7" />
                <circle cx="28" cy="11" r="2.5" fill="#A855F7" />
                {/* Main Hair & Bangs */}
                <path
                  d="M13.5 18C13.5 11 16 8 20 8C24 8 26.5 11 26.5 18C26.5 14 24 11 20 11C16 11 13.5 14 13.5 18Z"
                  fill="#9333EA"
                />
                {/* Glasses Frames */}
                <rect
                  x="15"
                  y="16"
                  width="4"
                  height="3"
                  rx="1"
                  stroke="#4C1D95"
                  strokeWidth="0.8"
                  fill="none"
                />
                <rect
                  x="21"
                  y="16"
                  width="4"
                  height="3"
                  rx="1"
                  stroke="#4C1D95"
                  strokeWidth="0.8"
                  fill="none"
                />
                <path d="M19 17.5H21" stroke="#4C1D95" strokeWidth="0.8" />
                {/* Smile */}
                <path
                  d="M18.5 22C19.5 23 20.5 23 21.5 22"
                  stroke="#BE185D"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* User Info */}
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-[#202224] leading-tight">
                Moni Roy
              </div>
              <div className="text-[11px] font-medium text-gray-400 leading-tight">
                Admin
              </div>
            </div>

            {/* Circular Dropdown Chevron Button */}
            <div className="w-5 h-5 rounded-full border border-gray-200/90 flex items-center justify-center text-gray-400 group-hover:border-gray-300 group-hover:text-gray-600 transition-colors">
              <ChevronDownIcon
                className={`w-3 h-3 transition-transform duration-200 ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Profile Dropdown Popover */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2.5 w-52 bg-white rounded-2xl shadow-xl shadow-gray-200/70 border border-gray-100 overflow-hidden divide-y divide-gray-100/80 z-50 select-none animate-in fade-in zoom-in-95 duration-100">
              {/* Manage Account */}
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-[#202224] hover:bg-gray-50/80 active:bg-gray-100 transition-colors text-left group"
              >
                <UserGearIcon className="w-4 h-4 text-[#4880FF] shrink-0" />
                <span>Manage Account</span>
              </button>

              {/* Change Password */}
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-[#202224] hover:bg-gray-50/80 active:bg-gray-100 transition-colors text-left group"
              >
                <KeyIcon className="w-4 h-4 text-[#FF6584] shrink-0" />
                <span>Change Password</span>
              </button>

              {/* Activity Log */}
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-[#202224] hover:bg-gray-50/80 active:bg-gray-100 transition-colors text-left group"
              >
                <ActivityLogIcon className="w-4 h-4 text-[#A855F7] shrink-0" />
                <span>Activity Log</span>
              </button>

              {/* Log out */}
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-[#202224] hover:bg-red-50/40 active:bg-red-50 transition-colors text-left group"
              >
                <LogoutDoorIcon className="w-4 h-4 text-[#FF7B89] shrink-0" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
