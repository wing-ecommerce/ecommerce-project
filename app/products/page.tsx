"use client";

import { useState } from "react";
import CardCheckOut from "@/components/CardCheckOut";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Example product list
  const products = [
    { id: 1, name: "Product 1", price: 50 },
    { id: 2, name: "Product 2", price: 100 },
  ];

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Our Products
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Discover our amazing products here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Checkout Card */}
      {isCheckoutOpen && selectedProduct && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50">
          <CardCheckOut
            product={selectedProduct}
            isOpen={isCheckoutOpen}
            onClose={handleCloseCheckout}
          />
        </div>
      )}
    </div>
  );
}
