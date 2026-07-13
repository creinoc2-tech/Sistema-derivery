

export interface CartItems {
  id: string
  productId: string
  name: string
  price: number
  imageUrl?: string
  quantity: number
}

export interface CartStates {
  restaurantId: string | null    
  items: CartItems[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isOpenMenu: boolean
  setIsOpenMenu: (isOpenMenu: boolean) => void

  totalItems: number
  subtotal: number
  deliveryFee: number             
  deliveryAddressId: string | null  

  addItem: (item: Omit<CartItems, 'id'>, restaurantId: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleOpen: () => void
  setDeliveryFee: (fee: number) => void
  setDeliveryAddressId: (addressId: string | null) => void
}