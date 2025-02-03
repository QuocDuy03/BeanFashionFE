import { create } from 'zustand'

type CartState = {
    productCount: number;
    setQuantity: (count: number) => void;
    addToCart: (count: number) => void;
    removeFromCart: (count: number) => void;
    resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    productCount: 0,
    setQuantity: (count = 0) => set({ productCount: count }),
    addToCart: (count) => set((state) => ({ productCount: state.productCount + count })),
    removeFromCart: (count) =>
        set((state) => ({
            productCount: Math.max(0, state.productCount - count)
        })),
    resetCart: () => set({ productCount: 0 }),
}));