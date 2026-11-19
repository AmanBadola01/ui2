"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export interface CalendarEvent {
  id: number;
  title: string;
  type: "purple" | "pink" | "orange" | "blue";
  dateStr: string; // "YYYY-MM-DD"
  span?: number;
  time: string;
  location: string;
  image?: string;
  attendeesCount: string;
  avatarStack: string[];
  agency?: string;
}

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Design Conference",
    type: "purple",
    dateStr: "2026-10-09",
    span: 2,
    time: "Today 07:19 AM",
    location: "56 Davion Mission Suite 157 Meaghanberg",
    attendeesCount: "(15+)",
    avatarStack: ["/attendee1.png", "/attendee2.png", "/attendee3.png"],
    image: "/event_conf.png",
    agency: "Zillul Design Agency",
  },
  {
    id: 2,
    title: "Weekend Festival",
    type: "pink",
    dateStr: "2026-10-16",
    time: "16 October 2026 at 5.00 PM",
    location: "853 Moore Flats Suite 158 Sweden",
    image: "/person2.png",
    attendeesCount: "(20+)",
    avatarStack: ["/person4.png", "/person5.png", "/person6.png"],
    agency: "Festival Group",
  },
  {
    id: 3,
    title: "Glastonbury Festival",
    type: "orange",
    dateStr: "2026-10-20",
    span: 3,
    time: "20-22 October 2026 at 8.00 PM",
    location: "646 Walter Road Apt. 571 Turks and Caicos Islands",
    image: "/person4.png",
    attendeesCount: "(14+)",
    avatarStack: ["/person1.png", "/person5.png", "/person3.png"],
    agency: "Music & Arts",
  },
  {
    id: 4,
    title: "Ultra Europe 2026",
    type: "blue",
    dateStr: "2026-10-25",
    time: "25 October 2026 at 10.00 PM",
    location: "506 Satterfield Tunnel Apt. 963 San Marino",
    image: "/person6.png",
    attendeesCount: "(42+)",
    avatarStack: ["/person2.png", "/person4.png", "/person1.png"],
    agency: "Ultra Live",
  },
];

interface CalendarCell {
  day: number;
  dateStr: string;
  isCurrentMonth: boolean;
  event?: CalendarEvent;
}

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

const formatYYYYMMDD = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const getMonthCalendarCells = (
  year: number,
  month: number,
  eventList: CalendarEvent[]
): CalendarCell[] => {
  const firstDay = new Date(year, month, 1);
  // (getDay() + 6) % 7 gives Monday=0, Tuesday=1, ..., Sunday=6
  const startDayOffset = (firstDay.getDay() + 6) % 7;

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  // Trailing days from previous month
  for (let i = startDayOffset - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    const dateStr = formatYYYYMMDD(date);
    const event = eventList.find((e) => e.dateStr === dateStr);
    cells.push({ day, dateStr, isCurrentMonth: false, event });
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = formatYYYYMMDD(date);
    const event = eventList.find((e) => e.dateStr === dateStr);
    cells.push({ day, dateStr, isCurrentMonth: true, event });
  }

  // Leading days from next month to complete 42 cells (6 rows x 7 cols)
  let nextDay = 1;
  while (cells.length < 42) {
    const date = new Date(year, month + 1, nextDay);
    const dateStr = formatYYYYMMDD(date);
    const event = eventList.find((e) => e.dateStr === dateStr);
    cells.push({ day: nextDay, dateStr, isCurrentMonth: false, event });
    nextDay++;
  }

  return cells;
};

