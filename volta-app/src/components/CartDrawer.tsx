"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface/50 backdrop-blur-sm z-[60] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-outline-variant shadow-lg z-[70] flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-md border-b border-outline-variant">
          <h2 className="font-headline-md text-primary flex items-center gap-xs">
            <span className="material-symbols-outlined">shopping_cart</span>
            Sepetim
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors p-xs rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-md flex flex-col gap-md">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-variant gap-sm">
              <span className="material-symbols-outlined text-[64px] opacity-50">
                production_quantity_limits
              </span>
              <p className="font-body-lg">Sepetiniz şu an boş.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-sm bg-primary text-on-primary font-button-text px-lg py-sm rounded hover:bg-primary-container transition-colors uppercase"
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-sm items-center border border-outline-variant rounded-lg p-sm bg-surface-container-lowest"
              >
                {/* Image */}
                <div
                  className="w-20 h-20 bg-cover bg-center rounded bg-surface-variant flex-shrink-0"
                  style={{ backgroundImage: `url(${item.product.image})` }}
                />
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline-sm text-primary truncate">
                    {item.product.name}
                  </h3>
                  <div className="font-body-md text-secondary font-bold mb-xs">
                    {(item.product.price * item.quantity).toFixed(2)} ₺
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-sm">
                    <div className="flex items-center border border-outline-variant rounded bg-surface">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-xs py-[2px] text-on-surface-variant hover:text-primary transition-colors"
                      >
                        -
                      </button>
                      <span className="px-sm font-body-sm min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-xs py-[2px] text-on-surface-variant hover:text-primary transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-error hover:text-error-container transition-colors p-xs ml-auto"
                      title="Sepetten Sil"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-md border-t border-outline-variant bg-surface-container-lowest">
            <div className="flex items-center justify-between mb-md font-headline-md text-primary">
              <span>Toplam:</span>
              <span>{cartTotal.toFixed(2)} ₺</span>
            </div>
            <button className="w-full bg-secondary text-on-secondary font-button-text py-md px-md rounded uppercase tracking-wider text-center active:scale-95 transition-transform shadow-sm hover:bg-secondary-container">
              Siparişi Tamamla
            </button>
          </div>
        )}
      </div>
    </>
  );
}
