export interface Product {
  id: string
  restaurantId: string
  categoryId: string
  name: string
  slug: string
  description?: string
  price: string
  imageUrl?: string
  isAvailable: boolean
  createdAt: string
}

export interface ProductFilters {
  categoryId?: string
  isAvailable?: boolean
}