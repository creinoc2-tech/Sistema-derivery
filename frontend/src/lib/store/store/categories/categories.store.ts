import { useEffect, useMemo, useState } from 'react'
import type { Categorias, CategoriasFilters } from './categories.store.interface'
import { mockCategories } from '#/components/ui/data/categories.mock'
import { CategoryController } from '#/controllers/category.controller'


const  categoryController = new CategoryController()
const initialFilters: CategoriasFilters = {
  search: '',
  isActive: undefined,
}

export const useCategories = () => {  // ← sin restaurantId
  const [filters, setFilters] = useState<CategoriasFilters>(initialFilters)
  const [allCategories, setAllCategories] = useState<Categorias[]>([])

  const updateFilter = (key: keyof CategoriasFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }


  useEffect(() => {
      categoryController
        .listAll()
        .then((data) => setAllCategories(data as Categorias[]))
   }, [])

  const filteredCategories = useMemo(() => {
    let result = [...allCategories] as Categorias[]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(query))
    }

    if (filters.isActive !== undefined) {
      result = result.filter((c) => c.isActive === filters.isActive)
    }

    return result.sort((a, b) => a.sortOrder - b.sortOrder)
  }, [filters.search, filters.isActive , allCategories])

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