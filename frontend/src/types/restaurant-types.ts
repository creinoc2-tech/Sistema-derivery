export interface Restaurant {
  id: string
  ownerId: string
  name: string
  slug: string
  status: 'pending' | 'approved' | 'rejected'
  stripeAccountId: string | null
  createdAt: string
}

export interface RestaurantFilters {
  search: string
  sortBy: 'newest' | 'name'
}
