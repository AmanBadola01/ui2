"use client";

import React, { useState } from "react";
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";

interface EmailItem {
  id: number;
  sender: string;
  badge?: "Primary" | "Work" | "Friends" | "Social";
  snippet: string;
  time: string;
  starred: boolean;
  selected?: boolean;
}

const initialEmails: EmailItem[] = [
  {
    id: 1,
    sender: "Jullu Jalal",
    badge: "Primary",
    snippet: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    starred: false,
  },
  {
    id: 2,
    sender: "Minerva Barnett",
    badge: "Work",
    snippet: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    starred: false,
  },
  {
    id: 3,
    sender: "Peter Lewis",
    badge: "Friends",
    snippet: "Vacation Home Rental Success",
    time: "7:52 PM",
    starred: false,
  },
  {
    id: 4,
    sender: "Anthony Briggs",
    snippet: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    starred: true,
  },
  {
    id: 5,
    sender: "Clifford Morgan",
    badge: "Social",
    snippet: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    starred: false,
  },
  {
    id: 6,
    sender: "Cecilia Webster",
    badge: "Friends",
    snippet: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    starred: false,
  },
  {
    id: 7,
    sender: "Harvey Manning",
    snippet: "Curling Irons Are As Individual As The Women Who Use Them",
    time: "2:30 PM",
    starred: true,
  },
  {
    id: 8,
    sender: "Willie Blake",
    badge: "Primary",
    snippet: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    starred: false,
  },
  {
    id: 9,
    sender: "Minerva Barnett",
    badge: "Work",
    snippet: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    starred: false,
  },
  {
    id: 10,
    sender: "Fanny Weaver",
    snippet: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    starred: false,
  },
  {
    id: 11,
    sender: "Olga Hogan",
    badge: "Social",
    snippet: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    starred: false,
  },
  {
    id: 12,
    sender: "Lora Houston",
    badge: "Friends",
    snippet: "Vacation Home Rental Success",
    time: "7:52 PM",
    starred: false,
  },
];

const starredEmailsList: EmailItem[] = [
  {
    id: 101,
    sender: "Jullu Jalal",
    snippet: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    starred: true,
  },
  {
    id: 102,
    sender: "Minerva Barnett",
    snippet: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    starred: true,
  },
  {
    id: 103,
    sender: "Peter Lewis",
    snippet: "Vacation Home Rental Success",
    time: "7:52 PM",
    starred: true,
  },
  {
    id: 104,
    sender: "Anthony Briggs",
    snippet: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    starred: true,
  },
  {
    id: 105,
    sender: "Clifford Morgan",
    snippet: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    starred: true,
  },
  {
    id: 106,
    sender: "Cecilia Webster",
    snippet: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    starred: true,
  },
  {
    id: 107,
    sender: "Harvey Manning",
    snippet: "Curling Irons Are As Individual As The Women Who Use Them",
    time: "2:30 PM",
    starred: true,
  },
  {
    id: 108,
    sender: "Willie Blake",
    snippet: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    starred: true,
  },
  {
    id: 109,
    sender: "Minerva Barnett",
    snippet: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    starred: true,
  },
  {
    id: 110,
    sender: "Fanny Weaver",
    snippet: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    starred: true,
  },
  {
    id: 111,
    sender: "Olga Hogan",
    snippet: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    starred: true,
  },
  {
    id: 112,
    sender: "Lora Houston",
    snippet: "Vacation Home Rental Success",
    time: "7:52 PM",
    starred: true,
  },
];

const mailFolders = [
  { name: "Inbox", count: "1253", icon: "mail" },
  { name: "Starred", count: "245", icon: "star" },
  { name: "Sent", count: "24,532", icon: "sent" },
  { name: "Draft", count: "09", icon: "draft" },
  { name: "Spam", count: "14", icon: "spam" },
  { name: "Important", count: "18", icon: "important" },
  { name: "Bin", count: "9", icon: "bin" },
];

const labels = [
  { name: "Primary", borderColor: "border-[#00B69B]", checkColor: "bg-[#00B69B]" },
  { name: "Social", borderColor: "border-[#5A8CFF]", checkColor: "bg-[#5A8CFF]" },
  { name: "Work", borderColor: "border-[#FD9A56]", checkColor: "bg-[#FD9A56]" },
  { name: "Friends", borderColor: "border-[#D456FD]", checkColor: "bg-[#D456FD]" },
];

interface MessageBubble {
  id: number;
  text: string;
  time: string;
  isUser: boolean;
}

const defaultConversation: MessageBubble[] = [
  {
    id: 1,
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    time: "6.30 pm",
    isUser: false,
  },
  {
    id: 2,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    time: "6.34 pm",
    isUser: true,
  },
  {
    id: 3,
    text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
    time: "6.38 pm",
    isUser: false,
  },
];

