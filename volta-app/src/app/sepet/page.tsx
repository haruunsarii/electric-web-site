"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { isDealer, discountRate } = useAuth();

  const rawTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = rawTotal * discountRate;

  return (
    <div className="min-h-screen bg-surface dark:bg-inverse-surface pt-10 pb-20 fade-in">
      <div className="max-w-container-max mx-auto px-gutter">
        <h1 className="font-display-md text-display-md text-primary mb-md border-b border-outline-variant pb-xs">
          Alışveriş Sepetim
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-surface-container rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-sm">
              production_quantity_limits
            </span>
            <h2 className="font-headline-md text-primary mb-xs">Sepetiniz Boş</h2>
            <p className="font-body-md text-on-surface-variant mb-md">
              Sepetinizde henüz bir ürün bulunmuyor.
            </p>
            <Link
              href="/#kategoriler"
              className="inline-block bg-primary text-on-primary px-lg py-sm rounded hover:bg-primary-container transition-colors uppercase font-button-text"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-lg">
            {/* Cart Items List */}
            <div className="flex-1 flex flex-col gap-sm">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row gap-md items-center border border-outline-variant rounded-lg p-md bg-surface-container-lowest"
                >
                  <div
                    className="w-full sm:w-32 h-32 bg-cover bg-center rounded bg-surface-variant flex-shrink-0"
                    style={{ backgroundImage: `url(${item.product.image})` }}
                  />
                  <div className="flex-1 w-full">
                    <h3 className="font-headline-sm text-primary mb-xs">
                      {item.product.name}
                    </h3>
                    <p className="font-body-sm text-on-surface-variant mb-sm line-clamp-2">
                      {item.product.description}
                    </p>
                    <div className="font-headline-sm text-secondary font-bold flex flex-col">
                      {isDealer && (
                        <span className="font-body-sm text-on-surface-variant line-through text-[12px] font-normal">
                          {(item.product.price * item.quantity).toFixed(2)} ₺
                        </span>
                      )}
                      <span>
                        {(item.product.price * item.quantity * (1 - discountRate)).toFixed(2)} ₺
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-auto gap-md">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-outline-variant rounded bg-surface">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-sm py-xs text-on-surface-variant hover:text-primary transition-colors"
                      >
                        -
                      </button>
                      <span className="px-md font-body-md min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-sm py-xs text-on-surface-variant hover:text-primary transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-error hover:text-error-container transition-colors flex items-center gap-xs font-button-text"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-96">
              <div className="border border-outline-variant rounded-lg p-md bg-surface-container-lowest sticky top-24">
                <h2 className="font-headline-md text-primary mb-md border-b border-outline-variant pb-xs">
                  Sipariş Özeti
                </h2>
                <div className="flex items-center justify-between font-body-lg mb-sm text-on-surface-variant">
                  <span>Ara Toplam</span>
                  <span>{rawTotal.toFixed(2)} ₺</span>
                </div>
                {isDealer && discountAmount > 0 && (
                  <div className="flex items-center justify-between font-body-lg mb-sm text-error font-bold">
                    <span>Bayi İndirimi (%{(discountRate * 100).toFixed(0)})</span>
                    <span>-{discountAmount.toFixed(2)} ₺</span>
                  </div>
                )}
                <div className="flex items-center justify-between font-body-lg mb-md text-on-surface-variant">
                  <span>Kargo</span>
                  <span>Ücretsiz</span>
                </div>
                <div className="flex items-center justify-between font-headline-md text-primary mb-lg border-t border-outline-variant pt-md">
                  <span>Genel Toplam</span>
                  <span>{cartTotal.toFixed(2)} ₺</span>
                </div>
                <Link href="/odeme" className="w-full block">
                  <button className="w-full bg-secondary text-on-secondary font-button-text py-md px-md rounded uppercase tracking-wider text-center active:scale-95 transition-transform shadow-sm hover:bg-secondary-container">
                    Siparişi Tamamla
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
