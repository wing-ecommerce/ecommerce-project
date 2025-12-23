'use client';

import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Light Gray');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    name: 'Light Gray Top for Women',
    price: 40.00,
    category: 'MINIMAL WOMEN COLLECTION',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Light Gray', hex: 'f3f4f6' },
      { name: 'Navy Blue', hex: '1e3a8a' },
      { name: 'Black', hex: '111111' },
      { name: 'White', hex: 'ffffff' },
      { name: 'Beige', hex: 'f5f5dc' },
    ],
    mainImage: 'https://i.pinimg.com/1200x/0f/d5/7f/0fd57f4a928ee152571d97bb38c4962d.jpg',
    thumbnails: Array(4).fill('https://i.pinimg.com/736x/2e/09/55/2e0955b94e308c32b6a5e9638b641510.jpg'),
    similarProducts: [
      { name: 'Navy Blue Dots Basic Top', price: 39 },
      { name: 'Minimal Black Top', price: 55 },
      { name: 'Blue Nautical Top', price: 32 },
      { name: 'Navy Blue Checked Top', price: 42 },
    ],
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images */}
          <div className="order-2 lg:order-1 space-y-5">
            {/* Main Image */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full object-cover aspect-[3/4] lg:aspect-square"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  className="rounded-xl overflow-hidden border-2 border-gray-200 hover:border-teal-500 transition"
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="order-1 lg:order-2 space-y-7">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              Home / Women / Tops / <span className="text-gray-900 font-medium">Light Gray Top</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="text-3xl lg:text-4xl font-bold text-teal-600">
              ${product.price.toFixed(2)}
            </div>

            {/* Category */}
            <p className="text-sm uppercase tracking-wide text-gray-600 font-medium">
              {product.category}
            </p>

            {/* Color Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-800">Color</span>
                <span className="text-sm text-gray-600">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-3 transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-teal-500 shadow-md ring-2 ring-teal-200'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: `#${color.hex}` }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-800">Size</span>
                <button className="text-sm text-teal-600 hover:underline">Size Chart</button>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-lg border-2 text-sm font-medium transition ${
                      selectedSize === size
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-3.5 rounded-lg border-2 font-medium flex items-center justify-center gap-2 transition ${
                  isWishlisted
                    ? 'border-pink-500 text-pink-600 bg-pink-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-500' : ''}`} />
                Wishlist
              </button>

              <button className="flex-1 bg-teal-500 text-white py-3.5 rounded-lg font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Product Info Sections */}
            <div className="space-y-6 pt-6 border-t border-gray-200 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Product Details</h3>
                <p className="text-sm leading-relaxed">
                  Light Gray solid top, has a boat neck, 3/4 sleeves. Perfect for casual and minimal styling.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Material & Care</h3>
                <p className="text-sm">100% Cotton</p>
                <p className="text-sm">Machine-wash cold</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Sold by</h3>
                <p className="text-sm font-medium">Wind It Store, Stillwater</p>
                <ul className="text-sm mt-2 space-y-1 text-gray-600">
                  <li>• 90% Positive Feedback</li>
                  <li>• Fast & Reliable Delivery</li>
                  <li>• 3 Months Warranty on All Products</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-20 lg:mt-28">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {product.similarProducts.map((item, i) => (
              <Link href={`/products/${i + 10}`} key={i} className="group">
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                  <img
                    src={`https://i.pinimg.com/1200x/2f/f9/51/2ff951e98b6e7919d5a34564af271fc5.jpg/${i % 2 === 0 ? 'dbeafe' : 'fecaca'}/6b7280?text=${item.name.replace(/ /g, '+')}`}
                    alt={item.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition"
                  />
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.name}</p>
                    <p className="text-xl font-bold text-teal-600">${item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}