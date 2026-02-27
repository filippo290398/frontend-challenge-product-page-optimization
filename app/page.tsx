import { getAllProducts, getCategories } from "@/lib/api";
import ProductListClient from "@/components/ProductListClient";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <ProductListClient products={products} categories={categories} />
    </main>
  );
}
