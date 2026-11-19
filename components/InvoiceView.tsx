"use client";

import React, { useState } from "react";
import { PrinterIcon, PaperAirplaneIcon } from "./Icons";

interface InvoiceItem {
  id: number;
  serialNo: number;
  description: string;
  quantity: number;
  baseCost: string;
  totalCost: string;
}

const invoiceItems: InvoiceItem[] = [
  {
    id: 1,
    serialNo: 1,
    description: "Children Toy",
    quantity: 2,
    baseCost: "$20",
    totalCost: "$80",
  },
  {
    id: 2,
    serialNo: 2,
    description: "Makeup",
    quantity: 2,
    baseCost: "$50",
    totalCost: "$100",
  },
  {
    id: 3,
    serialNo: 3,
    description: "Asus Laptop",
    quantity: 5,
    baseCost: "$100",
    totalCost: "$500",
  },
  {
    id: 4,
    serialNo: 4,
    description: "Iphone X",
    quantity: 4,
    baseCost: "$1000",
    totalCost: "$4000",
  },
];

export default function InvoiceView() {
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-7">
      {/* Page Title */}
      <div>
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          Invoice
        </h1>
      </div>

      {/* Main Invoice Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs p-8 sm:p-12 w-full">
        {/* Top Details Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 items-start">
          {/* Invoice From */}
          <div>
            <h4 className="text-sm font-semibold text-[#606266] mb-1.5 font-['Nunito_Sans',sans-serif]">
              Invoice From :
            </h4>
            <p className="text-sm font-bold text-[#202224] font-['Nunito_Sans',sans-serif]">
              Virginia Walker
            </p>
            <p className="text-xs text-gray-400 mt-1 font-['Nunito_Sans',sans-serif]">
              9694 Krajcik Locks Suite 635
            </p>
          </div>

          {/* Invoice To */}
          <div>
            <h4 className="text-sm font-semibold text-[#606266] mb-1.5 font-['Nunito_Sans',sans-serif]">
              Invoice To :
            </h4>
            <p className="text-sm font-bold text-[#202224] font-['Nunito_Sans',sans-serif]">
              Austin Miller
            </p>
            <p className="text-xs text-gray-400 mt-1 font-['Nunito_Sans',sans-serif]">
              Brookview
            </p>
          </div>

          {/* Dates */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#202224] font-['Nunito_Sans',sans-serif]">
              Invoice Date : 12 Nov 2026
            </p>
            <p className="text-sm font-semibold text-[#202224] font-['Nunito_Sans',sans-serif]">
              Due Date : 25 Dec 2026
            </p>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Table Header Banner */}
            <div className="bg-[#F1F4F9] rounded-xl py-3.5 px-6 grid grid-cols-12 text-xs font-bold text-[#202224] tracking-wide font-['Nunito_Sans',sans-serif]">
              <div className="col-span-2 text-center">Serial No.</div>
              <div className="col-span-4 text-left">Description</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Base Cost</div>
              <div className="col-span-2 text-center">Total Cost</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-100">
              {invoiceItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 py-4 px-6 text-sm font-medium text-[#202224] items-center hover:bg-gray-50/50 transition-colors font-['Nunito_Sans',sans-serif]"
                >
                  <div className="col-span-2 text-center">{item.serialNo}</div>
                  <div className="col-span-4 text-left font-medium">
                    {item.description}
                  </div>
                  <div className="col-span-2 text-center">{item.quantity}</div>
                  <div className="col-span-2 text-center">{item.baseCost}</div>
                  <div className="col-span-2 text-center">{item.totalCost}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div className="flex justify-end mt-8 pr-6 sm:pr-14">
          <span className="text-sm font-bold text-[#202224] font-['Nunito_Sans',sans-serif]">
            Total &nbsp; = &nbsp; $4680
          </span>
        </div>

        {/* Action Buttons: Print & Send */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print Invoice"
            className="w-11 h-11 rounded-xl bg-[#FAFBFD] hover:bg-gray-100 text-[#202224] flex items-center justify-center transition-colors cursor-pointer active:scale-95 border border-[#D5D5D5]"
            title="Print invoice"
          >
            <PrinterIcon className="w-5 h-5 text-[#202224]" />
          </button>

          <button
            type="button"
            onClick={handleSend}
            className="w-[173px] h-[54px] bg-[#4880FF] hover:bg-[#3872F5] text-white rounded-[14px] flex items-center justify-between pl-2 pr-2 transition-all active:scale-98 shadow-sm shadow-[#4880FF]/25 cursor-pointer select-none"
          >
            <span className="flex-1 text-center font-bold text-base tracking-[-0.1px] font-['Nunito_Sans',sans-serif]">
              Send
            </span>
            <div className="w-[46px] h-[38px] rounded-[8px] bg-white/20 flex items-center justify-center shrink-0">
              <PaperAirplaneIcon className="w-[18px] h-[18px] text-white" />
            </div>
          </button>
        </div>

        {isSent && (
          <div className="flex justify-end mt-3 pr-2">
            <span className="text-xs font-semibold text-emerald-600 animate-in fade-in">
              Invoice sent successfully!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
