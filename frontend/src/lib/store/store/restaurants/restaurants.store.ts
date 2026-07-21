// restaurants.store.ts
import { create } from 'zustand'
import { useMemo } from 'react'
import type { Restaurant, RestaurantFilters } from './restaurants.store.interface'
import { mockRestaurants } from '#/components/ui/data/restaurant.mocks'

const initialFilters: RestaurantFilters = {
  search: '',
  sortBy: 'newest',
  id: null,
 }

interface RestaurantsStore {
  filters: RestaurantFilters
  currentRestaurant: Restaurant | null       // ← agregar
  updateFilter: (key: keyof RestaurantFilters, value: string) => void
  clearFilters: () => void
  setCurrentRestaurant: (slug: string) => void  // ← agregar
}

const useRestaurantsStore = create<RestaurantsStore>((set) => ({
  filters: initialFilters,
  currentRestaurant: null,                   // ← agregar

  updateFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  clearFilters: () => set({ filters: initialFilters }),

  setCurrentRestaurant: (slug) => {          // ← agregar
    const found = mockRestaurants.find((r) => r.slug === slug) ?? null
    set({ currentRestaurant: found })
  },
}))

export const useRestaurants = () => {
  const {
    filters,
    updateFilter,
    clearFilters,
    currentRestaurant,
    setCurrentRestaurant,
  } = useRestaurantsStore()

  const restaurants = useMemo(() => {
    let result = [...mockRestaurants] as Restaurant[]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter((r) => r.name.toLowerCase().includes(query))
    }

    if (filters.id) {
      result = result.filter((r) => r.id === filters.id)
    }

    result = result.filter((r) => r.status === 'approved')

    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        break
    }

    return result
  }, [filters.search, filters.sortBy, filters.id])

  return {
    filters,
    updateFilter,
    clearFilters,
    restaurants,
    totalRestaurants: restaurants.length,
    currentRestaurant,           // ← exponer
    setCurrentRestaurant,        // ← exponer
  }
}