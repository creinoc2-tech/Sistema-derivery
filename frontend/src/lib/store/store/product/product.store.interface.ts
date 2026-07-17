export interface Productos {
  id: string
  restaurantId: string
  categoryId: string
  name: string
  slug: string
  description?: string
  price: string | number
  imageUrl?: string
  isAvailable: boolean
  createdAt: string
  rating?: number
}

export interface ProductFilters {
  categoryId?: string
  isAvailable?: boolean
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'newest'

export interface FilterStates {
  search: string
  sort: SortOption
  categoryId: string | null
  availability: 'all' | 'available' | 'unavailable'
  priceRange: [number, number]
  rating: number | null
}
