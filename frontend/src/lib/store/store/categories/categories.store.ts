// src/lib/store/store/categories/categories.store.ts
import { useEffect, useMemo, useState } from 'react'
import type { Categorias, CategoriasFilters } from './categories.store.interface'
import { CategoryController } from '#/controllers/category.controller'

const categoryController = new CategoryController()

const initialFilters: CategoriasFilters = {
  search: '',
}

export const useCategories = (restaurantId: string) => {
  const [filters, setFilters] = useState<CategoriasFilters>(initialFilters)
  const [categories, setCategories] = useState<Categorias[]>([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    categoryController
      .list(restaurantId)
      .then((data) => setCategories(data))
      .finally(() => setIsPending(false))
  }, [restaurantId])

  const updateFilter = (key: keyof CategoriasFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredCategories = useMemo(() => {
    let result = [...categories]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(query))
    }

    return result.sort((a, b) => a.sortOrder - b.sortOrder)
  }, [categories, filters.search])

  const clearFilters = () => setFilters(initialFilters)

  return {
    filters,
    updateFilter,
    categories: filteredCategories,
    totalCategories: filteredCategories.length,
    isPending,
    clearFilters,
  }
}