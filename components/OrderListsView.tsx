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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ORDER_TYPE_OPTIONS = [
  "Health & Medicine",
  "Book & Stationary",
  "Services & Industry",
  "Fashion & Beauty",
  "Home & Living",
  "Electronics",
  "Mobile & Phone",
  "Accessories",
];

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "Completed",
  "Processing",
  "Rejected",
  "On Hold",
  "In Transit",
];

const TYPE_MAPPINGS: Record<string, string[]> = {
  "Health & Medicine": ["Medicine", "Health & Medicine", "Health"],
  "Book & Stationary": ["Book", "Book & Stationary", "Stationary"],
  "Services & Industry": ["Services & Industry", "Services", "Industry"],
  "Fashion & Beauty": ["Fashion & Beauty", "Fashion", "Beauty"],
  "Home & Living": ["Home & Living", "Home", "Living"],
  "Electronics": ["Electric", "Electronics"],
  "Mobile & Phone": ["Mobile", "Mobile & Phone", "Phone"],
  "Accessories": ["Watch", "Accessories"],
};

export default function OrderListsView() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Date Filter States
  const [appliedDates, setAppliedDates] = useState<string[]>([]);
  const [tempSelectedDates, setTempSelectedDates] = useState<string[]>([
    "14 Feb 2026",
  ]);
  const [calendarMonth, setCalendarMonth] = useState<number>(1); // 1 = February
  const [calendarYear, setCalendarYear] = useState<number>(2026);

  // Order Type Filter States
  const [appliedTypes, setAppliedTypes] = useState<string[]>([]);
  const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>([]);

  // Order Status Filter States
  const [appliedStatuses, setAppliedStatuses] = useState<OrderStatus[]>([]);
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState<
    OrderStatus[]
  >([]);

  // Pagination State
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

  const handleResetFilters = () => {
    setAppliedDates([]);
    setTempSelectedDates(["14 Feb 2026"]);
    setCalendarMonth(1);
    setCalendarYear(2026);
    setAppliedTypes([]);
    setTempSelectedTypes([]);
    setAppliedStatuses([]);
    setTempSelectedStatuses([]);
    setOpenDropdown(null);
    setOrders(initialOrders);
    setCurrentPage(1);
  };

  const applyFilters = (
    dates: string[] = appliedDates,
    types: string[] = appliedTypes,
    statuses: OrderStatus[] = appliedStatuses
  ) => {
    let filtered = [...initialOrders];

    // Filter by Date
    if (dates.length > 0) {
      filtered = filtered.filter((order) =>
        dates.some(
          (d) =>
            order.date === d ||
            order.date.includes(d) ||
            order.date.toLowerCase() === d.toLowerCase()
        )
      );
    }

    // Filter by Order Type
    if (types.length > 0) {
      filtered = filtered.filter((order) =>
        types.some((selectedOption) => {
          const mappedKeywords =
            TYPE_MAPPINGS[selectedOption] || [selectedOption];
          return mappedKeywords.some(
            (k) =>
              order.type.toLowerCase() === k.toLowerCase() ||
              order.type.toLowerCase().includes(k.toLowerCase())
          );
        })
      );
    }

    // Filter by Status
    if (statuses.length > 0) {
      filtered = filtered.filter((order) => statuses.includes(order.status));
    }

    setOrders(filtered);
    setCurrentPage(1);
  };

  // Calendar Day Generation
  const getCalendarDays = (year: number, month: number) => {
    if (year === 2026 && month === 1) {
      // Exact pixel match for February 2026 from reference design
      const prevDays = [27, 28, 29, 30].map((d) => ({
        day: d,
        isCurrent: false,
      }));
      const currentDays = Array.from({ length: 28 }, (_, i) => ({
        day: i + 1,
        isCurrent: true,
      }));
      const nextDays = [29, 30, 31].map((d) => ({
        day: d,
        isCurrent: false,
      }));
      return [...prevDays, ...currentDays, ...nextDays];
    }

    // Dynamic generation for other months
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const prevDays = Array.from({ length: firstDayOfWeek }, (_, i) => ({
      day: daysInPrevMonth - firstDayOfWeek + i + 1,
      isCurrent: false,
    }));

    const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      isCurrent: true,
    }));

    const totalCells = prevDays.length + currentDays.length;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    const nextDays = Array.from({ length: remainingCells }, (_, i) => ({
      day: i + 1,
      isCurrent: false,
    }));

    return [...prevDays, ...currentDays, ...nextDays];
  };

  const handlePrevMonth = () => {
    setCalendarMonth((prev) => {
      if (prev === 0) {
        setCalendarYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCalendarMonth((prev) => {
      if (prev === 11) {
        setCalendarYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const toggleDateSelection = (day: number) => {
    const formatted = `${String(day).padStart(2, "0")} ${
      MONTH_NAMES_SHORT[calendarMonth]
    } ${calendarYear}`;

    setTempSelectedDates((prev) => {
      if (prev.includes(formatted)) {
        return prev.filter((d) => d !== formatted);
      }
      return [...prev, formatted];
    });
  };

  const handleApplyDates = () => {
    setAppliedDates(tempSelectedDates);
    setOpenDropdown(null);
    applyFilters(tempSelectedDates, appliedTypes, appliedStatuses);
  };

  // Order Type Selection
  const toggleTypeSelection = (type: string) => {
    setTempSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }
      return [...prev, type];
    });
  };

  const handleApplyTypes = () => {
    setAppliedTypes(tempSelectedTypes);
    setOpenDropdown(null);
    applyFilters(appliedDates, tempSelectedTypes, appliedStatuses);
  };

  // Order Status Selection
  const toggleStatusSelection = (status: OrderStatus) => {
    setTempSelectedStatuses((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      }
      return [...prev, status];
    });
  };

  const handleApplyStatuses = () => {
    setAppliedStatuses(tempSelectedStatuses);
    setOpenDropdown(null);
    applyFilters(appliedDates, appliedTypes, tempSelectedStatuses);
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

  const getDateFilterLabel = () => {
    if (appliedDates.length === 0) return "Date";
    if (appliedDates.length === 1) return appliedDates[0];
    return `${appliedDates.length} Dates`;
  };

  const getOrderTypeFilterLabel = () => {
    if (appliedTypes.length === 0) return "Order Type";
    if (appliedTypes.length === 1) return appliedTypes[0];
    return `${appliedTypes.length} Types`;
  };

  const getOrderStatusFilterLabel = () => {
    if (appliedStatuses.length === 0) return "Order Status";
    if (appliedStatuses.length === 1) return appliedStatuses[0];
    return `${appliedStatuses.length} Statuses`;
  };

  const calendarDays = getCalendarDays(calendarYear, calendarMonth);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
        Order Lists
      </h1>

      {/* Filter Bar */}
      <div
        ref={filterBarRef}
        className="w-full max-w-[818px] h-[70px] bg-white rounded-2xl border border-[#D5D5D5] divide-x divide-[#D5D5D5] flex items-center overflow-visible"
      >
        {/* Funnel Icon */}
        <div className="w-[68px] h-full flex items-center justify-center shrink-0">
          <FilterFunnelIcon className="w-5 h-6 shrink-0" />
        </div>

        {/* "Filter By" Label */}
        <div className="px-6 h-full flex items-center text-sm font-bold text-[#202224] select-none shrink-0 font-['Nunito_Sans',sans-serif]">
          Filter By
        </div>

        {/* Date Dropdown / Calendar Popover Trigger */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "date" ? null : "date")
            }
            className={`h-full px-6 flex items-center gap-3 text-sm font-bold transition-colors font-['Nunito_Sans',sans-serif] cursor-pointer ${
              appliedDates.length > 0
                ? "text-[#4880FF] bg-blue-50/40"
                : "text-[#202224] hover:bg-gray-50/80"
            }`}
          >
            <span>{getDateFilterLabel()}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-[#202224]" />
          </button>

          {/* Calendar Date Picker Popover */}
          {openDropdown === "date" && (
            <div className="absolute left-0 top-full mt-2 w-[310px] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 z-40 select-none">
              {/* Header: Month Year + Prev/Next Buttons */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#202224]">
                  {MONTH_NAMES[calendarMonth]} {calendarYear}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="w-7 h-7 rounded-lg bg-gray-100/90 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors active:scale-95"
                    title="Previous month"
                  >
                    <ChevronLeftIcon className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="w-7 h-7 rounded-lg bg-gray-100/90 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors active:scale-95"
                    title="Next month"
                  >
                    <ChevronRightIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Weekday Labels (S M T W T F S) */}
              <div className="grid grid-cols-7 text-center mt-5 mb-2.5">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-gray-400"
                  >
                    {day}
                  </span>
                ))}
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-y-1.5 text-center justify-items-center items-center">
                {calendarDays.map((cell, idx) => {
                  const dateStr = `${String(cell.day).padStart(2, "0")} ${
                    MONTH_NAMES_SHORT[calendarMonth]
                  } ${calendarYear}`;

                  const isSelected =
                    cell.isCurrent && tempSelectedDates.includes(dateStr);

                  if (!cell.isCurrent) {
                    return (
                      <span
                        key={idx}
                        className="text-xs font-medium text-gray-300 w-8 h-8 flex items-center justify-center cursor-default"
                      >
                        {cell.day}
                      </span>
                    );
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleDateSelection(cell.day)}
                      className={`text-xs w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
                        isSelected
                          ? "bg-[#4880FF] text-white font-bold shadow-sm shadow-[#4880FF]/30 active:scale-95"
                          : "font-semibold text-gray-700 hover:bg-gray-100 active:scale-95"
                      }`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Notice & Apply Button */}
              <div className="border-t border-gray-100 mt-4 pt-3.5">
                <p className="text-[11px] text-gray-400 font-normal">
                  *You can choose multiple date
                </p>

                <button
                  type="button"
                  onClick={handleApplyDates}
                  className="w-36 py-2.5 bg-[#4880FF] hover:bg-[#3870EE] active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-[#4880FF]/25 transition-all mx-auto block mt-3"
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Type Popover Trigger */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "type" ? null : "type")
            }
            className={`h-full px-6 flex items-center gap-3 text-sm font-bold transition-colors font-['Nunito_Sans',sans-serif] cursor-pointer ${
              appliedTypes.length > 0
                ? "text-[#4880FF] bg-blue-50/40"
                : "text-[#202224] hover:bg-gray-50/80"
            }`}
          >
            <span>{getOrderTypeFilterLabel()}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-[#202224]" />
          </button>

          {/* Select Order Type Popover */}
          {openDropdown === "type" && (
            <div className="absolute left-0 top-full mt-2 w-[480px] max-w-[calc(100vw-3rem)] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 z-40 select-none">
              {/* Header Title */}
              <h3 className="text-sm font-bold text-[#202224] mb-4">
                Select Order Type
              </h3>

              {/* 3-Column Pill Grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {ORDER_TYPE_OPTIONS.map((type) => {
                  const isSelected = tempSelectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleTypeSelection(type)}
                      className={`px-3 py-2 rounded-full text-xs transition-all text-center truncate ${
                        isSelected
                          ? "bg-[#4880FF] text-white font-bold border border-[#4880FF] shadow-sm shadow-[#4880FF]/25"
                          : "border border-gray-200 text-[#202224] font-semibold bg-white hover:bg-gray-50 hover:border-gray-300 active:scale-95"
                      }`}
                      title={type}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Notice & Apply Button */}
              <div className="border-t border-gray-100 mt-5 pt-3.5">
                <p className="text-[11px] text-gray-400 font-normal">
                  *You can choose multiple Order type
                </p>

                <button
                  type="button"
                  onClick={handleApplyTypes}
                  className="w-36 py-2.5 bg-[#4880FF] hover:bg-[#3870EE] active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-[#4880FF]/25 transition-all mx-auto block mt-3"
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Status Popover Trigger */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "status" ? null : "status")
            }
            className={`h-full px-6 flex items-center gap-3 text-sm font-bold transition-colors font-['Nunito_Sans',sans-serif] cursor-pointer ${
              appliedStatuses.length > 0
                ? "text-[#4880FF] bg-blue-50/40"
                : "text-[#202224] hover:bg-gray-50/80"
            }`}
          >
            <span>{getOrderStatusFilterLabel()}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-[#202224]" />
          </button>

          {/* Select Order Status Popover */}
          {openDropdown === "status" && (
            <div className="absolute left-0 sm:left-auto sm:right-0 md:left-0 top-full mt-2 w-[420px] max-w-[calc(100vw-3rem)] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 z-40 select-none">
              {/* Header Title */}
              <h3 className="text-sm font-bold text-[#202224] mb-4">
                Select Order Status
              </h3>

              {/* 3-Column Pill Grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {ORDER_STATUS_OPTIONS.map((status) => {
                  const isSelected = tempSelectedStatuses.includes(status);
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => toggleStatusSelection(status)}
                      className={`px-3 py-2 rounded-full text-xs transition-all text-center truncate ${
                        isSelected
                          ? "bg-[#4880FF] text-white font-bold border border-[#4880FF] shadow-sm shadow-[#4880FF]/25"
                          : "border border-gray-200 text-[#202224] font-semibold bg-white hover:bg-gray-50 hover:border-gray-300 active:scale-95"
                      }`}
                      title={status}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Notice & Apply Button */}
              <div className="border-t border-gray-100 mt-5 pt-3.5">
                <p className="text-[11px] text-gray-400 font-normal">
                  *You can choose multiple Order Status
                </p>

                <button
                  type="button"
                  onClick={handleApplyStatuses}
                  className="w-36 py-2.5 bg-[#4880FF] hover:bg-[#3870EE] active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-[#4880FF]/25 transition-all mx-auto block mt-3"
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reset Filter Button */}
        <div className="h-full flex items-center">
          <button
            type="button"
            onClick={handleResetFilters}
            className="h-full px-6 flex items-center gap-2.5 text-sm font-bold text-[#EA0234] hover:bg-red-50/50 active:scale-95 transition-all select-none cursor-pointer shrink-0 font-['Nunito_Sans',sans-serif]"
          >
            <ResetReloadIcon className="w-4 h-4 text-[#EA0234]" />
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
