"use client";

import { type Product } from "@/lib/data";
import { useCartStore } from "@/lib/store";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  return (
    <button 
      onClick={() => addItem(product)}
      disabled={!product.inStock}
      className="group w-full flex items-center justify-center border border-primary/20 bg-background px-10 py-5 text-sm uppercase tracking-[0.2em] text-primary transition-all duration-700 ease-out hover:border-primary/60 hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {product.inStock ? "Add to Cart" : "Archived"}
    </button>
  );
}
