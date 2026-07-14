"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "Bilinmiyor";

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl max-w-lg w-full text-center shadow-sm">
      <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-md animate-in zoom-in duration-300">
        <span className="material-symbols-outlined text-[48px]">task_alt</span>
      </div>
      
      <h1 className="font-display-sm text-primary font-bold mb-xs">Siparişiniz Alındı!</h1>
      <p className="font-body-lg text-on-surface-variant mb-lg">
        Teşekkür ederiz. Siparişiniz başarıyla sistemimize ulaştı ve hazırlanma sürecine girdi.
      </p>

      <div className="bg-surface-variant/50 border border-outline-variant rounded-xl p-md mb-lg">
        <span className="font-label-technical text-on-surface-variant block mb-1">Sipariş Numaranız</span>
        <span className="font-headline-sm text-on-surface font-bold font-mono">{orderNumber}</span>
      </div>

      <p className="font-body-sm text-on-surface-variant mb-xl">
        Siparişinizin durumunu e-posta adresinize gönderdiğimiz bilgilendirme mailleri üzerinden takip edebilirsiniz. Havale/EFT seçtiyseniz lütfen ödemenizi gerçekleştirin.
      </p>

      <Link href="/" className="inline-block bg-primary text-on-primary font-button-text px-xl py-md rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">
        Alışverişe Devam Et
      </Link>
    </div>
  );
}

export default function SiparisBasariliPage() {
  return (
    <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-24 pb-xl fade-in flex items-center justify-center px-gutter">
      <Suspense fallback={
        <div className="animate-pulse w-full max-w-lg h-64 bg-surface-container-lowest rounded-2xl"></div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
