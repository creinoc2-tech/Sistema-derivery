export interface Categorias {
  id: string
  restaurantId: string
  name: string
  slug: string
  imageUrl: string
  description: string
  sortOrder: number
  isActive: boolean
  createdAt: string
}

export interface CategoriasFilters {
  search?: string
  isActive?: boolean
}
