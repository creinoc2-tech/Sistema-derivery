import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LocationStates } from './location.interface'

export const useLocationStore = create<LocationStates>()(
    persist(
        (set, get) => ({
            items : [],
            isOpen: false,
            setIsOpen: (isOpen: boolean) => set({ isOpen }),


            clearCart: () => set({ items: [] }),

            addItem: (item, userId) => {
            
            }
        }),



        {
            name: 'location-storage',
        }
    )
)