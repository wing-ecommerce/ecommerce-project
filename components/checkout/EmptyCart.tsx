'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some items to get started</p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}