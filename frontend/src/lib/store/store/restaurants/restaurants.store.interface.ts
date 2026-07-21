export interface Restaurant {
  id: string
  ownerId: string
  name: string
  slug: string
  description?: string
  status: 'pending' | 'approved' | 'rejected'
  stripeAccountId?: string
  createdAt: string
}

export interface RestaurantFilters {
  search: string
  sortBy: 'newest' | 'name'
  id : string | null
}