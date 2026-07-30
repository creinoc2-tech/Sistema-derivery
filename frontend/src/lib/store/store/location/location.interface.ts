export interface LocationItems {
  id: string
  userId: string
  label?: string
  street: string
  city: string
  reference: string
  latitude: number
  longitude: number
  isDefault?: boolean
  createdAt?: string
}

export interface LocationStates {
  items: LocationItems[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  clearCart: () => void

  addItem: (item: Omit<LocationItems, 'id'>, restaurantId: string) => void
}
