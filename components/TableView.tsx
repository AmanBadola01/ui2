"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EditSquareIcon, TrashIcon } from "./Icons";
import { initialStockItems, ProductStockItem } from "@/data/stocks";

interface OrderItem {
  id: string;
  name: string;
  address: string;
  date: string;
  type: string;
  status: "Completed" | "Processing" | "Rejected";
}

const tableOrders: OrderItem[] = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "14 Feb 2026",
    type: "Electric",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "14 Feb 2026",
    type: "Book",
    status: "Processing",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "14 Feb 2026",
    type: "Medicine",
    status: "Rejected",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "14 Feb 2026",
    type: "Mobile",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "14 Feb 2026",
    type: "Watch",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Weimann Mountain",
    date: "14 Feb 2026",
    type: "Medicine",
    status: "Completed",
  },
];

export default function TableView() {
  const [stockItems, setStockItems] =
    useState<ProductStockItem[]>(initialStockItems);

  const handleDelete = (id: string) => {
    setStockItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getStatusBadge = (status: OrderItem["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-[#00B69B]/20 text-[#00B69B]";
      case "Processing":
        return "bg-[#6226EF]/20 text-[#6226EF]";
      case "Rejected":
        return "bg-[#EF3826]/20 text-[#EF3826]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderThumbnail = (item: ProductStockItem) => {
    switch (item.image) {
      case "watch":
        return (
          <div className="w-11 h-11 rounded-xl bg-[#FF9066] p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <Image
              src="/prod1.png"
              alt={item.name}
              width={36}
              height={36}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        );

      case "headphones":
        return (
          <div className="w-11 h-11 rounded-xl bg-[#1E293B] flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <Image
              src="/stock_headphone.png"
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        );

      case "dress":
        return (
          <div className="w-11 h-11 rounded-xl bg-[#6B21A8]/20 p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <svg
              className="w-7 h-7 text-[#9333EA]"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M19 10L24 13L29 10L26 20L34 38H14L22 20L19 10Z"
                fill="url(#dressGradientTable)"
                stroke="#7E22CE"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="dressGradientTable"
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
          <div className="w-11 h-11 rounded-xl bg-[#0F172A] p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <div className="w-5 h-9 rounded-md bg-stone-900 border border-gray-700 flex items-center justify-center p-0.5 shadow-inner">
              <div className="w-full h-full rounded-xs bg-gradient-to-tr from-rose-500 via-amber-400 to-indigo-500 relative">
                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-black rounded-full" />
              </div>
            </div>
          </div>
        );

      case "camera":
        return (
          <div className="w-11 h-11 rounded-xl bg-[#FF8800] p-1 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden">
            <svg
              className="w-7 h-7 text-stone-900"
              viewBox="0 0 48 48"
              fill="none"
            >
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
              <path d="M17 16L20 12H28L31 16H17Z" fill="#292524" />
              <circle
                cx="24"
                cy="27"
                r="7.5"
                fill="#44403C"
                stroke="#78716C"
                strokeWidth="1.5"
              />
              <circle cx="24" cy="27" r="4.5" fill="#0284C7" opacity="0.8" />
              <circle cx="22.5" cy="25.5" r="1.5" fill="#FFFFFF" opacity="0.9" />
              <rect x="33" y="13" width="4" height="3" rx="1" fill="#DC2626" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-gray-500">
              {item.name.charAt(0)}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          Table
        </h1>
      </div>

      {/* Table 1: Order List */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider uppercase font-['Nunito_Sans',sans-serif]">
                  ID
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider uppercase font-['Nunito_Sans',sans-serif]">
                  NAME
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider uppercase font-['Nunito_Sans',sans-serif]">
                  ADDRESS
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider uppercase font-['Nunito_Sans',sans-serif]">
                  DATE
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider uppercase font-['Nunito_Sans',sans-serif]">
                  TYPE
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider uppercase font-['Nunito_Sans',sans-serif]">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {tableOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-[#F9FAFB] transition-colors"
                >
                  <td className="py-4.5 px-6 text-sm font-semibold text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {order.id}
                  </td>
                  <td className="py-4.5 px-6 text-sm font-semibold text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {order.name}
                  </td>
                  <td className="py-4.5 px-6 text-sm font-medium text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {order.address}
                  </td>
                  <td className="py-4.5 px-6 text-sm font-medium text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {order.date}
                  </td>
                  <td className="py-4.5 px-6 text-sm font-medium text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {order.type}
                  </td>
                  <td className="py-4.5 px-6">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold inline-flex items-center justify-center min-w-[96px] ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Product Stock List */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider font-['Nunito_Sans',sans-serif]">
                  Image
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider font-['Nunito_Sans',sans-serif]">
                  Product Name
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider font-['Nunito_Sans',sans-serif]">
                  Category
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider font-['Nunito_Sans',sans-serif]">
                  Price
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider font-['Nunito_Sans',sans-serif]">
                  Piece
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider font-['Nunito_Sans',sans-serif]">
                  Available Color
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-[#202224] tracking-wider font-['Nunito_Sans',sans-serif]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-[#F9FAFB] transition-colors"
                >
                  {/* Image */}
                  <td className="py-4 px-6">{renderThumbnail(item)}</td>

                  {/* Product Name */}
                  <td className="py-4 px-6 text-sm font-semibold text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {item.name}
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6 text-sm font-medium text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {item.category}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 text-sm font-semibold text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {item.price}
                  </td>

                  {/* Piece */}
                  <td className="py-4 px-6 text-sm font-medium text-[#202224] font-['Nunito_Sans',sans-serif]">
                    {item.piece}
                  </td>

                  {/* Available Color */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {item.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full inline-block shrink-0 shadow-2xs border border-black/5"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg border border-gray-200/90 hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-all cursor-pointer shadow-2xs"
                        title="Edit product"
                      >
                        <EditSquareIcon className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="w-8 h-8 rounded-lg border border-gray-200/90 hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-[#EA0234] transition-all cursor-pointer shadow-2xs"
                        title="Delete product"
                      >
                        <TrashIcon className="w-4 h-4 text-[#EA0234]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
