"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categorySlug: string;
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const { isDealer, discountRate } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleIncrease = () => {
    if (quantity < 99) setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    // Add to cart 'quantity' times
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    // Show visual feedback
    setShowAddedAnimation(true);
    setTimeout(() => {
      setShowAddedAnimation(false);
      // Optional: Open cart drawer after animation
      // setIsCartOpen(true); 
    }, 1500);
  };

  const hasDiscount = isDealer && discountRate > 0;
  const discountedPrice = product.price * (1 - discountRate);
  
  // Total prices based on quantity
  const totalBasePrice = product.price * quantity;
  const totalDiscountedPrice = discountedPrice * quantity;

  return (
    <div className="flex flex-col h-full fade-in">
      {/* Price Section */}
      <div className="mb-xl p-md bg-surface-container-lowest border border-outline-variant rounded-xl">
        <p className="font-label-technical text-on-surface-variant mb-xs">Birim Fiyat</p>
        <div className="flex flex-col">
          {mounted && hasDiscount ? (
            <>
              <span className="font-body-lg text-on-surface-variant line-through mb-1">
                {product.price.toFixed(2)} ₺
              </span>
              <div className="flex items-center gap-sm">
                <span className="font-display-sm text-secondary font-bold">
                  {discountedPrice.toFixed(2)} ₺
                </span>
                <span className="bg-error text-on-error font-label-technical px-2 py-1 rounded-sm text-[12px] font-bold">
                  %{(discountRate * 100).toFixed(0)} İNDİRİM
                </span>
              </div>
            </>
          ) : (
            <span className="font-display-sm text-primary font-bold">
              {product.price.toFixed(2)} ₺
            </span>
          )}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="mt-auto">
        <div className="flex items-center gap-md mb-md">
          <label className="font-label-large text-on-surface-variant w-16">Adet:</label>
          <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden bg-surface">
            <button 
              onClick={handleDecrease}
              className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <div className="w-16 h-12 flex items-center justify-center font-headline-sm text-primary font-bold border-x border-outline-variant">
              {quantity}
            </div>
            <button 
              onClick={handleIncrease}
              className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        {/* Total Price preview */}
        {quantity > 1 && (
          <div className="flex items-center justify-between mb-sm px-sm text-on-surface-variant font-body-md">
            <span>Ara Toplam:</span>
            <span className="font-bold">
              {(mounted && hasDiscount ? totalDiscountedPrice : totalBasePrice).toFixed(2)} ₺
            </span>
          </div>
        )}

        <button 
          onClick={handleAddToCart}
          disabled={showAddedAnimation}
          className={`w-full h-14 flex items-center justify-center gap-sm font-button-text rounded-xl transition-all duration-300 shadow-sm ${
            showAddedAnimation 
              ? "bg-secondary text-on-secondary scale-[0.98]" 
              : "bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed active:scale-[0.98]"
          }`}
        >
          {showAddedAnimation ? (
            <>
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
              Sepete Eklendi
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              Sepete Ekle
            </>
          )}
        </button>
      </div>
    </div>
  );
}
