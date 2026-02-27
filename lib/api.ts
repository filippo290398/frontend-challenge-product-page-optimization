import { Product } from "@/types/product";

const API_BASE = "https://dummyjson.com";

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products?limit=100`, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getCategories(): Promise<
  { slug: string; name: string }[]
> {
  const res = await fetch(`${API_BASE}/products/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();

  if (!Array.isArray(data)) return [];

  // If the API returns strings, convert them to objects
  if (data.length > 0 && typeof data[0] === "string") {
    return data.map((cat) => ({ slug: cat, name: cat }));
  }

  // If it returns objects (with name, slug, url)
  if (data.length > 0 && typeof data[0] === "object") {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return data.map((cat: any) => ({
      /* eslint-enable @typescript-eslint/no-explicit-any */
      slug: cat.slug || cat.name,
      name: cat.name,
    }));
  }

  return [];
}
