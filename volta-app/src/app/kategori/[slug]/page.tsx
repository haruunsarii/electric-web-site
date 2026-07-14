import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CategoryProductGrid from "./CategoryProductGrid";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug;
  
  // Fetch category and products from DB
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug }
  });
  
  const products = await prisma.product.findMany({
    where: { categorySlug: categorySlug }
  });

  const categoryTitle = category ? category.name : categorySlug;

  return (
    <div className="min-h-screen bg-surface dark:bg-inverse-surface pt-10 pb-20 fade-in">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Breadcrumb / Back Link */}
        <div className="mb-md">
          <Link
            href="/#kategoriler"
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs font-button-text text-button-text"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              arrow_back
            </span>
            Kategorilere Dön
          </Link>
        </div>

        {/* Header */}
        <div className="mb-xl border-b border-outline-variant pb-md">
          <h1 className="font-display-md text-display-md text-primary mb-xs">
            {categoryTitle}
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            {categoryTitle} kategorisindeki ürünler listeleniyor.
          </p>
        </div>

        {/* Product Grid / Filters */}
        {products.length > 0 ? (
          <CategoryProductGrid initialProducts={products} />
        ) : (
          <div className="text-center py-20 bg-surface-container rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-sm">
              inventory_2
            </span>
            <h2 className="font-headline-md text-primary mb-xs">Ürün Bulunamadı</h2>
            <p className="font-body-md text-on-surface-variant">
              Bu kategoride henüz ürün bulunmamaktadır.
            </p>
            <Link
              href="/#kategoriler"
              className="inline-block mt-md bg-primary text-on-primary px-lg py-sm rounded hover:bg-primary-container transition-colors uppercase font-button-text"
            >
              Kategorilere Dön
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
