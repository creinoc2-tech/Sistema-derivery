import { Button } from '#/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export interface Address {
  id: string
  type: string // o puedes usar un union type como: 'Billing' | 'Shipping'
  title: string
  country: string
  city: string
  state: string
  zip: string
  street: string
  isDefault: boolean
}

// Initial mock data
const initialAddresses: Address[] = [
  {
    id: '1',
    type: 'Billing',
    title: 'Home',
    country: 'United States',
    city: 'Kipnuk',
    state: 'AK',
    zip: '99614',
    street: '2231 Kidd Avenue',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Shipping',
    title: 'Work',
    country: 'United States',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    street: '500 Congress Ave',
    isDefault: false,
  },
  {
    id: '3',
    type: 'Shipping',
    title: 'Beach House',
    country: 'United States',
    city: 'Miami',
    state: 'FL',
    zip: '33139',
    street: '100 Ocean Drive',
    isDefault: false,
  },
  {
    id: '4',
    type: 'Billing',
    title: 'Office',
    country: 'United States',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    street: '701 5th Avenue',
    isDefault: false,
  },
]

export function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address)
    } else {
      setEditingAddress(null)
    }
    setIsDialogOpen(true)
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Addresses</h3>
        <Button onClick={() => handleOpenDialog()} size="sm" className="gap-2">
          <Plus className="size-4" />
          Add New
        </Button>
      </div>
    </div>
  )
}
