import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  categoryName: string;
  inStock: boolean;
  selectedSize?: string; // Add size field
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size?: string) => void; // Add size parameter
  removeItem: (id: number, size?: string) => void; // Add size parameter for uniqueness
  updateQuantity: (id: number, size: string | undefined, change: number) => void; // Add size parameter
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size) => {
        const items = get().items;
        // Find item with same id AND size
        const existingItem = items.find(
          (item) => item.id === product.id && item.selectedSize === size
        );

        if (existingItem) {
          // If item with same size exists, increase quantity
          set({
            items: items.map((item) =>
              item.id === product.id && item.selectedSize === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item to cart with selected size
          const newItem: CartItem = {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            categoryName: product.category.name,
            inStock: product.inStock,
            selectedSize: size,
          };
          set({ items: [...items, newItem] });
        }

        // Open cart sidebar
        set({ isOpen: true });
      },

      removeItem: (id, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.selectedSize === size)
          ),
        });
      },

      updateQuantity: (id, size, change) => {
        set({
          items: get().items.map((item) =>
            item.id === id && item.selectedSize === size
              ? { ...item, quantity: Math.max(1, item.quantity + change) }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTax: () => {
        return get().getSubtotal() * 0.0; // 0% tax
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax();
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);