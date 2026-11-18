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

interface FavoritesViewProps {
  products?: Product[];
  onToggleFavorite?: (id: string) => void;
}

export default function FavoritesView({
  products: externalProducts,
  onToggleFavorite,
}: FavoritesViewProps = {}) {
  const context = useProducts();
  const products = externalProducts || context.products;

  const toggleFavorite = (id: string) => {
    if (onToggleFavorite) {
      onToggleFavorite(id);
    } else {
      context.toggleFavorite(id);
    }
  };

  const favoriteProducts = products.filter((p) => p.isFavorite);

  return (
    <div className="space-y-7">
      {/* Page Title */}
      <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
        Favorites
      </h1>

      {/* Empty State */}
      {favoriteProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4 text-[#EA0234]">
            <HeartOutlineIcon className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#202224] mb-1">
            No favorite item
          </h2>
          <p className="text-xs text-gray-400 max-w-sm">
            You haven&apos;t marked any products as favorites yet. Click the heart icon on any product to see it here.
          </p>
        </div>
      ) : (
        /* Favorites Product Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              {/* Image Slider Area (Pure White) */}
              <div className="relative bg-white rounded-xl py-6 px-4 flex items-center justify-center min-h-[220px] mb-4 overflow-hidden">
                {/* Left Carousel Arrow */}
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/70 text-gray-600 flex items-center justify-center shadow-xs transition-all active:scale-95"
                >
                  <ChevronLeftIcon className="w-3.5 h-3.5 text-gray-600" />
                </button>

                {/* Product Image */}
                <div className="relative w-40 h-44 flex items-center justify-center select-none">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={250}
                    height={276}
                    className={`max-h-full max-w-full object-contain ${
                      product.image.includes("prod2") ? "scale-[1.45]" : ""
                    }`}
                    priority
                  />
                </div>

                {/* Right Carousel Arrow */}
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/70 text-gray-600 flex items-center justify-center shadow-xs transition-all active:scale-95"
                >
                  <ChevronRightIcon className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>

              {/* Product Meta & Actions */}
              <div className="space-y-2.5">
                {/* Title & Heart */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#202224] tracking-tight">
                    {product.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    title="Remove from favorites"
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

                {/* Edit Button */}
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
      )}
    </div>
  );
}
