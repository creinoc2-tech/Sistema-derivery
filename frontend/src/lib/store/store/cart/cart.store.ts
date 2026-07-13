import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItems, CartStates } from './cart.store.interface'

const calculateTotals = (items: CartItems[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return { totalItems, subtotal }
}

export const useCartStore = create<CartStates>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isOpenMenu: false,
      totalItems: 0,
      subtotal: 0,
      deliveryFee: 0,
      deliveryAddressId: null,
      restaurantId: null,

      addItem: (item, restaurantId) => {
        const currentRestaurantId = get().restaurantId
        const currentItems =
          currentRestaurantId && currentRestaurantId !== restaurantId
            ? []
            : get().items

        const existingItem = currentItems.find((i) => i.productId === item.productId)
        let newItems: CartItems[]

        if (existingItem) {
          newItems = currentItems.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          )
        } else {
          newItems = [...currentItems, { ...item, id: item.productId }]
        }

        set({
          items: newItems,
          restaurantId,
          isOpen: true,
          ...calculateTotals(newItems),
        })
      },

      removeItem: (id) => {
        const newItems = get().items.filter((i) => i.id !== id)
        set({
          items: newItems,
          restaurantId: newItems.length === 0 ? null : get().restaurantId,
          ...calculateTotals(newItems),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        const newItems = get().items.map((i) =>
          i.id === id ? { ...i, quantity } : i,
        )
        set({ items: newItems, ...calculateTotals(newItems) })
      },

      clearCart: () =>
        set({ items: [], totalItems: 0, subtotal: 0, restaurantId: null }),

      setIsOpen: (isOpen) => set({ isOpen }),
      setIsOpenMenu: (isOpenMenu) => set({ isOpenMenu }),
      toggleOpen: () => set({ isOpen: !get().isOpen }),

      setDeliveryFee: (fee) => set({ deliveryFee: fee }),
      setDeliveryAddressId: (addressId) => set({ deliveryAddressId: addressId }),
    }),
    {
      name: 'carts-storage',
      partialize: (state) => ({ items: state.items, restaurantId: state.restaurantId }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { totalItems, subtotal } = calculateTotals(state.items)
          state.totalItems = totalItems
          state.subtotal = subtotal
        }
      },
    },
  ),
)
