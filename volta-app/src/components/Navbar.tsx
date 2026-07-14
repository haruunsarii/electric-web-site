"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, setIsCartOpen } = useCart();
  const { isDealer, loginDealer, logoutDealer } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsMobileMenuOpen(false);
      router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <nav className="bg-surface dark:bg-inverse-surface w-full top-0 sticky border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none z-50 transition-colors duration-200">
        <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20">
          {/* Brand */}
          <Link href="/">
            <div className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary dark:text-primary-fixed tracking-tight md:tracking-normal">
              VOLTA ELECTRIC
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-md items-center">
            <Link
              href="/kurumsal"
              className="font-button-text text-button-text text-on-surface-variant dark:text-on-surface hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container dark:hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer active:scale-95 transition-transform px-xs py-base rounded"
            >
              Kurumsal
            </Link>
            <Link
              href="/#kategoriler"
              className="font-button-text text-button-text text-on-surface-variant dark:text-on-surface hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container dark:hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer active:scale-95 transition-transform px-xs py-base rounded"
            >
              Kategoriler
            </Link>
            <Link
              href="/katalog-ve-fiyat-listesi"
              className="font-button-text text-button-text text-on-surface-variant dark:text-on-surface hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container dark:hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer active:scale-95 transition-transform px-xs py-base rounded"
            >
              Katalog
            </Link>
            <Link
              href="/iletisim"
              className="font-button-text text-button-text text-on-surface-variant dark:text-on-surface hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container dark:hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer active:scale-95 transition-transform px-xs py-base rounded"
            >
              İletişim
            </Link>
            <Link
              href="/admin"
              className="font-button-text text-button-text text-secondary dark:text-secondary-fixed hover:bg-surface-container dark:hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer active:scale-95 transition-transform px-xs py-base rounded flex items-center gap-xs"
              title="Yönetim Paneli"
            >
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              Admin
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-sm">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input 
                type="text" 
                placeholder="Ürün ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant rounded-full py-xs pl-md pr-xl font-body-sm text-on-surface outline-none focus:border-primary transition-colors w-48 lg:w-64"
              />
              <button type="submit" className="absolute right-xs top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-xs">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
            </form>

            {/* Desktop Icons */}
            <div className="hidden sm:flex gap-xs">
              <Link 
                href="/sepet"
                className="relative text-on-surface-variant hover:text-primary p-xs rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-on-error text-[10px] font-bold px-[5px] py-[1px] rounded-full min-w-[16px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {mounted && isDealer ? (
                <button
                  onClick={logoutDealer}
                  className="flex items-center gap-xs text-secondary hover:text-secondary-container p-xs rounded hover:bg-surface-container transition-colors font-button-text"
                  title="Bayi Çıkışı Yap"
                >
                  <span className="material-symbols-outlined">storefront</span>
                  <span className="hidden lg:inline">Bayi Aktif</span>
                </button>
              ) : (
                <Link
                  href="/bayi-giris"
                  className="text-on-surface-variant hover:text-primary p-xs rounded-full hover:bg-surface-container transition-colors flex items-center justify-center"
                  title="Bayi Girişi"
                >
                  <span className="material-symbols-outlined">account_circle</span>
                </Link>
              )}
            </div>

            {/* Desktop Contact Button */}
            <Link href="/iletisim" className="hidden md:block">
              <button className="bg-secondary text-on-secondary font-button-text text-button-text px-sm py-xs rounded hover:bg-secondary-container transition-colors shadow-sm uppercase">
                Bize Ulaşın
              </button>
            </Link>

            {/* Mobile Actions (Visible on small screens) */}
            <div className="md:hidden flex items-center gap-sm">
              <button
                aria-label="Search"
                onClick={toggleMenu}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[24px]">
                  search
                </span>
              </button>
              <Link
                aria-label="Cart"
                href="/sepet"
                className="relative text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95 transition-transform flex items-center justify-center p-xs"
              >
                <span className="material-symbols-outlined text-[24px]">
                  shopping_cart
                </span>
                {mounted && cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-error text-on-error text-[10px] font-bold px-[5px] py-[1px] rounded-full min-w-[16px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* Hamburger */}
              <button
                aria-label="Menu"
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95 transition-transform"
                onClick={toggleMenu}
              >
                <span className="material-symbols-outlined text-[28px]">
                  menu
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-surface z-[60] flex flex-col pt-20 px-gutter transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-md right-md text-on-surface-variant hover:text-primary cursor-pointer p-xs"
          onClick={toggleMenu}
        >
          <span className="material-symbols-outlined text-[32px]">close</span>
        </button>

        <form onSubmit={handleSearch} className="mt-xl mb-md relative">
          <input 
            type="text" 
            placeholder="Ne aramıştınız?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-sm pl-md pr-xl font-body-lg text-on-surface outline-none focus:border-primary transition-colors"
          />
          <button type="submit" className="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-sm">
            <span className="material-symbols-outlined text-[28px]">search</span>
          </button>
        </form>

        <nav className="flex flex-col gap-lg">
          <Link
            href="/kurumsal"
            className="font-headline-md text-on-surface-variant hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Kurumsal
          </Link>
          <Link
            href="/#kategoriler"
            className="font-headline-md text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent hover:border-secondary pb-1 self-start"
            onClick={toggleMenu}
          >
            Kategoriler
          </Link>
          <Link
            href="/katalog-ve-fiyat-listesi"
            className="font-headline-md text-on-surface-variant hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Katalog
          </Link>
          <Link
            href="/iletisim"
            className="font-headline-md text-on-surface-variant hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            İletişim
          </Link>
          <Link
            href="/admin"
            className="font-headline-md text-secondary hover:text-secondary-container transition-colors flex items-center gap-xs"
            onClick={toggleMenu}
          >
            <span className="material-symbols-outlined text-[24px]">admin_panel_settings</span>
            Yönetim Paneli
          </Link>
          <div className="border-t border-outline-variant pt-lg mt-sm">
            {mounted && isDealer ? (
              <button
                onClick={() => {
                  logoutDealer();
                  toggleMenu();
                }}
                className="flex items-center gap-sm text-secondary hover:text-secondary-container font-headline-md transition-colors"
              >
                <span className="material-symbols-outlined text-[32px]">storefront</span>
                Bayi Çıkışı Yap
              </button>
            ) : (
              <Link
                href="/bayi-giris"
                onClick={toggleMenu}
                className="flex items-center gap-sm text-on-surface-variant hover:text-primary font-headline-md transition-colors"
              >
                <span className="material-symbols-outlined text-[32px]">account_circle</span>
                Bayi Girişi
              </Link>
            )}
          </div>
        </nav>
        <div className="mt-auto mb-xl flex flex-col gap-sm">
          <Link href="/iletisim" onClick={toggleMenu}>
            <button className="w-full bg-secondary text-on-secondary font-button-text py-sm px-md rounded uppercase tracking-wider text-center active:scale-95 transition-transform">
              Bize Ulaşın
            </button>
          </Link>
          <button className="bg-primary text-on-primary font-button-text py-sm px-md rounded uppercase tracking-wider flex items-center justify-center gap-xs active:scale-95 transition-transform">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              download
            </span>
            Katalog İndir
          </button>
        </div>
      </div>
    </>
  );
}
