"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  HeartOutlineIcon,
} from "./Icons";

interface ProductsViewProps {
  products?: Product[];
  onToggleFavorite?: (id: string) => void;
}

export default function ProductsView({
  products: externalProducts,
  onToggleFavorite,
}: ProductsViewProps = {}) {
  const context = useProducts();
  const products = externalProducts || context.products;

  const toggleFavorite = (id: string) => {
    if (onToggleFavorite) {
      onToggleFavorite(id);
    } else {
      context.toggleFavorite(id);
    }
  };

  return (
    <div className="space-y-7">
      {/* Page Title */}
      <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
        Products
      </h1>

      {/* Hero Promo Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4880FF] via-[#4379F5] to-[#3B71ED] text-white p-8 sm:p-10 shadow-sm flex items-center justify-between min-h-[220px]">
        {/* Decorative Wave Contours */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <svg className="w-full h-full" viewBox="0 0 800 220" fill="none" preserveAspectRatio="none">
            <path
              d="M-50 120 C 150 40, 350 180, 550 90 C 750 0, 850 160, 950 100"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path
              d="M-50 160 C 200 80, 400 220, 600 130 C 800 40, 900 200, 1000 140"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          aria-label="Previous slide"
          className="relative z-10 w-8 h-8 rounded-full bg-white/35 hover:bg-white/50 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
        >
          <ChevronLeftIcon className="w-4 h-4 text-white" />
        </button>

        {/* Banner Content (Shifted slightly to the left with mr-auto) */}
        <div className="relative z-10 max-w-xl ml-8 sm:ml-14 mr-auto text-left">
          <span className="text-xs font-semibold text-white/80 block mb-2 tracking-wide">
            September 12-22
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2 tracking-tight">
            Enjoy free home
            <br />
            delivery in this summer
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mb-5 font-normal">
            Designer Dresses - Pick from trendy Designer Dress.
          </p>
          <button
            type="button"
            className="bg-[#FF8743] hover:bg-[#ff7629] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg active:scale-95 transition-all shadow-sm"
          >
            Get Started
          </button>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          aria-label="Next slide"
          className="relative z-10 w-8 h-8 rounded-full bg-white/35 hover:bg-white/50 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
        >
          <ChevronRightIcon className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            {/* Image Slider Area (Pure white background) */}
            <div className="relative bg-white rounded-xl py-6 px-4 flex items-center justify-center min-h-[220px] mb-4 overflow-hidden">
              {/* Product Left Carousel Arrow */}
              <button
                type="button"
                aria-label="Previous product image"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/70 text-gray-600 flex items-center justify-center shadow-xs transition-all active:scale-95"
              >
                <ChevronLeftIcon className="w-3.5 h-3.5 text-gray-600" />
              </button>

              {/* Product Image */}
              <div className="relative w-40 h-44 flex items-center justify-center select-none">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={260}
                  height={286}
                  className={`max-h-full max-w-full object-contain ${
                    product.image.includes("prod2") ? "scale-[1.95]" : ""
                  }`}
                  priority
                />
              </div>

              {/* Product Right Carousel Arrow */}
              <button
                type="button"
                aria-label="Next product image"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/70 text-gray-600 flex items-center justify-center shadow-xs transition-all active:scale-95"
              >
                <ChevronRightIcon className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>

            {/* Product Meta & Actions */}
            <div className="space-y-2.5">
              {/* Title & Favorite Heart */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#202224] tracking-tight">
                  {product.name}
                </h3>
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  title={product.isFavorite ? "Remove favorite" : "Add to favorites"}
                  className="p-1 rounded-full hover:bg-gray-50 active:scale-90 transition-all text-gray-400 hover:text-red-500"
                >
                  <HeartOutlineIcon
                    className="w-4 h-4 transition-colors"
                    isFilled={product.isFavorite}
                  />
                </button>
              </div>

              {/* Price */}
              <div className="text-sm font-bold text-[#4880FF]">
                {product.price}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: product.rating }).map((_, idx) => (
                    <StarIcon key={idx} className="w-3.5 h-3.5 text-[#FEC53D]" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-gray-400">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Edit Product Button */}
              <div className="pt-2">
                <button
                  type="button"
                  className="bg-[#F1F4F9] hover:bg-gray-200 text-gray-700 font-semibold text-xs py-2 px-5 rounded-lg active:scale-95 transition-all shadow-xs"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
