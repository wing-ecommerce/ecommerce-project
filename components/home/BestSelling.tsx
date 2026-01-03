'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../product/ProductCard';
import { Product } from '@/types/product';

interface BestSellingProps {
  title?: string;
  limit?: number;
}

export default function BestSellingSection({ 
  title = "Best Selling Products",
  limit = 8
}: BestSellingProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        const bestSelling = data
          .filter((p: Product) => p.inStock)
          .slice(0, limit);
        
        setProducts(bestSelling);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching best selling products:', error);
        setLoading(false);
      }
    };

    fetchBestSellingProducts();
  }, [limit]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular items loved by customers worldwide
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}