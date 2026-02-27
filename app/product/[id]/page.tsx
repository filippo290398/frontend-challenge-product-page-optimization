import { getAllProducts, getProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) {
    notFound();
  }

  // Use availabilityStatus if available, otherwise derive from stock
  const availability =
    product.availabilityStatus ||
    (product.stock > 0 ? "In Stock" : "Out of Stock");
  const availabilityColor =
    product.stock > 0 ? "text-green-600" : "text-red-600";

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Carousel images={product.images} title={product.title} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            {product.brand && (
              <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
            )}
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-semibold">${product.price}</p>
              {product.discountPercentage > 0 && (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {product.discountPercentage}% off
                </span>
              )}
            </div>
            <p className={`text-lg font-medium mb-2 ${availabilityColor}`}>
              {availability}
            </p>
            {product.stock > 0 && (
              <p className="text-sm text-gray-600 mb-2">
                Only {product.stock} left
              </p>
            )}
            {product.rating && (
              <p className="text-sm text-gray-600 mb-2">
                Rating: {product.rating} / 5
              </p>
            )}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
