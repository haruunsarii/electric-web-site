"use client";

import { useState } from "react";

export default function IletisimPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send an API request to a mail service
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-24 pb-xl fade-in">
      <div className="max-w-container-max mx-auto px-gutter mb-xl">
        <h1 className="font-display-md text-primary font-bold mb-xs">İletişim</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          Sorularınız, fiyat teklifleri veya projeniz hakkında detaylı bilgi almak için bize aşağıdaki kanallardan ulaşabilirsiniz.
        </p>
      </div>

      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Contact Info */}
        <div className="flex flex-col gap-lg">
          <div className="bg-surface-container-lowest p-lg border border-outline-variant rounded-2xl">
            <h2 className="font-headline-sm text-primary mb-md border-b border-outline-variant pb-xs">Merkez Ofis</h2>
            
            <div className="flex flex-col gap-md">
              <div className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary mt-1">location_on</span>
                <div>
                  <h3 className="font-label-large text-on-surface">Adres</h3>
                  <p className="font-body-md text-on-surface-variant">Karaköy Elektrikçiler Çarşısı No:42<br/>Beyoğlu, İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary mt-1">phone</span>
                <div>
                  <h3 className="font-label-large text-on-surface">Telefon</h3>
                  <p className="font-body-md text-on-surface-variant">
                    <a href="tel:+902125550000" className="hover:text-primary transition-colors">+90 (212) 555 00 00</a><br/>
                    <a href="tel:+905325550000" className="hover:text-primary transition-colors">+90 (532) 555 00 00</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary mt-1">mail</span>
                <div>
                  <h3 className="font-label-large text-on-surface">E-Posta</h3>
                  <p className="font-body-md text-on-surface-variant">
                    <a href="mailto:info@voltaelectric.com" className="hover:text-primary transition-colors">info@voltaelectric.com</a><br/>
                    <a href="mailto:satis@voltaelectric.com" className="hover:text-primary transition-colors">satis@voltaelectric.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-md border border-outline-variant rounded-2xl overflow-hidden h-64 relative flex items-center justify-center">
            {/* Placeholder for Google Maps */}
            <div className="text-center">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-xs">map</span>
              <p className="font-body-sm text-on-surface-variant">Google Haritalar görünümü buraya eklenecektir.</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-surface-container-lowest p-xl border border-outline-variant rounded-2xl shadow-sm">
          <h2 className="font-headline-md text-primary mb-md">Bize Yazın</h2>
          
          {submitted ? (
            <div className="bg-primary-container text-on-primary-container p-lg rounded-xl flex flex-col items-center justify-center text-center h-[400px] animate-in zoom-in duration-300">
              <span className="material-symbols-outlined text-[64px] text-primary mb-sm">check_circle</span>
              <h3 className="font-headline-sm font-bold mb-xs">Mesajınız Alındı!</h3>
              <p className="font-body-md">
                En kısa sürede uzman ekibimiz tarafından tarafınıza dönüş yapılacaktır. Teşekkür ederiz.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Adınız Soyadınız *</label>
                  <input type="text" required className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Firma Adı</label>
                  <input type="text" className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Telefon Numaranız *</label>
                  <input type="tel" required className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">E-Posta Adresiniz *</label>
                  <input type="email" required className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-technical text-on-surface-variant">Konu</label>
                <select className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors">
                  <option>Fiyat Teklifi İstiyorum</option>
                  <option>Ürün Bilgisi</option>
                  <option>Bayilik Başvurusu</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-technical text-on-surface-variant">Mesajınız *</label>
                <textarea required rows={5} className="bg-surface border border-outline-variant rounded-lg p-sm font-body-md outline-none focus:border-primary transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="bg-primary text-on-primary font-button-text py-md rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors mt-sm flex items-center justify-center gap-xs">
                <span className="material-symbols-outlined">send</span>
                Mesajı Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
