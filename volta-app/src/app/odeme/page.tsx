"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OdemePage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isDealer, discountRate } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "bank_transfer">("credit_card");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      customerName: formData.get("fullName"),
      customerPhone: formData.get("phone"),
      address: formData.get("address"),
      cartItems: cartItems,
      cartTotal: cartTotal,
      discountRate: discountRate,
      paymentMethod: paymentMethod
    };

    try {
      // Simulate Payment Gateway delay
      if (paymentMethod === "credit_card") {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        router.push(`/siparis-basarili?orderNumber=${data.orderNumber}`);
      } else {
        alert("Sipariş oluşturulurken bir hata meydana geldi.");
        setIsSubmitting(false);
      }
    } catch (err) {
      alert("Bağlantı hatası oluştu.");
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <main className="min-h-screen bg-surface flex flex-col items-center justify-center p-xl">
        <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-md opacity-50">remove_shopping_cart</span>
        <h1 className="font-display-sm text-primary mb-sm font-bold">Sepetiniz Boş</h1>
        <p className="text-on-surface-variant mb-lg font-body-lg text-center max-w-md">
          Ödeme sayfasına geçebilmek için sepetinize en az bir ürün eklemelisiniz.
        </p>
        <Link href="/" className="bg-primary text-on-primary px-xl py-md rounded-full font-button-text hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">
          Alışverişe Başla
        </Link>
      </main>
    );
  }

  const rawTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-10 pb-20 fade-in">
      <div className="max-w-container-max mx-auto px-gutter">
        <h1 className="font-display-sm text-primary font-bold mb-xl">Güvenli Ödeme</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-xl relative">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 flex flex-col gap-lg">
            
            {/* Delivery Details */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-md md:p-xl shadow-sm">
              <h2 className="font-headline-sm text-primary mb-md flex items-center gap-xs border-b border-outline-variant pb-xs">
                <span className="material-symbols-outlined">local_shipping</span>
                1. Teslimat Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Ad Soyad / Firma Adı *</label>
                  <input type="text" name="fullName" required className="border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors bg-surface" />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Telefon *</label>
                  <input type="tel" name="phone" required className="border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors bg-surface" />
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-technical text-on-surface-variant">Açık Adres *</label>
                <textarea name="address" rows={3} required className="border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors bg-surface resize-none"></textarea>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-md md:p-xl shadow-sm">
              <h2 className="font-headline-sm text-primary mb-md flex items-center gap-xs border-b border-outline-variant pb-xs">
                <span className="material-symbols-outlined">payments</span>
                2. Ödeme Yöntemi
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-md mb-lg">
                <label className={`flex-1 border rounded-xl p-md cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant hover:border-outline'}`}>
                  <div className="flex items-center gap-sm mb-xs">
                    <input type="radio" name="paymentType" value="credit_card" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} className="w-4 h-4 text-primary" />
                    <span className="font-label-large font-bold text-on-surface">Kredi / Banka Kartı</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant ml-7">İyzico / PayTR altyapısı ile %100 Güvenli Ödeme</p>
                </label>
                
                <label className={`flex-1 border rounded-xl p-md cursor-pointer transition-all ${paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant hover:border-outline'}`}>
                  <div className="flex items-center gap-sm mb-xs">
                    <input type="radio" name="paymentType" value="bank_transfer" checked={paymentMethod === 'bank_transfer'} onChange={() => setPaymentMethod('bank_transfer')} className="w-4 h-4 text-primary" />
                    <span className="font-label-large font-bold text-on-surface">Havale / EFT</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant ml-7">Banka hesabımıza doğrudan transfer yapın</p>
                </label>
              </div>

              {/* Credit Card Form Mock */}
              {paymentMethod === 'credit_card' && (
                <div className="bg-surface border border-outline-variant rounded-xl p-md animate-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center justify-between mb-md">
                    <h3 className="font-label-large font-bold text-on-surface">Kart Bilgileri</h3>
                    <div className="flex gap-xs text-on-surface-variant opacity-50">
                      <span className="material-symbols-outlined">credit_card</span>
                      <span className="text-[12px] font-label-technical mt-1">TEST MODU</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-technical text-on-surface-variant">Kart Üzerindeki İsim</label>
                      <input type="text" required={paymentMethod === 'credit_card'} placeholder="Ad Soyad" className="border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors bg-surface" />
                    </div>
                    
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-technical text-on-surface-variant">Kart Numarası</label>
                      <input type="text" required={paymentMethod === 'credit_card'} placeholder="4321 0000 0000 0000" maxLength={19} className="border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors bg-surface font-mono" />
                    </div>

                    <div className="grid grid-cols-2 gap-md">
                      <div className="flex flex-col gap-xs">
                        <label className="font-label-technical text-on-surface-variant">Son Kul. (AA/YY)</label>
                        <input type="text" required={paymentMethod === 'credit_card'} placeholder="12/25" maxLength={5} className="border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors bg-surface text-center font-mono" />
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-label-technical text-on-surface-variant">CVV</label>
                        <input type="text" required={paymentMethod === 'credit_card'} placeholder="123" maxLength={4} className="border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors bg-surface text-center font-mono" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-sm text-center">Bu bir test ortamıdır. Lütfen gerçek kredi kartı bilgilerinizi girmeyiniz.</p>
                </div>
              )}

              {/* Bank Transfer Info Mock */}
              {paymentMethod === 'bank_transfer' && (
                <div className="bg-surface border border-outline-variant rounded-xl p-md animate-in slide-in-from-top-4 duration-300">
                  <h3 className="font-label-large font-bold text-on-surface mb-sm">Banka Hesap Bilgilerimiz</h3>
                  <div className="bg-surface-container-low p-sm rounded border border-outline-variant font-mono text-[14px] text-on-surface">
                    <p className="mb-1"><span className="text-on-surface-variant">Banka:</span> Garanti BBVA</p>
                    <p className="mb-1"><span className="text-on-surface-variant">Alıcı:</span> Volta Elektrik A.Ş.</p>
                    <p><span className="text-on-surface-variant">IBAN:</span> TR12 0006 2000 0000 0000 0000 00</p>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mt-sm">Lütfen EFT/Havale açıklama kısmına Ad Soyadınızı yazmayı unutmayınız.</p>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-md md:p-xl shadow-sm sticky top-24">
              <h2 className="font-headline-sm text-primary mb-md border-b border-outline-variant pb-xs">Sipariş Özeti</h2>
              
              <div className="flex flex-col gap-sm mb-lg max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start gap-sm">
                    <div className="flex flex-col">
                      <span className="font-body-sm text-on-surface line-clamp-1">{item.product.name}</span>
                      <span className="font-label-technical text-on-surface-variant">{item.quantity} Adet</span>
                    </div>
                    <span className="font-body-sm font-bold text-on-surface whitespace-nowrap">
                      {(item.product.price * item.quantity).toFixed(2)} ₺
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-outline-variant pt-md flex flex-col gap-xs mb-lg">
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>Ara Toplam</span>
                  <span>{rawTotal.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>Kargo</span>
                  <span>Ücretsiz</span>
                </div>
                {isDealer && discountRate > 0 && (
                  <div className="flex justify-between font-body-md text-secondary font-bold">
                    <span>Bayi İndirimi (%{(discountRate * 100).toFixed(0)})</span>
                    <span>-{(rawTotal * discountRate).toFixed(2)} ₺</span>
                  </div>
                )}
                <div className="flex justify-between font-headline-sm text-primary font-bold mt-sm border-t border-outline-variant pt-sm">
                  <span>Genel Toplam</span>
                  <span>{cartTotal.toFixed(2)} ₺</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-on-primary font-button-text py-md rounded-xl hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors active:scale-[0.98] shadow-sm flex items-center justify-center gap-xs disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                    {paymentMethod === 'credit_card' ? 'Ödeme Alınıyor...' : 'Sipariş Oluşturuluyor...'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    Siparişi Tamamla
                  </>
                )}
              </button>
              
              <div className="mt-md text-center flex items-center justify-center gap-xs text-on-surface-variant opacity-70">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span className="font-label-technical text-[10px]">256-BIT SSL İLE GÜVENDESİNİZ</span>
              </div>
            </div>
          </div>

        </form>
      </div>
      
      {/* Overlay during payment processing */}
      {isSubmitting && paymentMethod === 'credit_card' && (
        <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-[200] flex items-center justify-center fade-in">
          <div className="bg-surface-container-lowest p-xl rounded-2xl shadow-lg border border-outline-variant flex flex-col items-center max-w-sm text-center">
            <div className="w-16 h-16 border-4 border-surface-variant border-t-primary rounded-full animate-spin mb-md"></div>
            <h3 className="font-headline-sm text-primary font-bold mb-xs">Ödeme İşleniyor</h3>
            <p className="font-body-sm text-on-surface-variant">Lütfen sayfayı kapatmayın veya yenilemeyin. Bankanızla güvenli bağlantı kuruluyor...</p>
          </div>
        </div>
      )}
    </main>
  );
}
