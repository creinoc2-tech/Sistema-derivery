import { useMemo, useState } from 'react'
import type { Categorias, CategoriasFilters } from './categories.store.interface'
import { mockCategories } from '#/components/ui/data/categories.mock'

const initialFilters: CategoriasFilters = {
  search: '',
  isActive: undefined,
}

export const useCategories = () => {  // ← sin restaurantId
  const [filters, setFilters] = useState<CategoriasFilters>(initialFilters)

  const updateFilter = (key: keyof CategoriasFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredCategories = useMemo(() => {
    let result = [...mockCategories] as Categorias[]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(query))
    }

    if (filters.isActive !== undefined) {
      result = result.filter((c) => c.isActive === filters.isActive)
    }

    return result.sort((a, b) => a.sortOrder - b.sortOrder)
  }, [filters.search, filters.isActive])

  const clearFilters = () => setFilters(initialFilters)

  return {
    filters,
    updateFilter,
    categories: filteredCategories,
    totalCategories: filteredCategories.length,
    isPending: false,
    clearFilters,
  }
}