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
      if (item.name === "To-Do") {
        return pathname === "/todo" || pathname === "/to-do";
      }
      if (item.name === "Calender") {
        return pathname === "/calender" || pathname === "/calendar";
      }
      if (item.name === "Settings") {
        return pathname === "/settings";
      }
      if (item.name === "Team") {
        return pathname === "/team";
      }
      if (item.name === "Table") {
        return pathname === "/table";
      }
      if (item.name === "Invoice") {
        return pathname === "/invoice";
      }
      if (item.name === "UI Elements") {
        return pathname === "/ui-elements";
      }
      return pathname === item.href || pathname.startsWith(item.href + "/");
    }
    return activeTab ? activeTab === item.name : currentTab === item.name;
  };

  const mainNavItems: NavItem[] = [
    { name: "Dashboard", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Favorites", href: "/favorites" },
    { name: "Inbox", href: "/inbox" },
    { name: "Order Lists", href: "/order-lists" },
    { name: "Product Stock", href: "/product-stock" },
  ];

  const pagesNavItems: NavItem[] = [
    { name: "Pricing", href: "/pricing" },
    { name: "Calender", href: "/calender" },
    { name: "To-Do", href: "/todo" },
    { name: "Contact", href: "/contact" },
    { name: "Invoice", href: "/invoice" },
    { name: "UI Elements", href: "/ui-elements" },
    { name: "Team", href: "/team" },
    { name: "Table", href: "/table" },
  ];

  const bottomNavItems: NavItem[] = [
    { name: "Settings", href: "/settings" },
    { name: "Logout", href: "#", isDestructive: true },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = isItemActive(item);
    const isLink = Boolean(item.href && item.href !== "#");

    const commonClasses = `w-full h-[50px] flex items-center justify-center px-4 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-[0.98] ${
      isActive
        ? "bg-[#4880FF] text-white shadow-sm"
        : item.isDestructive
        ? "text-[#202224] hover:bg-red-50 hover:text-red-600"
        : "text-[#202224] hover:bg-gray-50 hover:text-[#4880FF]"
    }`;

    return (
      <div key={item.name} className="relative w-full h-[50px] flex items-center">
        {isActive && (
          <div className="absolute -left-4 top-0 w-1.5 h-[50px] bg-[#4880FF] rounded-r-md" />
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
    <aside className="w-60 h-screen bg-white border-r border-gray-100 flex flex-col justify-between py-5 px-4 select-none shrink-0 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
      <div>
        {/* Brand Logo */}
        <div className="px-4 mb-4 flex items-center">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#202224]">
            Dash<span className="text-[#4880FF]">Stack</span>
          </Link>
        </div>

        {/* Main Section */}
        <nav className="space-y-0.5">
          {mainNavItems.map(renderNavItem)}
        </nav>

        {/* PAGES Section */}
        <div className="mt-4 pt-2.5 border-t border-gray-100">
          <p className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">
            PAGES
          </p>
          <nav className="space-y-0.5">
            {pagesNavItems.map(renderNavItem)}
          </nav>
        </div>
      </div>

      {/* Bottom Settings & Logout Section */}
      <div className="pt-3 mt-3 border-t border-gray-100 space-y-0.5">
        {bottomNavItems.map(renderNavItem)}
      </div>
    </aside>
  );
}
