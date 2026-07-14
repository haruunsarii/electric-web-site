import { prisma } from "@/lib/prisma";
import ProductList from "./ProductList";

export default async function AdminProductsPage() {
  // Fetch products and categories to pass to the Client Component
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { categorySlug: 'asc' },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  return (
    <div className="flex flex-col gap-lg fade-in">
      <ProductList products={products} categories={categories} />
    </div>
  );
}
