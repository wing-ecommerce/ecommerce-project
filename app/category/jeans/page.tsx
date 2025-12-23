'use client';

import Link from 'next/link';

export default function JeansPage() {
  const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: 'Zone Jeans',
    price: 59.95 + (i % 8) * 5,
    oldPrice: i % 3 === 0 ? 119.95 : null,
    badge: i % 5 === 0 ? 'Hot' : i % 6 === 0 ? '-30%' : null,
    image: `https://via.placeholder.com/400x500/bfdbfe/1e40af?text=Jeans+${i + 1}`,
  }));

  return (
    <>
      {/* Top Category Tabs */}
      <div className="bg-green-50 py-4 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/category/skirt" className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium hover:bg-green-100 transition">
              Skirt
            </Link>
            <Link href="/category/t-shirt" className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium hover:bg-green-100 transition">
              T-Shirt
            </Link>
            <Link href="/category/jeans" className="px-6 py-2.5 bg-green-500 text-white rounded-full font-medium shadow-md">
              Jeans
            </Link>
            <Link href="/category/dress" className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium hover:bg-green-100 transition">
              Dress
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16">
            T-shirt Printing for Everyone
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://via.placeholder.com/600x800/1e293b/ffffff?text=Dark+Jeans"
                alt="Dark Jeans"
                className="w-full object-cover"
              />
            </div>
            <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://via.placeholder.com/600x800/bfdbfe/1e40af?text=Light+Jeans"
                alt="Light Jeans"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 pb-20 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group block">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  {product.badge && (
                    <span className={`absolute top-4 right-4 text-white text-xs font-bold px-4 py-2 rounded-full z-10 ${
                      product.badge === 'Hot' ? 'bg-orange-500' : 'bg-green-500'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 text-center">
                  <p className="text-gray-700 mb-3">{product.name}</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-gray-500 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium">
                    Add+
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-green-500 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition shadow-lg">
            Load More
          </button>
        </div>
      </div>
    </>
  );
}