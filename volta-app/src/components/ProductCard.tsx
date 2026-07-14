"use client";

import { Product } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { isDealer, discountRate } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const hasDiscount = isDealer && discountRate > 0;
  const discountedPrice = product.price * (1 - discountRate);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link href={`/urun/${product.id}`} className="relative h-48 w-full bg-surface-variant overflow-hidden block">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
        {mounted && hasDiscount && (
          <div className="absolute top-2 left-2 bg-error text-on-error font-label-technical text-[12px] px-2 py-1 rounded-sm shadow-sm font-bold">
            %{(discountRate * 100).toFixed(0)} BAYİ İNDİRİMİ
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-sm flex flex-col flex-grow">
        <Link href={`/urun/${product.id}`}>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-xs line-clamp-2 hover:text-primary-fixed transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="font-body-sm text-on-surface-variant mb-md flex-grow line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-sm border-t border-outline-variant">
          <div className="flex flex-col">
            {mounted && hasDiscount ? (
              <>
                <span className="font-body-sm text-on-surface-variant line-through text-[12px]">
                  {product.price.toFixed(2)} ₺
                </span>
                <span className="font-headline-sm text-secondary font-bold">
                  {discountedPrice.toFixed(2)} ₺
                </span>
              </>
            ) : (
              <span className="font-headline-sm text-primary font-bold">
                {product.price.toFixed(2)} ₺
              </span>
            )}
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
