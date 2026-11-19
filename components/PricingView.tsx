"use client";

import React, { useState } from "react";

interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  features: {
    title: string;
    included: boolean;
  }[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "Monthly Charge",
    price: "$14.99",
    features: [
      { title: "Free Setup", included: true },
      { title: "Bandwidth Limit 10 GB", included: true },
      { title: "20 User Connection", included: true },
      { title: "Analytics Report", included: false },
      { title: "Public API Access", included: false },
      { title: "Plugins Intregation", included: false },
      { title: "Custom Content Management", included: false },
    ],
    isPopular: false,
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Monthly Charge",
    price: "$49.99",
    features: [
      { title: "Free Setup", included: true },
      { title: "Bandwidth Limit 10 GB", included: true },
      { title: "20 User Connection", included: true },
      { title: "Analytics Report", included: true },
      { title: "Public API Access", included: true },
      { title: "Plugins Intregation", included: false },
      { title: "Custom Content Management", included: false },
    ],
    isPopular: false,
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Monthly Charge",
    price: "$89.99",
    features: [
      { title: "Free Setup", included: true },
      { title: "Bandwidth Limit 10 GB", included: true },
      { title: "20 User Connection", included: true },
      { title: "Analytics Report", included: true },
      { title: "Public API Access", included: true },
      { title: "Plugins Intregation", included: true },
      { title: "Custom Content Management", included: true },
    ],
    isPopular: true,
  },
];

function TopographyPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-[0.25]"
      viewBox="0 0 350 640"
      fill="none"
      stroke="#CBD5E1"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {/* Top right contour loops */}
      <path d="M290,70 C330,60 370,100 360,140 C350,180 300,190 260,170 C220,150 210,100 240,75 C260,60 275,70 290,70 Z" />
      <path d="M305,50 C355,35 400,90 385,150 C370,210 290,220 240,195 C190,170 180,100 220,55 C250,30 280,50 305,50 Z" />
      <path d="M320,30 C380,10 430,80 410,160 C390,240 280,250 220,220 C160,190 150,90 200,35 C240,0 285,30 320,30 Z" />

      {/* Flowing horizontal terrain curves */}
      <path d="M-30,110 C50,70 120,160 210,120 C280,85 320,130 380,95" />
      <path d="M-20,190 C60,150 110,230 190,180 C270,140 310,210 390,160" />
      <path d="M-10,270 C70,220 130,300 210,250 C290,200 330,270 400,220" />
      <path d="M-30,350 C40,310 100,390 180,340 C260,290 310,360 390,310" />
      <path d="M-20,430 C60,390 120,470 200,420 C280,370 320,440 400,390" />

      {/* Bottom left contour loops */}
      <path d="M70,490 C100,470 140,490 150,520 C160,550 130,580 90,580 C50,580 30,540 45,510 C55,490 65,490 70,490 Z" />
      <path d="M80,460 C130,430 180,470 190,520 C200,570 160,610 100,610 C40,610 10,550 25,500 C40,460 65,460 80,460 Z" />
      <path d="M90,430 C150,390 210,440 220,510 C230,580 180,635 110,635 C30,635 -10,560 5,490 C20,430 55,430 90,430 Z" />
    </svg>
  );
}

export default function PricingView() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          Pricing
        </h1>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-[1240px] w-full">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-[32px] border transition-all duration-200 overflow-hidden py-10 px-8 flex flex-col items-center text-center ${
              plan.isPopular
                ? "border-blue-100/60 shadow-md shadow-blue-500/5"
                : "border-gray-100/90 shadow-xs"
            }`}
          >
            {/* Topography Watermark Background */}
            <TopographyPattern />

            {/* Plan Header */}
            <div className="relative z-10 w-full flex flex-col items-center">
              <h3 className="text-[22px] font-bold text-[#202224] tracking-tight">
                {plan.name}
              </h3>
              <p className="text-xs font-medium text-gray-400 mt-1">
                {plan.subtitle}
              </p>
              <div className="text-[44px] font-extrabold text-[#4880FF] tracking-tight my-5 leading-none">
                {plan.price}
              </div>
            </div>

            {/* Upper Divider */}
            <div className="w-full border-t border-gray-300 my-6 relative z-10" />

            {/* Features List */}
            <div className="w-full relative z-10 flex flex-col items-center space-y-4 flex-1">
              {plan.features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`text-sm transition-colors ${
                    feature.included
                      ? "font-semibold text-[#202224]"
                      : "font-normal text-gray-400/80"
                  }`}
                >
                  {feature.title}
                </div>
              ))}
            </div>

            {/* Lower Divider */}
            <div className="w-full border-t border-gray-300 my-6 relative z-10" />

            {/* CTA Action Section */}
            <div className="relative z-10 w-full flex flex-col items-center">
              <button
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className="w-44 py-3 rounded-full text-sm font-bold transition-all duration-200 active:scale-95 border-2 border-[#4880FF] text-[#4880FF] bg-white hover:bg-[#4880FF] hover:text-white hover:shadow-md hover:shadow-[#4880FF]/25"
              >
                Get Started
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className="text-xs font-bold text-[#202224] underline hover:text-[#4880FF] transition-colors cursor-pointer mt-4"
              >
                Start Your 30 Day Free Trial
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