export default function InboxView() {
  const [inboxEmails, setInboxEmails] = useState<EmailItem[]>(initialEmails);
  const [starredEmails, setStarredEmails] = useState<EmailItem[]>(starredEmailsList);
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 4, 9]);
  const [selectedMessage, setSelectedMessage] = useState<EmailItem | null>(null);
  const [conversation, setConversation] = useState<MessageBubble[]>(defaultConversation);
  const [replyText, setReplyText] = useState("");

  const isStarredTab = activeFolder === "Starred";
  const currentEmails = isStarredTab ? starredEmails : inboxEmails;

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}.${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "pm" : "am"}`;
    const newBubble: MessageBubble = {
      id: Date.now(),
      text: replyText.trim(),
      time: timeStr,
      isUser: true,
    };
    setConversation((prev) => [...prev, newBubble]);
    setReplyText("");
  };

  const toggleStar = (id: number) => {
    if (isStarredTab) {
      setStarredEmails((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, starred: !item.starred } : item
        )
      );
    } else {
      setInboxEmails((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, starred: !item.starred } : item
        )
      );
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredEmails = currentEmails.filter((email) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      email.sender.toLowerCase().includes(q) ||
      email.snippet.toLowerCase().includes(q)
    );
  });

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "Primary":
        return "bg-[#00B69B] text-white";
      case "Work":
        return "bg-[#FD9A56] text-white";
      case "Friends":
      case "Friend":
        return "bg-[#D456FD] text-white";
      case "Social":
        return "bg-[#5A8CFF] text-white";
      default:
        return "";
    }
  };

  const renderFolderIcon = (type: string) => {
    switch (type) {
      case "mail":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "star":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case "sent":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case "draft":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case "spam":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case "important":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        );
      case "bin":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-7">
      {/* Page Heading */}
      <div>
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          Inbox
        </h1>
      </div>

      {/* Main Inbox Panels */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Side: Mailbox Folders & Labels */}
        <aside className="w-full lg:w-64 bg-white rounded-2xl border border-gray-100 shadow-xs p-5 shrink-0">
          {/* Compose Button */}
          <button
            type="button"
            className="w-full py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-[#4880FF]/25 transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>+ Compose</span>
          </button>

          {/* My Email Folders */}
          <div className="mt-7">
            <h3 className="text-sm font-bold text-[#202224] tracking-[-0.05px] mb-2.5 px-2">
              My Email
            </h3>
            <nav className="space-y-1">
              {mailFolders.map((folder) => {
                const isActive = activeFolder === folder.name;
                return (
                  <button
                    key={folder.name}
                    type="button"
                    onClick={() => setActiveFolder(folder.name)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[14px] font-semibold leading-none tracking-[-0.05px] font-['Nunito_Sans',sans-serif] transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#EAF0FE] text-[#4880FF]"
                        : "text-[#202224] hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? "text-[#4880FF]" : "text-[#202224]"}>
                        {renderFolderIcon(folder.icon)}
                      </span>
                      <span>{folder.name}</span>
                    </div>
                    <span
                      className={`text-[14px] font-semibold leading-none tracking-[-0.05px] ${
                        isActive ? "text-[#4880FF]" : "text-[#797A7C]"
                      }`}
                    >
                      {folder.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Labels Section */}
          <div className="mt-7 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-[#202224] tracking-[-0.05px] mb-3 px-2">
              Label
            </h3>
            <div className="space-y-3 px-2">
              {labels.map((lbl) => (
                <div key={lbl.name} className="flex items-center gap-3 cursor-pointer group py-0.5">
                  <div
                    className={`w-4 h-4 rounded-[3px] border-2 ${lbl.borderColor} flex items-center justify-center transition-transform group-hover:scale-110 shrink-0`}
                  />
                  <span className="text-[14px] font-semibold text-[#202224] leading-none tracking-[-0.05px] font-['Nunito_Sans',sans-serif] group-hover:text-[#4880FF] transition-colors">
                    {lbl.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Create New Label */}
            <button
              type="button"
              className="text-[14px] font-semibold text-[#797A7C] hover:text-[#4880FF] flex items-center gap-2 mt-5 px-2 transition-colors cursor-pointer tracking-[-0.05px] font-['Nunito_Sans',sans-serif]"
            >
              <span className="text-base font-bold leading-none">+</span>
              <span>Create New Label</span>
            </button>
          </div>
        </aside>

        {/* Right Side: Conversation Detail or Email List Table */}
        {selectedMessage ? (
          <section className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between overflow-hidden min-w-0 w-full min-h-[580px]">
            {/* Conversation Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="p-1.5 -ml-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  title="Back to email list"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <h3 className="text-base font-bold text-[#202224]">
                  {selectedMessage.sender}
                </h3>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${getBadgeStyle(
                    selectedMessage.badge || "Friends"
                  )}`}
                >
                  {selectedMessage.badge || "Friends"}
                </span>
              </div>

              {/* Action Icons Segmented Box (131px x 40px) */}
              <div className="w-[131px] h-[40px] rounded-lg border border-gray-200/90 bg-white flex items-center divide-x divide-gray-200/90 overflow-hidden shadow-2xs shrink-0">
                <button
                  type="button"
                  title="Print"
                  onClick={() => window.print()}
                  className="flex-1 h-full flex items-center justify-center text-[#202224] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                >
                  <svg className="w-[18px] h-[16px] text-[#202224]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 14h12v7H6z" />
                  </svg>
                </button>

                <button
                  type="button"
                  title="Star"
                  onClick={() => toggleStar(selectedMessage.id)}
                  className="flex-1 h-full flex items-center justify-center text-[#202224] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill={selectedMessage.starred ? "#FFB800" : "none"}
                    stroke={selectedMessage.starred ? "#FFB800" : "currentColor"}
                    strokeWidth={1.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  title="Delete"
                  onClick={() => setSelectedMessage(null)}
                  className="flex-1 h-full flex items-center justify-center text-[#202224] hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all cursor-pointer"
                >
                  <svg className="w-[13px] h-4" viewBox="0 0 14 18" fill="currentColor">
                    <path d="M4.5 1a1 1 0 011-1h3a1 1 0 011 1v1h-5V1z" />
                    <rect x="0.5" y="2.5" width="13" height="2" rx="0.75" />
                    <path d="M1.5 5.5l.9 10.3A2 2 0 004.4 17.5h5.2a2 2 0 002-1.7l.9-10.3H1.5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Conversation Stream */}
            <div className="p-8 space-y-6 overflow-y-auto max-h-[540px]">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-3.5 ${
                    msg.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Left Avatar for incoming messages */}
                  {!msg.isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#D1D5DB] shrink-0 mb-1" />
                  )}

                  {/* Message Bubble (Sized to fit written content, matching 420px Figma spec) */}
                  <div
                    className={`p-5 rounded-2xl relative w-fit max-w-[420px] text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      msg.isUser
                        ? "bg-[#4880FF] text-white rounded-br-xs"
                        : "bg-[#F5F6FA] text-[#202224] rounded-bl-xs"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-2 mt-3 text-[11px] font-medium ${
                        msg.isUser ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      <span>{msg.time}</span>
                      <button
                        type="button"
                        title="More options"
                        className={`p-0.5 flex items-center justify-center shrink-0 cursor-pointer opacity-100 transition-opacity ${
                          msg.isUser
                            ? "text-white hover:opacity-80"
                            : "text-[#202224]/50 hover:text-[#202224]"
                        }`}
                      >
                        <svg
                          className="w-[3px] h-[15px]"
                          viewBox="0 0 3 15"
                          fill="currentColor"
                        >
                          <circle cx="1.5" cy="1.5" r="1.5" />
                          <circle cx="1.5" cy="7.5" r="1.5" />
                          <circle cx="1.5" cy="13.5" r="1.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Write Message Toolbar */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
              <button
                type="button"
                className="text-[#9D9D9D] hover:text-[#202224] transition-colors p-0 flex items-center justify-center shrink-0 cursor-pointer"
                title="Voice record"
              >
                <svg
                  className="w-[13px] h-[21px]"
                  viewBox="0 0 13 21"
                  fill="none"
                >
                  <rect x="3.5" y="1" width="6" height="10" rx="3" fill="currentColor" />
                  <path
                    d="M1 8.5v2a5.5 5.5 0 0011 0v-2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <line
                    x1="6.5"
                    y1="16"
                    x2="6.5"
                    y2="19.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <line
                    x1="3"
                    y1="19.5"
                    x2="10"
                    y2="19.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendReply();
                }}
                placeholder="Write massage"
                className="flex-1 bg-transparent border-0 focus:outline-none text-[14px] text-[#202224] placeholder-gray-400 px-3 font-['Nunito_Sans',sans-serif]"
              />

              <div className="flex items-center gap-7">
                <button
                  type="button"
                  className="text-[#9D9D9D] hover:text-[#202224] transition-colors p-0 flex items-center justify-center shrink-0 cursor-pointer"
                  title="Attach file"
                >
                  <svg
                    className="w-[16px] h-[21px]"
                    viewBox="0 0 16 21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.6 4.2L3.4 10.4a3.8 3.8 0 005.4 5.4l6.2-6.2a2.4 2.4 0 00-3.4-3.4L5.4 12.4a1 1 0 001.4 1.4l5.4-5.4" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="text-[#9D9D9D] hover:text-[#202224] transition-colors p-0 flex items-center justify-center shrink-0 cursor-pointer"
                  title="Attach image"
                >
                  <svg
                    className="w-[14px] h-[21px]"
                    viewBox="0 0 14 21"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 1h6.5l4.5 4.5V19a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2zm6.5 0v4a1 1 0 001 1H13"
                      fill="currentColor"
                    />
                    <circle cx="4.5" cy="10" r="1.5" fill="white" />
                    <path
                      d="M2 18l3-3.8 2.2 2.2 3.2-4 2.6 5.6H2z"
                      fill="white"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleSendReply}
                  className="w-[96px] h-[36px] bg-[#4880FF] hover:bg-blue-600 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 shrink-0 cursor-pointer"
                >
                  <span>Send</span>
                  <svg className="w-4 h-4 -rotate-45" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between overflow-hidden min-w-0 w-full">
            {/* Top Search & Actions Toolbar */}
            <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mail"
                  className="w-full bg-[#F5F6FA] border border-gray-200/70 rounded-full pl-10 pr-4 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all"
                />
              </div>

              {/* Top Action Icons Segmented Box (131px x 40px) */}
              <div className="w-[131px] h-[40px] rounded-lg border border-gray-200/90 bg-white flex items-center divide-x divide-gray-200/90 overflow-hidden shadow-2xs shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  title="Download"
                  className="flex-1 h-full flex items-center justify-center text-[#202224] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 2a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2H3zm0 2h14v7.8h-3.3a1.5 1.5 0 01-1.06-.44L11.58 10.3a1.5 1.5 0 00-2.12 0L8.4 11.36a1.5 1.5 0 01-1.06.44H3V4zm6 1a1 1 0 012 0v2.59l1.3-1.3a1 1 0 111.4 1.42l-3 3a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.42L9 7.59V5z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  title="Info"
                  className="flex-1 h-full flex items-center justify-center text-[#202224] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1a9 9 0 100 18 9 9 0 000-18zm0 4.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM8.75 9.5a1 1 0 011-1h.5a1 1 0 011 1v4.5a1 1 0 11-2 0v-4.5h-.5z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  title="Delete"
                  className="flex-1 h-full flex items-center justify-center text-[#202224] hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all cursor-pointer"
                >
                  <svg className="w-[13px] h-4" viewBox="0 0 14 18" fill="currentColor">
                    <path d="M4.5 1a1 1 0 011-1h3a1 1 0 011 1v1h-5V1z" />
                    <rect x="0.5" y="2.5" width="13" height="2" rx="0.75" />
                    <path d="M1.5 5.5l.9 10.3A2 2 0 004.4 17.5h5.2a2 2 0 002-1.7l.9-10.3H1.5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mail Items Rows */}
            <div className="divide-y divide-gray-100">
              {filteredEmails.map((email) => {
                const isSelected = selectedIds.includes(email.id);
                return (
                  <div
                    key={email.id}
                    onClick={() => setSelectedMessage(email)}
                    className={`flex items-center gap-3.5 px-6 py-3.5 transition-colors cursor-pointer group ${
                      isSelected
                        ? "bg-[#F4F7FF] hover:bg-[#EBF1FE]"
                        : "bg-white hover:bg-[#F9FAFC]"
                    }`}
                  >
                    {/* Select Checkbox (Black with White Tick when checked) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(email.id);
                      }}
                      className={`w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#202224] border-[#202224]"
                          : "bg-white border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.5 6.2l2.3 2.3 4.7-4.7"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Star Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      className="p-0.5 text-gray-300 hover:text-amber-400 transition-colors"
                    >
                      {email.starred ? (
                        <svg className="w-4 h-4 text-[#FFB800] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )}
                    </button>

                    {/* Sender Name */}
                    <span className="w-32 sm:w-36 text-xs sm:text-sm font-bold text-[#202224] shrink-0 truncate">
                      {email.sender}
                    </span>

                    {/* Category Badge (shown in Inbox, hidden in Starred tab) */}
                    {!isStarredTab && email.badge && (
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded shrink-0 ${getBadgeStyle(
                          email.badge
                        )}`}
                      >
                        {email.badge}
                      </span>
                    )}

                    {/* Subject & Preview Snippet */}
                    <p className="text-xs text-gray-600 truncate flex-1 min-w-0">
                      {email.snippet}
                    </p>

                    {/* Timestamp */}
                    <span className="text-xs text-gray-400 shrink-0 font-medium whitespace-nowrap ml-2">
                      {email.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 text-xs text-gray-500">
              <span>Showing 1-12 of 1,253</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="p-1 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
                  title="Previous"
                >
                  <ChevronLeftIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
                  title="Next"
                >
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
