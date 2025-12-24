'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Globe, RefreshCw, Headphones, CreditCard, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
  colors: string[];
  sizes: string[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch products from API route
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      {/* Category Bar at the top */}
      <div className="bg-green-50 py-4 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Skirt', 'T-Shirt', 'Jeans', 'Dress'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition shadow-md ${
                  activeCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-gray-700 font-bold">
              {activeCategory === 'All' ? 'All Products' : `${activeCategory} Collection`}
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
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
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold mt-2 mb-4">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      disabled={!product.inStock}
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle add to cart
                        console.log('Add to cart:', product.slug);
                      }}
                      className={`w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition ${
                        product.inStock
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}