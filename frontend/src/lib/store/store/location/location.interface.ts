 
export interface LocationItems {
  label?: string
  street: string
  city: string
  latitude: number
  longitude: number
  isDefault?: boolean
  createdAt?: string
}
export interface LocationStates {
  items: LocationItems[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  clearLocation: () => void

  addItem: (item: LocationItems) => void
}
