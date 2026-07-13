import { useEffect, useMemo, useState } from 'react'
import type { FilterStates, Products } from './product.store.interface'
import { ProductController } from '#/controllers/product.controller'

const productController = new ProductController()

const initialState: FilterStates = {
  search: '',
  sort: 'relevance',
  categoryId: null,
  availability: 'all',
}

export const useProductFilters = (restaurantId: string) => {
  const [filters, setFilters] = useState<FilterStates>(initialState)
  const [products, setProducts] = useState<Products[]>([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    productController
      .list(restaurantId, {
        categoryId: filters.categoryId ?? undefined,
        isAvailable:
          filters.availability === 'all'
            ? undefined
            : filters.availability === 'available',
      })
      .then((data) => setProducts(data))
      .finally(() => setIsPending(false))
  }, [restaurantId, filters.categoryId, filters.availability])

  const updateFilter = (key: keyof FilterStates, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.description ?? '').toLowerCase().includes(query),
      )
    }

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => Number(a.price) - Number(b.price))
        break
      case 'price-desc':
        result.sort((a, b) => Number(b.price) - Number(a.price))
        break
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        break
      default:
        // 'relevance' → sin orden específico
        break
    }

    return result
  }, [products, filters.search, filters.sort])

  const clearAllFilters = () => setFilters(initialState)

  return {
    filters,
    updateFilter,
    products: filteredProducts,
    totalProducts: filteredProducts.length,
    isPending,
    clearAllFilters,
  }
}
