"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href?: string;
  isDestructive?: boolean;
}

interface SidebarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({ currentTab, onTabChange }: SidebarProps = {}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(currentTab);

  const handleTabClick = (name: string) => {
    setActiveTab(name);
    if (onTabChange) onTabChange(name);
  };

  const isItemActive = (item: NavItem) => {
    if (item.href && item.href !== "#") {
      if (item.href === "/") {
        return pathname === "/";
      }
      return pathname === item.href || pathname.startsWith(item.href + "/");
    }
    return activeTab ? activeTab === item.name : currentTab === item.name;
  };

  const mainNavItems: NavItem[] = [
    { name: "Dashboard", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Favorites", href: "/favorites" },
    { name: "Inbox", href: "#" },
    { name: "Order Lists", href: "/order-lists" },
    { name: "Product Stock", href: "#" },
  ];

  const pagesNavItems: NavItem[] = [
    { name: "Pricing", href: "#" },
    { name: "Calender", href: "#" },
    { name: "To-Do", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Invoice", href: "#" },
    { name: "UI Elements", href: "#" },
    { name: "Team", href: "#" },
    { name: "Table", href: "#" },
  ];

  const bottomNavItems: NavItem[] = [
    { name: "Settings", href: "#" },
    { name: "Logout", href: "#", isDestructive: true },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = isItemActive(item);
    const isLink = Boolean(item.href && item.href !== "#");

    const commonClasses = `w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-[0.98] ${
      isActive
        ? "bg-[#4880FF] text-white shadow-sm"
        : item.isDestructive
        ? "text-[#202224] hover:bg-red-50 hover:text-red-600"
        : "text-[#202224] hover:bg-gray-50 hover:text-[#4880FF]"
    }`;

    return (
      <div key={item.name} className="relative">
        {isActive && (
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#4880FF] rounded-r-md" />
        )}
        {isLink ? (
          <Link href={item.href!} className={commonClasses}>
            <span>{item.name}</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => handleTabClick(item.name)}
            className={commonClasses}
          >
            <span>{item.name}</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 select-none shrink-0">
      <div>
        {/* Brand Logo */}
        <div className="px-4 mb-7 flex items-center">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#202224]">
            Dash<span className="text-[#4880FF]">Stack</span>
          </Link>
        </div>

        {/* Main Section */}
        <nav className="space-y-1">
          {mainNavItems.map(renderNavItem)}
        </nav>

        {/* PAGES Section */}
        <div className="mt-6 pt-3 border-t border-gray-100">
          <p className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">
            PAGES
          </p>
          <nav className="space-y-1">
            {pagesNavItems.map(renderNavItem)}
          </nav>
        </div>
      </div>

      {/* Bottom Settings & Logout Section */}
      <div className="pt-4 border-t border-gray-100 space-y-1">
        {bottomNavItems.map(renderNavItem)}
      </div>
    </aside>
  );
}
