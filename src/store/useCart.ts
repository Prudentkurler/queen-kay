import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  qty: number;
  weight?: number;
  image: string;
  type: 'preorder' | 'instock';
  category?: string;
  estimatedDelivery?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  
  // Selectors
  totalItems: () => number;
  subtotal: () => number;
  shippingEstimate: (zone?: string) => number;
  taxEstimate: () => number;
  grandTotal: () => number;
  
  // Helper for checkout
  toOrderPayload: () => {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    timestamp: string;
  };
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          // Check if item already exists
          const existingItem = state.items.find(
            (i) => i.productId === item.productId
          );

          if (existingItem) {
            // Update quantity
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, qty: i.qty + item.qty }
                  : i
              ),
            };
          }

          // Add new item with unique ID
          return {
            items: [
              ...state.items,
              { ...item, id: `${item.productId}-${Date.now()}` },
            ],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQty: (productId, qty) =>
        set((state) => {
          if (qty <= 0) {
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, qty } : i
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      totalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.qty, 0);
      },

      subtotal: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.price * item.qty,
          0
        );
      },

      shippingEstimate: (zone = 'local') => {
        const state = get();
        const subtotal = state.subtotal();
        const totalWeight = state.items.reduce(
          (total, item) => total + (item.weight || 1) * item.qty,
          0
        );

        // Simple shipping calculation based on subtotal and weight
        // Free shipping over GH₵ 500
        if (subtotal >= 500) return 0;

        // Flat rates based on weight and zone
        if (zone === 'local') {
          return totalWeight > 5 ? 30 : 20;
        } else if (zone === 'regional') {
          return totalWeight > 5 ? 50 : 35;
        }

        return 25; // default
      },

      taxEstimate: () => {
        const state = get();
        const subtotal = state.subtotal();
        // Simple VAT calculation (12.5%)
        return subtotal * 0.125;
      },

      grandTotal: () => {
        const state = get();
        const subtotal = state.subtotal();
        const shipping = state.shippingEstimate();
        const tax = state.taxEstimate();
        return subtotal + shipping + tax;
      },

      toOrderPayload: () => {
        const state = get();
        return {
          items: state.items,
          subtotal: state.subtotal(),
          shipping: state.shippingEstimate(),
          tax: state.taxEstimate(),
          total: state.grandTotal(),
          timestamp: new Date().toISOString(),
        };
      },
    }),
    {
      name: "queenkay-cart", // localStorage key
      // Only persist items, not UI state like isOpen
      partialize: (state) => ({ items: state.items }),
    }
  )
);
