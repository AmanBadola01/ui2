"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import SalesChart from "@/components/SalesChart";
import DealsTable from "@/components/DealsTable";
import {
  UsersMetricIcon,
  OrderBoxMetricIcon,
  SalesChartMetricIcon,
  PendingClockMetricIcon,
} from "@/components/Icons";

export default function Home() {
  return (
    <div className="h-screen flex bg-[#F5F6FA] text-[#202224] overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <Header />

        {/* Dynamic Content Container */}
        <main className="p-8 space-y-7 max-w-[1400px] w-full">
          {/* Page Heading */}
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
              Dashboard
            </h1>
          </div>

          {/* Metric / Stat Cards Grid (4 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total User Card */}
            <MetricCard
              title="Total User"
              value="40,689"
              icon={<UsersMetricIcon className="w-8 h-9" />}
              iconBgColor="bg-[#ECEBFF]"
              trendPercentage="8.5%"
              trendText="Up from yesterday"
              isUp={true}
            />

            {/* Total Order Card */}
            <MetricCard
              title="Total Order"
              value="10293"
              icon={<OrderBoxMetricIcon className="w-8 h-8" />}
              iconBgColor="bg-[#FEF3D6]"
              trendPercentage="1.3%"
              trendText="Up from past week"
              isUp={true}
            />

            {/* Total Sales Card */}
            <MetricCard
              title="Total Sales"
              value="$89,000"
              icon={<SalesChartMetricIcon className="w-8 h-9 text-[#00C288]" />}
              iconBgColor="bg-[#D9F7E8]"
              trendPercentage="4.3%"
              trendText="Down from yesterday"
              isUp={false}
            />

            {/* Total Pending Card */}
            <MetricCard
              title="Total Pending"
              value="2040"
              icon={<PendingClockMetricIcon className="w-8 h-9 text-[#FF9066]" />}
              iconBgColor="bg-[#FFDED1]"
              trendPercentage="1.8%"
              trendText="Up from yesterday"
              isUp={true}
            />
          </div>

          {/* Sales Details Chart Section */}
          <SalesChart />

          {/* Deals Details Table Section */}
          <DealsTable />
        </main>
      </div>
    </div>
  );
}