export default function CalendarView() {
  const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Month");
  // Default to October 2026 to preserve the initial design view
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 9, 1));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventsList, setEventsList] = useState<CalendarEvent[]>(initialEvents);

  // Form State for Add New Event
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("11-09-2026");
  const [contactNumber, setContactNumber] = useState("");
  const [eventTime, setEventTime] = useState("12:34 BDT");
  const [eventAddress, setEventAddress] = useState("");
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const currentMonthLabel = `${MONTH_NAMES[month]} ${year}`;

  // Dynamically compute the 42 cells for the active month and year
  const calendarCells = useMemo(
    () => getMonthCalendarCells(year, month, eventsList),
    [year, month, eventsList]
  );

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedIdx(null);
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedIdx(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedIdx(null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const title = eventName.trim() || "New Event";

    // Parse date entered by user (handles DD-MM-YYYY or YYYY-MM-DD)
    let parsedDateStr = formatYYYYMMDD(new Date());
    if (eventDate.includes("-")) {
      const parts = eventDate.split("-");
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          parsedDateStr = `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
        } else {
          // DD-MM-YYYY
          parsedDateStr = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
        }
      }
    }

    const newEvent: CalendarEvent = {
      id: Date.now(),
      title,
      type: "blue",
      dateStr: parsedDateStr,
      time: eventTime || "Today",
      location: eventAddress || "New Location",
      image: coverPhotoPreview || "/event_conf.png",
      attendeesCount: "(1+)",
      avatarStack: ["/person1.png"],
      agency: "General",
    };

    setEventsList((prev) => [newEvent, ...prev]);

    // Automatically navigate to the month of the added event
    const [y, m] = parsedDateStr.split("-").map(Number);
    setCurrentDate(new Date(y, m - 1, 1));

    setIsAddingEvent(false);
    // Reset form
    setEventName("");
    setEventDate("11-09-2026");
    setContactNumber("");
    setEventTime("12:34 BDT");
    setEventAddress("");
    setCoverPhotoPreview(null);
  };

  // Helper to resolve an event (either defined on this cell or spanned from an earlier cell in the same row)
  const getCellEvent = (idx: number) => {
    const cell = calendarCells[idx];
    if (!cell) return null;
    if (cell.event) return { event: cell.event, originIdx: idx };

    const row = Math.floor(idx / 7);
    for (let c = 0; c < idx % 7; c++) {
      const prevIdx = row * 7 + c;
      const prevCell = calendarCells[prevIdx];
      if (prevCell?.event?.span && c + prevCell.event.span > (idx % 7)) {
        return { event: prevCell.event, originIdx: prevIdx };
      }
    }
    return null;
  };

  const activeEventInfo = selectedIdx !== null ? getCellEvent(selectedIdx) : null;
  const activeEventData = activeEventInfo
    ? eventsList.find((e) => e.title === activeEventInfo.event.title) || eventsList[0]
    : null;

  // Close when clicking anywhere outside the popover and its trigger
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-calendar-event-trigger]")) {
          setSelectedIdx(null);
        }
      }
    };

    if (selectedIdx !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedIdx]);

  const weekdays = ["MON", "TUE", "WED", "THE", "FRI", "SAT", "SUN"];

  const getEventBadge = (event: NonNullable<CalendarCell["event"]>) => {
    switch (event.type) {
      case "purple":
        return "bg-[#E6DBFD] text-[#6941C6] border-l-2 border-[#7F56D9]";
      case "pink":
        return "bg-[#FDE2EC] text-[#E31B54] border-l-2 border-[#F63D68]";
      case "orange":
        return "bg-[#FEE4D2] text-[#B54708] border-l-2 border-[#F79009]";
      case "blue":
        return "bg-[#DDE9FF] text-[#2970FF] border-l-2 border-[#4880FF]";
    }
  };

  if (isAddingEvent) {
    return (
      <div className="space-y-7">
        {/* Page Title with Back Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAddingEvent(false)}
            className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-[#4880FF] hover:bg-white transition-colors cursor-pointer"
            title="Back to Calender"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
            Add New Event
          </h1>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs px-8 sm:px-14 py-12 max-w-[980px] w-full mx-auto">
          <form onSubmit={handleAddEvent}>
            {/* Cover Photo Upload */}
            <div className="flex flex-col items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full bg-[#ECEEF2] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity relative group cursor-pointer"
                title="Click to upload cover photo"
              >
                {coverPhotoPreview ? (
                  <Image
                    src={coverPhotoPreview}
                    alt="Uploaded cover"
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
                Upload Cover Photo
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-10">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter event name"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Date
                  </label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="11-09-2026"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter your Contact Number"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Time
                  </label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="12:34 BDT"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Address
                  </label>
                  <input
                    type="text"
                    value={eventAddress}
                    onChange={(e) => setEventAddress(e.target.value)}
                    placeholder="Address"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                className="w-48 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-[#4880FF]/25 transition-all active:scale-98 cursor-pointer"
              >
                Add Now
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Page Title */}
      <div>
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          Calender
        </h1>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Side: Upcoming Events */}
        <aside className="w-full lg:w-72 bg-white rounded-2xl border border-gray-100 shadow-xs p-5 shrink-0 flex flex-col justify-between">
          <div>
            {/* Add New Event Button */}
            <button
              type="button"
              onClick={() => setIsAddingEvent(true)}
              className="w-full py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-[#4880FF]/25 transition-all active:scale-98 cursor-pointer"
            >
              + Add New Event
            </button>

            {/* Section Header */}
            <h3 className="text-sm font-bold text-[#202224] mt-6 mb-4">
              You are going to
            </h3>

            {/* Events List */}
            <div className="space-y-4">
              {eventsList.map((evt) => {
                const isMatchingMonth = evt.dateStr?.startsWith(
                  `${year}-${String(month + 1).padStart(2, "0")}`
                );
                const matchingIdx = calendarCells.findIndex(
                  (c) => c.dateStr === evt.dateStr
                );

                return (
                  <div
                    key={evt.id}
                    data-calendar-event-trigger="true"
                    className="flex gap-3 items-start group cursor-pointer hover:bg-gray-50/80 p-1.5 -mx-1.5 rounded-xl transition-colors"
                    onClick={() => {
                      if (!isMatchingMonth && evt.dateStr) {
                        const [y, m] = evt.dateStr.split("-").map(Number);
                        setCurrentDate(new Date(y, m - 1, 1));
                      } else if (matchingIdx !== -1) {
                        setSelectedIdx((prev) =>
                          prev === matchingIdx ? null : matchingIdx
                        );
                      }
                    }}
                  >
                    {/* Event Thumbnail */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 relative mt-0.5 shadow-2xs">
                      {evt.image ? (
                        <Image
                          src={evt.image}
                          alt={evt.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#D1D5DB]" />
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#202224] leading-tight truncate">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                        {evt.time}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-tight truncate">
                        {evt.location}
                      </p>

                      {/* Attendees Avatar Stack */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex -space-x-1.5">
                          {evt.avatarStack.map((av, idx) => (
                            <div
                              key={idx}
                              className="w-5 h-5 rounded-full ring-1 ring-white overflow-hidden relative shadow-2xs"
                            >
                              <Image
                                src={av}
                                alt="Attendee"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-[#4880FF] bg-[#E8F0FE] rounded-full px-1.5 py-0.5">
                          {evt.attendeesCount}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* See More Action */}
          <button
            type="button"
            className="w-full py-2.5 mt-6 bg-[#EAF0FE] text-[#4880FF] hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors text-center cursor-pointer"
          >
            See More
          </button>
        </aside>

        {/* Right Side: Interactive Calendar Grid */}
        <section className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-xs p-6 overflow-hidden min-w-0 w-full">
          {/* Top Calendar Toolbar */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100 gap-4">
            {/* Today */}
            <button
              type="button"
              onClick={handleToday}
              className="text-xs font-bold text-gray-400 hover:text-[#4880FF] transition-colors cursor-pointer"
            >
              Today
            </button>

            {/* Month & Navigator */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <span className="text-base font-bold text-[#202224] tracking-tight min-w-[130px] text-center font-['Nunito_Sans',sans-serif]">
                {currentMonthLabel}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                title="Next Month"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center rounded-lg border border-gray-200/80 p-0.5 text-xs font-semibold">
              {(["Day", "Week", "Month"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`px-3.5 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === mode
                      ? "bg-[#4880FF] text-white shadow-xs"
                      : "text-gray-500 hover:text-[#202224]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Weekday Banner Headers */}
          <div className="grid grid-cols-7 bg-[#F5F6FA] rounded-t-xl mt-4">
            {weekdays.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-bold text-gray-600 tracking-wider font-['Nunito_Sans',sans-serif]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 7-Column Month Grid */}
          <div className="grid grid-cols-7 border-l border-t border-gray-100 relative">
            {calendarCells.map((cell, idx) => {
              const hasDiagonalHatch = !cell.isCurrentMonth;
              const cellEventInfo = getCellEvent(idx);
              const isEventDate = !!cellEventInfo;

              return (
                <div
                  key={`${cell.dateStr}-${idx}`}
                  data-calendar-event-trigger={isEventDate ? "true" : undefined}
                  onClick={(e) => {
                    if (isEventDate) {
                      e.stopPropagation();
                      setSelectedIdx((prev) => (prev === idx ? null : idx));
                    }
                  }}
                  className={`min-h-[92px] sm:min-h-[105px] p-2 border-r border-b border-gray-100 relative flex flex-col justify-between ${
                    hasDiagonalHatch
                      ? "bg-[repeating-linear-gradient(-45deg,#fcfcfd,#fcfcfd_6px,#f1f3f7_6px,#f1f3f7_7px)]"
                      : "bg-white hover:bg-gray-50/50 transition-colors"
                  } ${isEventDate ? "cursor-pointer" : ""}`}
                >
                  {/* Day Number */}
                  <div className="flex justify-end">
                    <span
                      className={`text-xs font-bold ${
                        cell.isCurrentMonth ? "text-[#202224]" : "text-gray-300"
                      }`}
                    >
                      {cell.day}
                    </span>
                  </div>

                  {/* Event Badge (if any) */}
                  {cell.event && (
                    <div
                      className="mt-1 z-10 cursor-pointer"
                      data-calendar-event-trigger="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIdx((prev) => (prev === idx ? null : idx));
                      }}
                    >
                      <div
                        className={`text-[10px] font-semibold py-1 px-2 rounded-r-md truncate shadow-2xs transition-transform hover:scale-[1.02] ${getEventBadge(
                          cell.event
                        )} ${cell.event.span && cell.event.span > 1 ? "w-[180%] z-20 relative" : "w-full"}`}
                      >
                        {cell.event.title}
                      </div>
                    </div>
                  )}

                  <div />
                </div>
              );
            })}

            {/* Event Detail Popover Card */}
            {activeEventInfo && activeEventData && (() => {
              const originCol = activeEventInfo.originIdx % 7;
              const originRow = Math.floor(activeEventInfo.originIdx / 7);
              const span = activeEventInfo.event.span || 1;
              const isRightSide = originCol >= 4;

              const leftPercent = isRightSide
                ? Math.max(2, originCol * (100 / 7) - 34)
                : Math.min(((originCol + span) / 7) * 100, 66.5);

              const topPercent = Math.max(2, Math.min(originRow * 16.67 - 15, 48));

              return (
                <div
                  ref={popoverRef}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                  className="absolute z-30 w-[232px] bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-gray-100/90 p-3.5 transition-all duration-200 pointer-events-auto"
                >
                  {/* Triangle Pointer Arrow */}
                  {isRightSide ? (
                    <div className="absolute -right-2 top-[39%] -translate-y-1/2 w-0 h-0 border-y-[7px] border-y-transparent border-l-[8px] border-l-white filter drop-shadow-[2px_0_1px_rgba(0,0,0,0.06)] pointer-events-none" />
                  ) : (
                    <div className="absolute -left-2 top-[39%] -translate-y-1/2 w-0 h-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-white filter drop-shadow-[-2px_0_1px_rgba(0,0,0,0.06)] pointer-events-none" />
                  )}

                  {/* Event Photo */}
                  <div className="w-full h-[126px] rounded-xl overflow-hidden relative shadow-2xs bg-[#F4E8D8]">
                    <Image
                      src={activeEventData.image || "/event_conf.png"}
                      alt={activeEventInfo.event.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Event Details */}
                  <div className="mt-3">
                    <h4 className="text-[15px] font-bold text-[#202224] leading-tight font-['Nunito_Sans',sans-serif]">
                      {activeEventInfo.event.title}
                    </h4>
                    <p className="text-[12px] font-medium text-[#717579] mt-1 leading-tight">
                      {activeEventData.agency || "Zillul Design Agency"}
                    </p>
                    <p className="text-[12px] text-[#9A9EA5] mt-1.5 leading-tight">
                      {activeEventData.time}
                    </p>
                    <p className="text-[12px] text-[#9A9EA5] mt-1 leading-tight truncate">
                      {activeEventData.location}
                    </p>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-gray-100/90 my-3.5" />

                  {/* Attendees Avatar Row */}
                  <div className="flex items-center gap-2">
                    {activeEventData.avatarStack?.slice(0, 3).map((av, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 rounded-full overflow-hidden relative shadow-2xs"
                      >
                        <Image
                          src={av}
                          alt={`Attendee ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border border-[#4880FF] text-[#4880FF] text-[11px] font-bold flex items-center justify-center bg-white shadow-2xs">
                      {activeEventData.attendeesCount?.replace(/[()]/g, "") || "15+"}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      </div>
    </div>
  );
}
