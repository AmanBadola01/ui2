"use client";

import React, { useState, useRef, useEffect } from "react";
import { initialOrders, Order, OrderStatus } from "@/data/orders";
import {
  FilterFunnelIcon,
  ResetReloadIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./Icons";

export default function OrderListsView() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedDate, setSelectedDate] = useState<string>("Date");
  const [selectedType, setSelectedType] = useState<string>("Order Type");
  const [selectedStatus, setSelectedStatus] = useState<string>("Order Status");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<
    "date" | "type" | "status" | null
  >(null);

  const filterBarRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dateOptions = ["All Dates", "2026", "Sep 2026", "May 2026", "Nov 2026", "Jul 2026", "Aug 2026"];
  const typeOptions = [
    "All Types",
    "Electric",
    "Book",
    "Medicine",
    "Mobile",
    "Watch",
  ];
  const statusOptions: (OrderStatus | "All Status")[] = [
    "All Status",
    "Completed",
    "Processing",
    "Rejected",
    "On Hold",
    "In Transit",
  ];

  const handleResetFilters = () => {
    setSelectedDate("Date");
    setSelectedType("Order Type");
    setSelectedStatus("Order Status");
    setOpenDropdown(null);
    setOrders(initialOrders);
    setCurrentPage(1);
  };

  const applyFilters = (
    newDate = selectedDate,
    newType = selectedType,
    newStatus = selectedStatus
  ) => {
    let filtered = [...initialOrders];

    if (newDate !== "Date" && newDate !== "All Dates") {
      filtered = filtered.filter((order) => order.date.includes(newDate));
    }

    if (newType !== "Order Type" && newType !== "All Types") {
      filtered = filtered.filter((order) => order.type === newType);
    }

    if (newStatus !== "Order Status" && newStatus !== "All Status") {
      filtered = filtered.filter((order) => order.status === newStatus);
    }

    setOrders(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(orders.length / pageSize) || 1;
  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const startIndex = orders.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, orders.length);

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case "Completed":
        return "bg-[#D5F5EC] text-[#00B69B]";
      case "Processing":
        return "bg-[#E5D7FD] text-[#6226EF]";
      case "Rejected":
        return "bg-[#FFE2E5] text-[#EF3826]";
      case "On Hold":
        return "bg-[#FFF0E6] text-[#FFA756]";
      case "In Transit":
        return "bg-[#F6DEFF] text-[#BA59FF]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
        Order Lists
      </h1>

      {/* Filter Bar */}
      <div
        ref={filterBarRef}
        className="inline-flex items-stretch bg-white rounded-xl border border-gray-200/80 shadow-xs divide-x divide-gray-100 flex-wrap"
      >
        {/* Funnel Icon */}
        <div className="px-4 py-3 flex items-center justify-center text-[#202224]">
          <FilterFunnelIcon className="w-4 h-4 text-gray-700" />
        </div>

        {/* "Filter By" Label */}
        <div className="px-5 py-3 flex items-center text-xs font-bold text-[#202224] select-none">
          Filter By
        </div>

        {/* Date Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "date" ? null : "date")
            }
            className="h-full px-5 py-3 flex items-center gap-3 text-xs font-bold text-[#202224] hover:bg-gray-50/80 transition-colors"
          >
            <span>{selectedDate}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
          </button>
          {openDropdown === "date" && (
            <div className="absolute left-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30">
              {dateOptions.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    setSelectedDate(date === "All Dates" ? "Date" : date);
                    setOpenDropdown(null);
                    applyFilters(date, selectedType, selectedStatus);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                    selectedDate === date
                      ? "text-[#4880FF] bg-blue-50/50"
                      : "text-gray-700"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order Type Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "type" ? null : "type")
            }
            className="h-full px-5 py-3 flex items-center gap-3 text-xs font-bold text-[#202224] hover:bg-gray-50/80 transition-colors"
          >
            <span>{selectedType}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
          </button>
          {openDropdown === "type" && (
            <div className="absolute left-0 top-full mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30">
              {typeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedType(type === "All Types" ? "Order Type" : type);
                    setOpenDropdown(null);
                    applyFilters(selectedDate, type, selectedStatus);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                    selectedType === type
                      ? "text-[#4880FF] bg-blue-50/50"
                      : "text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order Status Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "status" ? null : "status")
            }
            className="h-full px-5 py-3 flex items-center gap-3 text-xs font-bold text-[#202224] hover:bg-gray-50/80 transition-colors"
          >
            <span>{selectedStatus}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
          </button>
          {openDropdown === "status" && (
            <div className="absolute left-0 top-full mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setSelectedStatus(
                      status === "All Status" ? "Order Status" : status
                    );
                    setOpenDropdown(null);
                    applyFilters(selectedDate, selectedType, status);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                    selectedStatus === status
                      ? "text-[#4880FF] bg-blue-50/50"
                      : "text-gray-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reset Filter Button */}
        <div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="h-full px-5 py-3 flex items-center gap-2 text-xs font-bold text-[#EA0234] hover:bg-red-50/50 active:scale-95 transition-all select-none"
          >
            <ResetReloadIcon className="w-3.5 h-3.5 text-[#EA0234]" />
            <span>Reset Filter</span>
          </button>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            {/* Header */}
            <thead>
              <tr className="border-b border-gray-100 text-[#202224] text-xs font-bold tracking-wider">
                <th className="py-4.5 px-6 font-bold">ID</th>
                <th className="py-4.5 px-6 font-bold">NAME</th>
                <th className="py-4.5 px-6 font-bold">ADDRESS</th>
                <th className="py-4.5 px-6 font-bold">DATE</th>
                <th className="py-4.5 px-6 font-bold">TYPE</th>
                <th className="py-4.5 px-6 font-bold">STATUS</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100 text-xs text-[#202224]">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    {/* ID */}
                    <td className="py-4.5 px-6 font-medium text-gray-700">
                      {order.id}
                    </td>

                    {/* NAME */}
                    <td className="py-4.5 px-6 font-semibold text-[#202224]">
                      {order.name}
                    </td>

                    {/* ADDRESS */}
                    <td className="py-4.5 px-6 font-medium text-[#202224]">
                      {order.address}
                    </td>

                    {/* DATE */}
                    <td className="py-4.5 px-6 font-medium text-[#202224]">
                      {order.date}
                    </td>

                    {/* TYPE */}
                    <td className="py-4.5 px-6 font-medium text-[#202224]">
                      {order.type}
                    </td>

                    {/* STATUS */}
                    <td className="py-4.5 px-6">
                      <span
                        className={`inline-flex items-center justify-center px-4 py-1.5 rounded-[5px] text-xs font-bold min-w-[96px] text-center select-none ${getStatusBadgeStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
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
          {orders.length.toString().padStart(2, "0")}
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
