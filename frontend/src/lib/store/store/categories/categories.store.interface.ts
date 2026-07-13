export interface Categorias{
  id: string
  restaurantId: string
  name: string
  slug: string
  sortOrder: number
  isActive: boolean
  createdAt: string
}

export interface CategoriasFilters {
  search?: string
}