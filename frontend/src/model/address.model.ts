export interface AddressModel {
  id:  string
  userId: string
  label?: string
  street: string
  city: string
  reference?: string
  latitude?: number
  longitude?: number
  isDefault: boolean
  createdAt: string
}
  