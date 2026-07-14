"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("volta_is_admin", "true");
      router.push("/admin");
    } else {
      setError("Hatalı şifre!");
      setPassword("");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-surface dark:bg-inverse-surface flex items-center justify-center p-sm md:p-lg fade-in">
      <div className="w-full max-w-[400px] bg-surface-container-lowest border border-outline-variant p-xl rounded-2xl shadow-sm">
        
        <div className="flex flex-col items-center mb-lg">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-sm text-error shadow-sm">
            <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-md text-primary font-bold text-center">Yönetim Paneli</h1>
          <p className="font-body-sm text-on-surface-variant text-center mt-xs">
            Erişim sağlamak için yönetici şifresini girin.
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
            <label className="font-label-technical text-on-surface-variant">Yönetici Şifresi</label>
            <input
              type="password"
              className="w-full border border-outline-variant rounded-lg p-sm font-body-lg text-on-surface bg-surface focus:border-error focus:ring-1 focus:ring-error outline-none transition-shadow"
              placeholder="Şifreyi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full mt-sm bg-primary text-on-primary font-button-text py-md rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors active:scale-[0.98] shadow-sm flex justify-center items-center gap-xs"
          >
            <span className="material-symbols-outlined text-[20px]">login</span>
            Panele Giriş Yap
          </button>
        </form>

      </div>
    </div>
  );
}
