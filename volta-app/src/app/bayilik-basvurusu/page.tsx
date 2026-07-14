"use client";

import { useState } from "react";
import Link from "next/link";

export default function BayilikBasvurusuPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    taxNumber: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/dealer-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Başvuru gönderilemedi");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-24 pb-xl fade-in flex items-center justify-center">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl max-w-lg w-full text-center shadow-sm">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-md animate-in zoom-in duration-300">
            <span className="material-symbols-outlined text-[48px]">check_circle</span>
          </div>
          <h1 className="font-display-sm text-primary font-bold mb-sm">Başvurunuz Alındı</h1>
          <p className="font-body-md text-on-surface-variant mb-lg">
            Sayın {formData.contactName}, bayilik başvurunuz sistemimize başarıyla kaydedilmiştir. Müşteri temsilcilerimiz firmanız ({formData.companyName}) ile en kısa sürede iletişime geçerek süreci tamamlayacaktır.
          </p>
          <Link href="/" className="inline-block bg-primary text-on-primary font-button-text px-lg py-sm rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">
            Ana Sayfaya Dön
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-24 pb-xl fade-in">
      <div className="max-w-3xl mx-auto px-gutter">
        <div className="mb-xl text-center">
          <h1 className="font-display-md text-primary font-bold mb-xs">B2B Bayilik Başvurusu</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Volta Electric kurumsal müşterisi olun, tüm ürünlerimizde anında özel iskontolardan ve öncelikli teknik destekten faydalanın.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-lg md:p-xl shadow-sm relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-lg relative z-10">
            {errorMsg && (
              <div className="bg-error-container text-on-error-container p-sm rounded border border-error/20 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-technical text-on-surface-variant">Firma Adı (Tam Ünvan) *</label>
                <input 
                  type="text" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required 
                  className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" 
                  placeholder="Örn: Volt Elektrik A.Ş."
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-technical text-on-surface-variant">Vergi Numarası / T.C. *</label>
                <input 
                  type="text" 
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  required 
                  className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-technical text-on-surface-variant">Yetkili Kişi Adı Soyadı *</label>
                <input 
                  type="text" 
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required 
                  className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" 
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-technical text-on-surface-variant">Şirket Telefonu *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                  className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" 
                  placeholder="05..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-technical text-on-surface-variant">Kurumsal E-Posta Adresi *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
                className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" 
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-technical text-on-surface-variant">Eklemek İstedikleriniz (Opsiyonel)</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4} 
                className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors resize-none"
                placeholder="Örn: Aylık ortalama satın alma hacmimiz, çalışmak istediğimiz markalar vb."
              ></textarea>
            </div>

            <div className="pt-sm border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-md">
              <p className="font-body-sm text-on-surface-variant flex-1">
                * işaretli alanların doldurulması zorunludur. Başvurunuz onaylandığında e-posta adresinize giriş bilgileriniz gönderilecektir.
              </p>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-primary text-on-primary font-button-text px-xl py-md rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors flex items-center justify-center gap-xs disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Gönderiliyor...</span>
                ) : (
                  <>
                    Başvuruyu Tamamla
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
