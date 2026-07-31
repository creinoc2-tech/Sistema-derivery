import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LocationItems, LocationStates } from './location.interface'

export const useLocationStore = create<LocationStates>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen: boolean) => set({ isOpen }),

      clearLocation: () => set({ items: [] }),

      addItem: (item) => {
        const newItem: LocationItems = {
          ...item,
        }

        // Reemplaza la ubicación activa en vez de acumular: este store
        // guarda UNA sola ubicación seleccionada, no un address book.
        set({ items: [newItem] })
      },
    }),

    {
      name: 'location-storage',
    },
  ),
)
