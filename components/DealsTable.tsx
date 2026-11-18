"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "./Icons";

interface Deal {
  id: string;
  name: string;
  image: string;
  location: string;
  dateTime: string;
  piece: number;
  amount: string;
  status: "Delivered" | "Pending" | "Rejected";
}

export default function DealsTable() {
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const months = ["January", "April", "July", "October", "November", "December"];

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "1",
      name: "Apple Watch",
      image: "watch",
      location: "6096 Marjolaine Landing",
      dateTime: "12.09.2026 - 12.53 PM",
      piece: 423,
      amount: "$34,295",
      status: "Delivered",
    },
  ]);

  const toggleStatus = (id: string) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== id) return deal;
        const nextStatus: Record<Deal["status"], Deal["status"]> = {
          Delivered: "Pending",
          Pending: "Rejected",
          Rejected: "Delivered",
        };
        return { ...deal, status: nextStatus[deal.status] };
      })
    );
  };

  const getStatusBadge = (status: Deal["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-[#00B69B] hover:bg-[#009b84] text-white";
      case "Pending":
        return "bg-[#FEC53D] hover:bg-[#eab32f] text-white";
      case "Rejected":
        return "bg-[#EA0234] hover:bg-[#d4022f] text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[#202224] tracking-tight">Deals Details</h2>

        {/* Filter Dropdown Button */}
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

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#F1F4F9] text-[#202224] text-xs font-bold rounded-xl overflow-hidden">
              <th className="py-3.5 px-4 rounded-l-xl font-bold">Product Name</th>
              <th className="py-3.5 px-4 font-bold">Location</th>
              <th className="py-3.5 px-4 font-bold">Date - Time</th>
              <th className="py-3.5 px-4 font-bold">Piece</th>
              <th className="py-3.5 px-4 font-bold">Amount</th>
              <th className="py-3.5 px-4 rounded-r-xl font-bold text-center">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 text-xs text-[#202224]">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50/60 transition-colors">
                {/* Product Name */}
                <td className="py-4 px-4 font-semibold flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 p-1 flex items-center justify-center shrink-0 border border-gray-200/60 shadow-xs">
                    {/* Apple Watch mini icon/render */}
                    <div className="w-6 h-7 rounded-md bg-stone-900 border-2 border-amber-200/80 flex items-center justify-center shadow-inner relative">
                      <div className="w-3.5 h-4.5 rounded-sm bg-gradient-to-tr from-rose-500 to-indigo-500" />
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">{deal.name}</span>
                </td>

                {/* Location */}
                <td className="py-4 px-4 font-medium text-gray-600">{deal.location}</td>

                {/* Date - Time */}
                <td className="py-4 px-4 font-medium text-gray-600">{deal.dateTime}</td>

                {/* Piece */}
                <td className="py-4 px-4 font-semibold text-gray-800">{deal.piece}</td>

                {/* Amount */}
                <td className="py-4 px-4 font-bold text-gray-800">{deal.amount}</td>

                {/* Status Button */}
                <td className="py-4 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => toggleStatus(deal.id)}
                    title="Click to toggle status"
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs active:scale-95 transition-all ${getStatusBadge(
                      deal.status
                    )}`}
                  >
                    {deal.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
