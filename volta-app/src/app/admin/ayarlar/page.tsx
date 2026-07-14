"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "Yeni şifreler eşleşmiyor!" });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({ type: "error", message: "Yeni şifre en az 6 karakter olmalıdır." });
      return;
    }

    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/auth/admin-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Şifreniz başarıyla güncellendi!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        setStatus({ type: "error", message: data.error || "Şifre güncellenemedi." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Bağlantı hatası oluştu." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-lg fade-in max-w-2xl">
      <div>
        <h1 className="font-display-sm text-primary mb-xs">Ayarlar</h1>
        <p className="font-body-md text-on-surface-variant">
          Yönetim paneli güvenlik ve sistem ayarları.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-md border-b border-outline-variant bg-surface flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary">lock</span>
          <h2 className="font-headline-sm text-primary">Şifre Değiştirme</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-lg flex flex-col gap-md">
          {status.message && (
            <div className={`p-sm rounded-lg font-body-sm flex items-start gap-xs ${
              status.type === "error" 
                ? "bg-error-container text-on-error-container" 
                : "bg-secondary-container text-on-secondary-container"
            }`}>
              <span className="material-symbols-outlined text-[20px]">
                {status.type === "error" ? "error" : "check_circle"}
              </span>
              {status.message}
            </div>
          )}

          <div className="flex flex-col gap-xs">
            <label className="font-label-technical text-on-surface-variant">Mevcut Şifre</label>
            <input
              type="password"
              className="border border-outline-variant rounded-lg p-sm font-body-md bg-surface focus:border-primary outline-none transition-colors"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-technical text-on-surface-variant">Yeni Şifre</label>
            <input
              type="password"
              className="border border-outline-variant rounded-lg p-sm font-body-md bg-surface focus:border-primary outline-none transition-colors"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-technical text-on-surface-variant">Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              className="border border-outline-variant rounded-lg p-sm font-body-md bg-surface focus:border-primary outline-none transition-colors"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="pt-md mt-sm border-t border-outline-variant flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-on-primary font-button-text px-lg py-sm rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shadow-sm flex items-center gap-xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  Şifreyi Güncelle
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
