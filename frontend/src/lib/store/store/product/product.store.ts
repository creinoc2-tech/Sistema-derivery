import { useMemo, useState } from 'react'
import type { FilterStates, Productos } from './product.store.interface'
import { mockProducts } from '#/components/ui/data/products.mock'

const initialState: FilterStates = {
  search: '',
  sort: 'relevance',
  categoryId: null,
  availability: 'all',
  priceRange: [0, 100],
  rating: null,
}

export const useProductFilter = () => {
  const [filters, setFilters] = useState<FilterStates>(initialState)
  const [isPending, setIsPending] = useState(false)

  const updateFilter = (
    key: keyof FilterStates,
    value: string | number | string[] | [number, number] | null,
  ) => {
    setIsPending(true)
    setFilters((prev) => ({ ...prev, [key]: value }))
    setTimeout(() => setIsPending(false), 300)
  }

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts] as Productos[]

    if (filters.categoryId) {
      result = result.filter((p) => p.categoryId === filters.categoryId)
    }

    if (filters.availability !== 'all') {
      result = result.filter(
        (p) => p.isAvailable === (filters.availability === 'available'),
      )
    }

    // Rating
    if (filters.rating) {
      result = result.filter((p) => (p.rating ?? 0) >= filters.rating!)
    }

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.description ?? '').toLowerCase().includes(query),
      )
    }

    // BORRAR esto completo, ya no aplica:
    result = result.filter(
      (p) =>
        Number(p.price) >= filters.priceRange[0] &&
        Number(p.price) <= filters.priceRange[1],
    )

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
        break
    }

    return result
  }, [filters])

  const clearAllFilters = () => setFilters(initialState)

  return {
    filters,
    updateFilter,
    products: filteredProducts,
    isPending,
    totalProducts: filteredProducts.length,
    clearAllFilters,
  }
}
