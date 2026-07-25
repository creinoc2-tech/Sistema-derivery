import { create } from 'zustand'
import { useEffect, useMemo, useState } from 'react'
import type {
  Restaurant,
  RestaurantFilters,
} from './restaurants.store.interface'
import { RestaurantsController } from '#/controllers/restaurants.controller'

const restaurantsController = new RestaurantsController()

const initialFilters: RestaurantFilters = {
  search: '',
  sortBy: 'newest',
  id: null,
}

interface RestaurantsStore {
  filters: RestaurantFilters
  currentRestaurant: Restaurant | null
  updateFilter: (key: keyof RestaurantFilters, value: string) => void
  clearFilters: () => void
  setCurrentRestaurant: (restaurant: Restaurant | null) => void
}

const useRestaurantsStore = create<RestaurantsStore>((set) => ({
  filters: initialFilters,
  currentRestaurant: null,

  updateFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  clearFilters: () => set({ filters: initialFilters }),

  setCurrentRestaurant: (restaurant) => set({ currentRestaurant: restaurant }),
}))

export const useRestaurants = () => {
  const {
    filters,
    updateFilter,
    clearFilters,
    currentRestaurant,
    setCurrentRestaurant,
  } = useRestaurantsStore()

  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    restaurantsController
      .list()
      .then((data) => setAllRestaurants(data as Restaurant[]))
      .finally(() => setIsPending(false))
  }, [])

  const restaurants = useMemo(() => {
    let result = [...allRestaurants]

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
  }, [allRestaurants, filters.search, filters.sortBy, filters.id])

  // busca por slug SOBRE los datos ya traídos por list() — no llama a getOne
  const getRestaurantBySlug = (slug: string) => {
    const found = allRestaurants.find((r) => r.slug === slug) ?? null
    setCurrentRestaurant(found)
    return found
  }

  return {
    filters,
    updateFilter,
    clearFilters,
    restaurants,
    totalRestaurants: restaurants.length,
    currentRestaurant,
    getRestaurantBySlug,
    isPending,
  }
}
