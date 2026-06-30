import type { CartItem, CartState } from './cart.store.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return { totalItems, subtotal }
}

export const useCartStore = create<CartState>()(
  persist((set, get) => ({
    items: [],
    isOpen: false,
    isOpenMenu: false,
    totalItems: 0,
    subtotal: 0,
    shippingMethod: null,
    shippingAddress: null,
    shippingCost: 0,
    addItem: (item) => {
      const currentItems = get().items
      const itemId = `${item.productId}-${item.color || ''}-${item.size || ''}`
      const existingItem = currentItems.find((i) => i.id === itemId)
      let newItems: CartItem[]

      if (existingItem) {
        newItems = currentItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + item.quantity } : i,
        )
      } else {
        newItems = [...currentItems, { ...item, id: itemId }]
      }

      set({
        items: newItems,
        isOpen: true,
        ...calculateTotals(newItems),
      })
    },
    removeItem: (id) => {
      const newItems = get().items.filter((i) => i.id !== id)
      set({
        items: newItems,
        ...calculateTotals(newItems),
      })
    },
    updateQuantity: (id, quantity) => {
      if (quantity < 1) return
      const newItems = get().items.map((i) =>
        i.id === id ? { ...i, quantity } : i,
      )
      set({
        items: newItems,
        ...calculateTotals(newItems),
      })
    },
    clearCart: () => set({ items: [], totalItems: 0, subtotal: 0 }),
    setIsOpen: (isOpen) => set({ isOpen }),
    setIsOpenMenu: (isOpenMenu) => set({ isOpenMenu }),
    toggleOpen: () => set({ isOpen: !get().isOpen }),
    setShippingMethod: (method) => {
      const shippingCost = method ? Number(method.price) : 0
      set({ shippingMethod: method, shippingCost })
    },
    setShippingAddress: (address) => set({ shippingAddress: address }),
 }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { totalItems, subtotal } = calculateTotals(state.items);
          state.totalItems = totalItems;
          state.subtotal = subtotal;
        }
      },
    },
  ),
);