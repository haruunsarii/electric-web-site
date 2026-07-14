import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const rawQuery = resolvedParams.q || "";
  const query = rawQuery.trim().toLowerCase();

  // Fetch all products since we want case-insensitive search and Prisma SQLite doesn't natively support it easily.
  // 210 products is small enough for in-memory filtering. For huge DBs, a different strategy (like FTS or lowercased columns) is needed.
  const allProducts = await prisma.product.findMany();
  
  const filteredProducts = query 
    ? allProducts.filter((p) => p.name.toLowerCase().includes(query))
    : [];

  return (
    <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-24 pb-xl px-gutter max-w-container-max mx-auto fade-in">
      <div className="mb-lg">
        <h1 className="font-display-md text-primary font-bold mb-xs">Arama Sonuçları</h1>
        {query ? (
          <p className="font-body-lg text-on-surface-variant">
            &quot;<span className="font-bold text-primary">{rawQuery}</span>&quot; için {filteredProducts.length} ürün bulundu.
          </p>
        ) : (
          <p className="font-body-lg text-on-surface-variant">
            Lütfen aramak istediğiniz ürünü yazın.
          </p>
        )}
      </div>

      {query && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md md:gap-lg">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query && filteredProducts.length === 0 ? (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-surface-variant rounded-full flex items-center justify-center mb-md text-on-surface-variant">
            <span className="material-symbols-outlined text-[40px]">search_off</span>
          </div>
          <h2 className="font-headline-md text-primary font-bold mb-xs">
            Aradığınız ürün bulunamadı
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
            &quot;{rawQuery}&quot; kelimesi ile eşleşen bir ürünümüz stoklarımızda mevcut değil. Lütfen başka bir kelime ile tekrar arama yapmayı deneyin veya kataloğumuzu inceleyin.
          </p>
        </div>
      ) : null}
    </main>
  );
}
