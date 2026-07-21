import { useMemo, useState } from 'react'
import type {
  Restaurant,
  RestaurantFilters,
} from './restaurants.store.interface'
import { mockRestaurants } from '#/components/ui/data/restaurant.mocks'

const initialFilters: RestaurantFilters = {
  search: '',
  sortBy: 'newest',
  id: null,
}

export const useRestaurants = () => {
  const [filters, setFilters] = useState<RestaurantFilters>(initialFilters)

  const updateFilter = (key: keyof RestaurantFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredRestaurants = useMemo(() => {
    let result = [...mockRestaurants] as Restaurant[]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter((r) => r.name.toLowerCase().includes(query))
    }

    if (filters.id) {
      result = result.filter((r) => r.id === filters.id)
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
  }, [filters.search, filters.sortBy, filters.id])

  const clearFilters = () => setFilters(initialFilters)

  return {
    filters,
    updateFilter,
    restaurants: filteredRestaurants,
    totalRestaurants: filteredRestaurants.length,
    clearFilters,
  }
}