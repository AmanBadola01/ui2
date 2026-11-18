"use client";

import React, { createContext, useContext, useState } from "react";
import { initialProducts, Product } from "@/data/products";

interface ProductsContextType {
  products: Product[];
  toggleFavorite: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType>({
  products: initialProducts,
  toggleFavorite: () => {},
});

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const toggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <ProductsContext.Provider value={{ products, toggleFavorite }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
