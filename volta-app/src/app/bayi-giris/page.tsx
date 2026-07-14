"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function BayiGirisPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginDealer, isDealer } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to home
  useEffect(() => {
    if (isDealer) {
      router.push("/");
    }
  }, [isDealer, router]);

  if (isDealer) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.isDealer) {
          loginDealer();
          router.push("/");
        } else {
          setError("Bu hesap bir bayi hesabı değildir.");
        }
      } else {
        const data = await res.json();
        setError(data.error || "Giriş başarısız. Bilgilerinizi kontrol edin.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-surface dark:bg-inverse-surface flex items-center justify-center p-sm md:p-lg fade-in">
      <div className="w-full max-w-[420px] bg-surface-container-lowest border border-outline-variant p-lg md:p-xl rounded-2xl shadow-sm">
        
        <div className="flex flex-col items-center mb-lg">
          <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center mb-sm text-secondary shadow-sm">
            <span className="material-symbols-outlined text-[32px]">storefront</span>
          </div>
          <h1 className="font-headline-md text-primary font-bold text-center">Bayi Girişi</h1>
          <p className="font-body-md text-on-surface-variant text-center mt-xs">
            Özel indirimler için hesabınızla giriş yapın.
          </p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-sm rounded-lg mb-md font-body-sm flex items-start gap-xs">
            <span className="material-symbols-outlined text-[20px]">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-technical text-on-surface-variant">Kullanıcı Adı</label>
            <input
              type="text"
              className="w-full border border-outline-variant rounded-lg p-sm font-body-lg text-on-surface bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
              placeholder="Kullanıcı adınızı girin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-technical text-on-surface-variant">Şifre</label>
            <input
              type="password"
              className="w-full border border-outline-variant rounded-lg p-sm font-body-lg text-on-surface bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-sm bg-primary text-on-primary font-button-text py-md rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors active:scale-[0.98] shadow-sm flex justify-center items-center gap-xs"
          >
            <span className="material-symbols-outlined text-[20px]">login</span>
            Giriş Yap
          </button>
        </form>

        <div className="mt-lg pt-md border-t border-outline-variant text-center font-body-sm text-on-surface-variant">
          Henüz bayimiz değil misiniz?{" "}
          <Link href="/bayilik-basvurusu" className="text-secondary hover:text-secondary-container transition-colors font-bold mt-xs block sm:inline">
            Hemen Başvuru Yapın
          </Link>
        </div>

      </div>
    </div>
  );
}
