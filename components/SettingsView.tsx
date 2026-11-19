"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

export default function SettingsView() {
  const [siteName, setSiteName] = useState("Bright Web");
  const [copyRight, setCopyRight] = useState("All rights Reserved@brightweb");
  const [seoTitle, setSeoTitle] = useState("Bright web is a hybrid dashboard");
  const [seoDescription, setSeoDescription] = useState(
    "Bright web is a hybrid dashboard"
  );
  const [seoKeywords, setSeoKeywords] = useState("CEO");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-7">
      {/* Page Title */}
      <div>
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          General Settings
        </h1>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs px-8 sm:px-14 py-12 max-w-[980px] w-full mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Logo Upload Section */}
          <div className="flex flex-col items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-full bg-[#ECEEF2] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity relative group cursor-pointer"
              title="Click to upload logo"
            >
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Uploaded logo"
                  fill
                  className="object-cover"
                />
              ) : (
                <svg
                  className="w-7 h-7 text-[#202224]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-[#4880FF] hover:underline cursor-pointer mt-3"
            >
              Upload Logo
            </button>
          </div>

          {/* Form Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-10">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                  SEO Keywords
                </label>
                <input
                  type="text"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                  Copy Right
                </label>
                <input
                  type="text"
                  value={copyRight}
                  onChange={(e) => setCopyRight(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                  SEO Description
                </label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full flex-1 px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all resize-none font-['Nunito_Sans',sans-serif] min-h-[136px]"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="mt-10 flex flex-col items-center">
            <button
              type="submit"
              className="w-48 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-[#4880FF]/25 transition-all active:scale-98 cursor-pointer"
            >
              Save
            </button>
            {isSaved && (
              <span className="text-xs font-semibold text-emerald-600 mt-3 animate-in fade-in">
                Settings saved successfully!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
