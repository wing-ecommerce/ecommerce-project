'use client';

import { Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/store/cart.store';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, size: string | undefined, change: number) => void;
  onRemove: (id: number, size?: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg group">
      {/* Clickable Image */}
      <Link href={`/products/${item.slug}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition cursor-pointer"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/100?text=No+Image';
          }}
        />
      </Link>

      <div className="flex-1 min-w-0">
        {/* Clickable Product Name */}
        <Link href={`/products/${item.slug}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-green-600 transition cursor-pointer">
            {item.name}
          </h3>
        </Link>

        {/* Category and Size */}
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-gray-500">{item.categoryName}</p>
          {item.selectedSize && (
            <>
              <span className="text-xs text-gray-400">•</span>
              <p className="text-xs font-medium text-gray-700">
                Size: {item.selectedSize}
              </p>
            </>
          )}
        </div>

        {/* Price */}
        <p className="text-green-600 font-bold mt-1">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
            disabled={item.quantity <= 1}
            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(item.id, item.selectedSize)}
            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition"
            title="Remove from cart"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;