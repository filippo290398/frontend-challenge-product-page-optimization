import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold text-lg truncate">{product.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-xl font-semibold mt-2">${product.price}</p>
      </div>
    </Link>
  );
}
