"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("volta_is_admin");
    if (auth === "true") {
      setIsAdmin(true);
    } else if (pathname !== "/admin/login") {
      router.push("/admin/login");
    }
    setIsChecking(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("volta_is_admin");
    router.push("/");
  };

  const menuItems = [
    { name: "Genel Bakış", path: "/admin", icon: "dashboard" },
    { name: "Siparişler", path: "/admin/siparisler", icon: "shopping_cart" },
    { name: "Ürünler", path: "/admin/urunler", icon: "inventory_2" },
    { name: "Bayi Başvuruları", path: "/admin/bayiler", icon: "handshake" },
    { name: "Ayarlar", path: "/admin/ayarlar", icon: "settings" },
  ];

  if (isChecking) {
    return <div className="min-h-[calc(100vh-80px)] bg-surface flex items-center justify-center">Yükleniyor...</div>;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAdmin) {
    return null; // Will redirect via effect
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-surface-container flex fade-in">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col hidden md:flex sticky top-20 h-[calc(100vh-80px)]">
        <div className="p-lg border-b border-outline-variant">
          <h2 className="font-headline-sm text-primary font-bold flex items-center gap-xs">
            <span className="material-symbols-outlined text-secondary">admin_panel_settings</span>
            Yönetim Paneli
          </h2>
        </div>
        
        <nav className="flex-1 p-md flex flex-col gap-xs">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-sm px-md py-sm rounded-lg font-button-text transition-colors ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-variant hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-md border-t border-outline-variant">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-sm px-md py-sm rounded-lg font-button-text text-error hover:bg-error-container hover:text-on-error-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Siteye Dön
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-md md:p-xl overflow-y-auto">
        {/* Mobile Nav (Optional, simplified) */}
        <div className="md:hidden flex overflow-x-auto gap-sm mb-lg pb-sm border-b border-outline-variant">
           {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-xs px-sm py-xs rounded-lg font-button-text whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-on-surface-variant border border-outline-variant"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>

        {children}
      </main>
    </div>
  );
}
