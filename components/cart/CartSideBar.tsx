"use client";

import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CartItem from "./CartItem";
import SignInModal from "../ui/SignInModal";
import { useCartStore } from "@/store/cart.store";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { data: session } = useSession();
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const { items, updateQuantity, removeItem, getSubtotal, getTax, getTotal } =
    useCartStore();

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  // Handle checkout click
  const handleCheckout = (e: React.MouseEvent) => {
    if (!session) {
      // User not signed in - show sign-in modal
      e.preventDefault();
      setIsSignInOpen(true);
    } else {
      // User is signed in - close cart and proceed to checkout
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-green-500">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.selectedSize}`}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {session ? (
                // User is signed in - show regular checkout link
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full py-3 text-center font-semibold bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                // User is not signed in - show sign-in button
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 text-center font-semibold bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition"
                >
                  Sign In to Checkout
                </button>
              )}

              {/* Optional: Show message for non-signed-in users */}
              {!session && (
                <p className="text-xs text-center text-gray-500 mt-2">
                  Please sign in to continue with checkout
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  );
};

export default CartSidebar;
