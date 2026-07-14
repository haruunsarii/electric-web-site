"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={added}
      className={`rounded-full p-xs transition-colors cursor-pointer active:scale-95 ${
        added 
          ? "bg-secondary text-on-secondary" 
          : "bg-primary/10 text-primary hover:bg-primary hover:text-on-primary"
      }`}
      aria-label="Sepete Ekle"
    >
      <span className="material-symbols-outlined">
        {added ? "check" : "add_shopping_cart"}
      </span>
    </button>
  );
}
