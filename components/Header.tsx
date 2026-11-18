"use client";

import React, { useState } from "react";
import { SearchIcon, BellIcon, ChevronDownIcon, UKFlagIcon } from "./Icons";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [notificationsCount, setNotificationsCount] = useState(6);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const languages = ["English", "Spanish", "French", "German"];

  return (
    <header className="h-18 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-96 max-w-md">
        <div className="relative flex items-center">
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
            className="w-full bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 pl-11 pr-4 py-2.5 rounded-full border border-gray-200/70 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-[#4880FF]/15 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Notification Bell Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsCount(0)}
            title="Notifications"
            className="relative p-2 text-gray-500 hover:text-[#4880FF] hover:bg-gray-50 rounded-full transition-all active:scale-95"
          >
            <BellIcon className="w-10 h-10 text-gray-500" />
            {notificationsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[11px] h-2.5 px-0.5 bg-[#EA0234] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-1 ring-white">
                {notificationsCount}
              </span>
            )}
          </button>
        </div>

        {/* Language Selector Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
          >
            <UKFlagIcon className="w-6 h-4 shadow-xs" />
            <span className="text-xs font-semibold text-gray-700">{currentLang}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-40">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setCurrentLang(lang);
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors ${
                    currentLang === lang ? "text-[#4880FF] font-bold" : "text-gray-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 active:scale-98 transition-all"
          >
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-rose-100 ring-2 ring-gray-100 flex items-center justify-center shrink-0">
              {/* Stylized avatar matching screenshot (pink hair woman avatar) */}
              <div className="w-full h-full bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 flex items-center justify-center text-white font-bold text-sm">
                MR
              </div>
            </div>

            {/* User info */}
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-[#202224] leading-tight">Moni Roy</div>
              <div className="text-[11px] font-medium text-gray-400 leading-tight">Admin</div>
            </div>

            {/* Dropdown Chevron */}
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-40">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-800">Moni Roy</p>
                <p className="text-[11px] text-gray-400">admin@dashstack.com</p>
              </div>
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#4880FF]"
              >
                Profile Settings
              </button>
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#4880FF]"
              >
                Account Activity
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
