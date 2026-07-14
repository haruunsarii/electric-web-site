import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/ProductCard";

export default async function UrunDetayPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  // Fetch product from DB
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });
  
  if (!product) {
    notFound();
  }

  // Fetch category info to show in breadcrumb
  const category = await prisma.category.findUnique({
    where: { slug: product.categorySlug }
  });

  // Fetch some related products (same category, excluding current product)
  const relatedProducts = await prisma.product.findMany({
    where: { 
      categorySlug: product.categorySlug,
      id: { not: product.id }
    },
    take: 4
  });

  return (
    <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-10 pb-20 fade-in">
      <div className="max-w-container-max mx-auto px-gutter">
        
        {/* Breadcrumb */}
        <div className="mb-lg flex items-center gap-xs text-body-sm font-body-sm text-on-surface-variant overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          {category ? (
            <>
              <Link href={`/kategori/${category.slug}`} className="hover:text-primary transition-colors">
                {category.name}
              </Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </>
          ) : (
            <>
              <span>Kategori: {product.categorySlug}</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </>
          )}
          <span className="text-on-surface font-bold truncate max-w-[200px] md:max-w-none">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-md md:p-xl shadow-sm mb-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
            
            {/* Left: Image Gallery (Single Image for now) */}
            <div className="bg-surface-variant rounded-xl aspect-square relative overflow-hidden flex items-center justify-center border border-outline-variant/50">
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 hover:scale-125 cursor-zoom-in"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
            </div>

            {/* Right: Product Details & Actions */}
            <div className="flex flex-col">
              <div className="mb-md border-b border-outline-variant pb-md">
                <div className="flex items-center gap-sm mb-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">inventory</span>
                  <span className="font-label-technical">Stok Kodu: VE-{product.id.substring(0, 6).toUpperCase()}</span>
                </div>
                <h1 className="font-display-sm md:font-display-md text-primary font-bold mb-md">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-sm mb-lg">
                  <div className="flex text-secondary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-[14px]">4.8 (24 Değerlendirme)</span>
                </div>

                <div className="font-body-lg text-on-surface leading-relaxed">
                  {product.description}
                </div>
              </div>

              {/* Client Component for Interaction */}
              <div className="flex-1">
                <ProductDetailClient product={product} />
              </div>
              
              {/* Trust Badges */}
              <div className="mt-xl grid grid-cols-3 gap-sm border-t border-outline-variant pt-lg">
                <div className="flex flex-col items-center text-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[28px]">local_shipping</span>
                  <span className="font-label-technical text-[11px]">Aynı Gün Kargo</span>
                </div>
                <div className="flex flex-col items-center text-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[28px]">verified_user</span>
                  <span className="font-label-technical text-[11px]">2 Yıl Garanti</span>
                </div>
                <div className="flex flex-col items-center text-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[28px]">support_agent</span>
                  <span className="font-label-technical text-[11px]">Teknik Destek</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specs Tabs */}
        <div className="mb-2xl">
          <h2 className="font-headline-md text-primary font-bold mb-md border-b border-outline-variant pb-xs">Teknik Özellikler</h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <tbody className="font-body-md text-on-surface">
                <tr className="border-b border-outline-variant bg-surface-container-low/30">
                  <th className="py-sm px-md font-bold text-on-surface-variant w-1/3 border-r border-outline-variant">Marka</th>
                  <td className="py-sm px-md">Volta Electric</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <th className="py-sm px-md font-bold text-on-surface-variant w-1/3 border-r border-outline-variant">Kategori</th>
                  <td className="py-sm px-md">{category?.name || product.categorySlug}</td>
                </tr>
                <tr className="border-b border-outline-variant bg-surface-container-low/30">
                  <th className="py-sm px-md font-bold text-on-surface-variant w-1/3 border-r border-outline-variant">Garanti Süresi</th>
                  <td className="py-sm px-md">24 Ay</td>
                </tr>
                <tr>
                  <th className="py-sm px-md font-bold text-on-surface-variant w-1/3 border-r border-outline-variant">Stok Durumu</th>
                  <td className="py-sm px-md text-secondary font-bold">Stokta Var</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-headline-md text-primary font-bold mb-md border-b border-outline-variant pb-xs">Benzer Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-md">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
