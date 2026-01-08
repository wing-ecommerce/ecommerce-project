'use client';

import { ShoppingCart } from 'lucide-react';
import { CartItem } from '@/store/cart.store';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 sticky top-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.selectedSize}`}
            className="flex gap-3 p-3 rounded-lg bg-gray-50"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/100?text=No+Image';
                }}
              />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                {item.name}
              </h3>
              {item.selectedSize && (
                <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
              )}
              <p className="text-green-600 font-bold text-sm mt-1">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 py-4 border-t border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t-2 border-gray-300">
          <span>Total</span>
          <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Desktop Pay Button */}
      <button
        onClick={onCheckout}
        className="hidden lg:block w-full py-4 bg-green-500 text-white font-bold text-lg rounded-full hover:bg-green-600 transition-all shadow-lg mt-6"
      >
        Pay Now
      </button>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">🔒 Secure payment via KHQR</p>
      </div>
    </div>
  );
}