"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categorySlug: string;
};

export default function CategoryProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [sortOption, setSortOption] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    if (minPrice !== "" && !isNaN(Number(minPrice))) {
      result = result.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice !== "" && !isNaN(Number(maxPrice))) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name, "tr"));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name, "tr"));
        break;
      default:
        break;
    }

    return result;
  }, [initialProducts, sortOption, minPrice, maxPrice]);

  return (
    <div className="flex flex-col lg:flex-row gap-lg items-start fade-in">
      {/* Mobile Filter Toggle Button */}
      <button 
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden w-full bg-surface-container border border-outline-variant text-on-surface font-button-text py-sm px-md rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[20px]">tune</span>
          Filtrele & Sırala
        </div>
        <span className="material-symbols-outlined transition-transform" style={{ transform: isFilterOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          expand_more
        </span>
      </button>

      {/* Sidebar / Filters */}
      <aside className={`w-full lg:w-64 flex-shrink-0 bg-surface-container-lowest border border-outline-variant rounded-xl p-md lg:sticky lg:top-24 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
        <h2 className="hidden lg:flex font-headline-sm text-primary mb-md border-b border-outline-variant pb-xs items-center gap-xs">
          <span className="material-symbols-outlined text-[20px]">tune</span>
          Filtrele & Sırala
        </h2>

        {/* Sort */}
        <div className="mb-lg">
          <label className="font-label-technical text-on-surface-variant block mb-xs">Sıralama</label>
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border border-outline-variant rounded p-sm font-body-sm bg-surface outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="default">Önerilen</option>
            <option value="price-asc">Fiyat: Ucuzdan Pahalıya</option>
            <option value="price-desc">Fiyat: Pahalıdan Ucuza</option>
            <option value="name-asc">İsim: A'dan Z'ye</option>
            <option value="name-desc">İsim: Z'den A'ya</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="font-label-technical text-on-surface-variant block mb-xs">Fiyat Aralığı (₺)</label>
          <div className="flex items-center gap-xs">
            <input 
              type="number" 
              placeholder="Min" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-outline-variant rounded p-sm font-body-sm bg-surface outline-none focus:border-primary transition-colors"
            />
            <span className="text-on-surface-variant">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-outline-variant rounded p-sm font-body-sm bg-surface outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </aside>

      {/* Main Content: Products */}
      <div className="flex-1 w-full">
        <div className="mb-md flex justify-between items-center bg-surface-container-lowest border border-outline-variant p-sm rounded-lg">
          <span className="font-body-sm text-on-surface-variant">
            Toplam <strong className="text-primary">{filteredAndSortedProducts.length}</strong> ürün listeleniyor.
          </span>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center text-center mt-md">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant mb-md">inventory_2</span>
            <h3 className="font-headline-sm text-primary mb-xs">Sonuç Bulunamadı</h3>
            <p className="font-body-md text-on-surface-variant max-w-sm">
              Seçtiğiniz fiyat aralığına uygun ürün bulunmuyor. Lütfen filtreleri değiştirerek tekrar deneyin.
            </p>
            <button 
              onClick={() => { setMinPrice(""); setMaxPrice(""); }}
              className="mt-sm text-secondary hover:text-secondary-container font-button-text transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
