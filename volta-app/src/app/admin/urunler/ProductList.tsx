"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: Category;
};

export default function ProductList({ products, categories }: { products: Product[], categories: Category[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleAddOrEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      price: formData.get("price"),
      categorySlug: formData.get("categorySlug"),
      image: formData.get("image") || "",
      description: formData.get("description") || "",
    };

    try {
      let res;
      if (editingProduct) {
        res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }
      
      if (res.ok) {
        handleCloseModal();
        router.refresh();
      } else {
        alert(editingProduct ? "Ürün güncellenemedi." : "Ürün eklenemedi.");
      }
    } catch (err) {
      alert("Hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Ürün silinemedi.");
      }
    } catch (err) {
      alert("Hata oluştu.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-lg">
        <div>
          <h1 className="font-display-sm text-primary mb-xs">Ürün Yönetimi</h1>
          <p className="font-body-md text-on-surface-variant">
            Sistemdeki tüm ürünleri listeleyebilir ve stok durumlarını görebilirsiniz.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-on-primary font-button-text px-md py-sm rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm flex items-center gap-xs"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Yeni Ürün Ekle
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface">
          <h2 className="font-headline-sm text-primary">Tüm Ürünler</h2>
          <span className="font-body-sm text-on-surface-variant bg-surface-variant px-sm py-xs rounded">
            Toplam: {products.length}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant font-label-technical text-on-surface-variant">
                <th className="p-md font-normal w-16">Görsel</th>
                <th className="p-md font-normal min-w-[200px]">Ürün Adı</th>
                <th className="p-md font-normal">Kategori</th>
                <th className="p-md font-normal text-right">Fiyat</th>
                <th className="p-md font-normal text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-xl text-center text-on-surface-variant font-body-md">
                    Hiç ürün bulunamadı. Lütfen ürün ekleyin.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-outline-variant hover:bg-surface-container/50 transition-colors">
                    <td className="p-md">
                      <div className="w-12 h-12 rounded bg-surface-variant bg-cover bg-center border border-outline-variant" style={{ backgroundImage: `url(${product.image})` }} />
                    </td>
                    <td className="p-md font-body-md text-primary font-bold">
                      <div className="line-clamp-2">{product.name}</div>
                    </td>
                    <td className="p-md font-body-md text-on-surface-variant">
                      <span className="bg-surface-container-high px-sm py-[2px] rounded-full text-[12px]">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="p-md font-body-md text-on-surface font-bold text-right whitespace-nowrap">
                      {product.price.toFixed(2)} ₺
                    </td>
                    <td className="p-md text-right whitespace-nowrap">
                      <button onClick={() => handleOpenModal(product)} className="text-secondary hover:bg-secondary-container hover:text-on-secondary-container p-sm rounded transition-colors mr-xs" title="Düzenle">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="text-error hover:bg-error-container hover:text-on-error-container p-sm rounded transition-colors" title="Sil">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-surface-variant/80 backdrop-blur-sm z-[100] flex items-center justify-center p-md fade-in">
          <div className="bg-surface-container-lowest w-[90vw] md:w-[500px] rounded-2xl shadow-md border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface">
              <h2 className="font-headline-sm text-primary flex items-center gap-xs">
                <span className="material-symbols-outlined">{editingProduct ? 'edit' : 'add_box'}</span>
                {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-on-surface-variant hover:text-error transition-colors p-xs"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-md overflow-y-auto">
              <form id="add-product-form" key={editingProduct?.id || 'new'} onSubmit={handleAddOrEditProduct} className="flex flex-col gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Ürün Adı *</label>
                  <input type="text" name="name" defaultValue={editingProduct?.name || ""} required className="w-full border border-outline-variant rounded p-sm font-body-md bg-surface outline-none focus:border-primary" />
                </div>
                
                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Kategori *</label>
                  <select name="categorySlug" defaultValue={editingProduct?.category.slug || ""} required className="w-full border border-outline-variant rounded p-sm font-body-md bg-surface outline-none focus:border-primary">
                    <option value="">Seçiniz...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Fiyat (₺) *</label>
                  <input type="number" step="0.01" name="price" defaultValue={editingProduct?.price || ""} required className="w-full border border-outline-variant rounded p-sm font-body-md bg-surface outline-none focus:border-primary" />
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Görsel Linki (URL)</label>
                  <input type="url" name="image" defaultValue={editingProduct?.image || ""} placeholder="https://..." className="w-full border border-outline-variant rounded p-sm font-body-md bg-surface outline-none focus:border-primary" />
                  <span className="text-[12px] text-on-surface-variant">Boş bırakırsanız varsayılan görsel atanır.</span>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="font-label-technical text-on-surface-variant">Açıklama</label>
                  <textarea name="description" defaultValue={editingProduct?.description || ""} rows={3} className="w-full border border-outline-variant rounded p-sm font-body-md bg-surface outline-none focus:border-primary resize-none"></textarea>
                </div>
              </form>
            </div>

            <div className="p-md border-t border-outline-variant bg-surface flex justify-end gap-sm">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-md py-sm rounded font-button-text text-on-surface-variant hover:bg-surface-variant transition-colors"
              >
                İptal
              </button>
              <button 
                type="submit" 
                form="add-product-form"
                disabled={isSubmitting}
                className={`px-md py-sm rounded font-button-text text-on-primary transition-colors ${isSubmitting ? 'bg-surface-variant text-on-surface-variant' : 'bg-primary hover:bg-primary-fixed hover:text-on-primary-fixed'}`}
              >
                {isSubmitting ? 'Ekleniyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
