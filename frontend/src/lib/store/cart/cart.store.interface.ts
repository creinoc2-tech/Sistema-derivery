import type { ShippingAddressInput } from "../validators/shipping-address";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  maxQuantity?: number;
}


export interface CartShippingMethod {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpenMenu: boolean) => void;

  totalItems: number;
  subtotal: number;
  shippingMethod: CartShippingMethod | null;
  shippingAddress: ShippingAddressInput | null;
  shippingCost: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleOpen: () => void;
  setShippingMethod: (method: CartShippingMethod | null) => void;
  setShippingAddress: (address: ShippingAddressInput | null) => void;
}