import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/400x600?text=No+Image';
          }}
        />
        {product.discount > 0 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">
          {product.category.name}
        </span>
        <h3 className="text-lg font-bold mt-2 mb-4 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* View Details Text */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 group-hover:text-green-600 transition font-medium">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}