"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TodoView from "@/components/TodoView";

export default function TodoPage() {
  return (
    <div className="h-screen flex bg-[#F5F6FA] text-[#202224] overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header />
        <main className="p-8 space-y-7 max-w-[1400px] w-full">
          <TodoView />
        </main>
      </div>
    </div>
  );
}
