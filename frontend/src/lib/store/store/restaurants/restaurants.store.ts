// src/lib/store/store/restaurants/restaurants.store.ts
import { useEffect, useMemo, useState } from 'react'
import type {
  Restaurant,
  RestaurantFilters,
} from './restaurants.store.interface'
import { RestaurantsController } from '#/controllers/restaurants.controller'
 
const restaurantController = new RestaurantsController()

const initialFilters: RestaurantFilters = {
  search: '',
  sortBy: 'newest',
}

export const useRestaurants = () => {
  const [filters, setFilters] = useState<RestaurantFilters>(initialFilters)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    restaurantController
      .list()
      .then((data) => setRestaurants(data))
      .finally(() => setIsPending(false))
  }, [])

  const updateFilter = (key: keyof RestaurantFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter((r) => r.name.toLowerCase().includes(query))
    }

    // solo mostrar restaurantes aprobados en el storefront público
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
  }, [restaurants, filters.search, filters.sortBy])

  const clearFilters = () => setFilters(initialFilters)

  return {
    filters,
    updateFilter,
    restaurants: filteredRestaurants,
    totalRestaurants: filteredRestaurants.length,
    isPending,
    clearFilters,
  }
}
