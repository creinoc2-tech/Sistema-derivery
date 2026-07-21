export interface ProductModel {
  id: string
  restaurantId: string
  categoryId: string
  name: string
  slug: string
  description?: string
  price: string
  rating?: number
  imageUrl: string[]
  isAvailable: boolean
  createdAt: string
}