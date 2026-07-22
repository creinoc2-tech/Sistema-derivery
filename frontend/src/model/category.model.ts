export interface CategoryModel {
  id: string
  restaurantId: string
  name: string
  slug: string
  imageUrl: string
  sortOrder: number
  description: string
  isActive: boolean
  createdAt: string
}