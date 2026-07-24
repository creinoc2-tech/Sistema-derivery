export interface ProductModel {
  id: string
  restaurantId: string
  categoryId: string
  name: string
  slug: string
  description?: string
  price: string
  imageUrl: string[]
  isAvailable: boolean
  createdAt: string
}