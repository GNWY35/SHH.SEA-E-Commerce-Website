import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from './data';

export type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (product) => set((state) => {
        const existing = state.items.find((item) => item.id === product.id);
        if (existing) {
          return { items: state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item), isOpen: true };
        }
        return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      increaseQuantity: (id) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      })),
      decreaseQuantity: (id) => set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
          return item;
        })
      })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (isOpen) => set({ isOpen }),
    }),
    { name: 'shh-cart' }
  )
);
