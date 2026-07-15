// src/types/categoria-types.ts
export interface Category {
  id: string
  restaurantId: string
  name: string
  slug: string
  sortOrder: number
  isActive: boolean
  createdAt: string
}

export interface CategoryFilters {
  search?: string
}