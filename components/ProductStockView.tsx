"use client";

import React, { useState } from "react";
import Image from "next/image";
import { initialStockItems, ProductStockItem } from "@/data/stocks";
import {
  SearchIcon,
  EditSquareIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./Icons";

export default function ProductStockView() {
  const [stockItems, setStockItems] =
    useState<ProductStockItem[]>(initialStockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const handleDelete = (id: string) => {
    setStockItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const startIndex =
    filteredItems.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredItems.length);

  // Render product thumbnail based on item type
  const renderThumbnail = (item: ProductStockItem) => {
    switch (item.image) {
      case "watch":
        return (
          <div className="w-12 h-12 rounded-xl bg-[#FF9066] p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <Image
              src="/prod1.png"
              alt={item.name}
              width={40}
              height={40}
              className="object-contain drop-shadow-xs"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        );

      case "headphones":
        return (
          <div className="w-12 h-12 rounded-xl bg-[#1E293B] p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <svg
              className="w-8 h-8 text-gray-300"
              viewBox="0 0 48 48"
              fill="none"
            >
              {/* Headband */}
              <path
                d="M10 24C10 16.268 16.268 10 24 10C31.732 10 38 16.268 38 24"
                stroke="#CBD5E1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Left Earcup */}
              <rect
                x="8"
                y="22"
                width="7"
                height="15"
                rx="3.5"
                fill="#F8FAFC"
                stroke="#64748B"
                strokeWidth="1.5"
              />
              {/* Right Earcup */}
              <rect
                x="33"
                y="22"
                width="7"
                height="15"
                rx="3.5"
                fill="#F8FAFC"
                stroke="#64748B"
                strokeWidth="1.5"
              />
              {/* Inner details */}
              <circle cx="24" cy="24" r="2" fill="#94A3B8" />
            </svg>
          </div>
        );

      case "dress":
        return (
          <div className="w-12 h-12 rounded-xl bg-[#6B21A8]/25 p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <svg
              className="w-8 h-8 text-[#9333EA]"
              viewBox="0 0 48 48"
              fill="none"
            >
              {/* Evening Gown silhouette */}
              <path
                d="M19 10L24 13L29 10L26 20L34 38H14L22 20L19 10Z"
                fill="url(#dressGradient)"
                stroke="#7E22CE"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="dressGradient"
                  x1="24"
                  y1="10"
                  x2="24"
                  y2="38"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#A855F7" />
                  <stop offset="1" stopColor="#581C87" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case "phone":
        return (
          <div className="w-12 h-12 rounded-xl bg-[#0F172A] p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <div className="w-6 h-10 rounded-md bg-stone-900 border border-gray-700 flex items-center justify-center p-0.5 shadow-inner">
              <div className="w-full h-full rounded-xs bg-gradient-to-tr from-rose-500 via-amber-400 to-indigo-500 relative">
                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-black rounded-full" />
              </div>
            </div>
          </div>
        );

      case "camera":
        return (
          <div className="w-12 h-12 rounded-xl bg-[#FF8800] p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <svg
              className="w-8 h-8 text-stone-900"
              viewBox="0 0 48 48"
              fill="none"
            >
              {/* Camera Body */}
              <rect
                x="8"
                y="16"
                width="32"
                height="22"
                rx="4"
                fill="#1C1917"
                stroke="#292524"
                strokeWidth="1.5"
              />
              {/* Top Viewfinder */}
              <path
                d="M17 16L20 12H28L31 16H17Z"
                fill="#292524"
              />
              {/* Lens Outer Ring */}
              <circle
                cx="24"
                cy="27"
                r="7.5"
                fill="#44403C"
                stroke="#78716C"
                strokeWidth="1.5"
              />
              {/* Lens Glass */}
              <circle cx="24" cy="27" r="4.5" fill="#0284C7" opacity="0.8" />
              <circle cx="22.5" cy="25.5" r="1.5" fill="#FFFFFF" opacity="0.9" />
              {/* Shutter Button */}
              <rect x="33" y="13" width="4" height="3" rx="1" fill="#DC2626" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-gray-100 p-1 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-gray-500">
              {item.name.charAt(0)}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row with Title & Search Input */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Page Title */}
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          Product Stock
        </h1>

        {/* Search Product Input */}
        <div className="relative">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search product name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200/90 rounded-full text-xs font-medium text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] w-64 shadow-xs transition-all"
          />
        </div>
      </div>

      {/* Stock Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-100 text-[#202224] text-xs font-bold tracking-wider">
                <th className="py-4.5 px-6 font-bold w-20">Image</th>
                <th className="py-4.5 px-6 font-bold">Product Name</th>
                <th className="py-4.5 px-6 font-bold">Category</th>
                <th className="py-4.5 px-6 font-bold">Price</th>
                <th className="py-4.5 px-6 font-bold">Piece</th>
                <th className="py-4.5 px-6 font-bold">Available Color</th>
                <th className="py-4.5 px-6 font-bold text-center w-28">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 text-xs text-[#202224]">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No products found matching &quot;{searchQuery}&quot;.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Image Thumbnail */}
                    <td className="py-4 px-6">{renderThumbnail(item)}</td>

                    {/* Product Name */}
                    <td className="py-4 px-6 font-semibold text-[#202224]">
                      {item.name}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 font-medium text-[#202224]">
                      {item.category}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 font-semibold text-[#202224]">
                      {item.price}
                    </td>

                    {/* Piece */}
                    <td className="py-4 px-6 font-medium text-[#202224]">
                      {item.piece}
                    </td>

                    {/* Available Color Dots */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {item.colors.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs inline-block shrink-0"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Action Buttons (Edit + Delete) */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Button */}
                        <button
                          type="button"
                          className="w-7 h-7 rounded-lg border border-gray-200/90 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center text-gray-500 active:scale-95 transition-all shadow-2xs"
                          title="Edit product"
                        >
                          <EditSquareIcon className="w-3.5 h-3.5 text-gray-600" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="w-7 h-7 rounded-lg border border-gray-200/90 hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-[#EA0234] active:scale-95 transition-all shadow-2xs"
                          title="Delete product"
                        >
                          <TrashIcon className="w-3.5 h-3.5 text-[#EA0234]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Pagination Controls */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-gray-400 font-medium">
          Showing {startIndex}-{endIndex.toString().padStart(2, "0")} of{" "}
          {filteredItems.length.toString().padStart(2, "0")}
        </p>

        {/* Pagination Chevron Box */}
        <div className="inline-flex items-center bg-white rounded-lg border border-gray-200/80 shadow-xs overflow-hidden divide-x divide-gray-200/80">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 hover:bg-gray-50 active:scale-95 transition-all text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeftIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 hover:bg-gray-50 active:scale-95 transition-all text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next page"
          >
            <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
