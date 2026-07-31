import {
  shippingAddressSchema,
  type ShippingAddressInput,
} from '#/lib/store/validators/shipping-address'
import { useForm } from '@tanstack/react-form'
import { ShippingAddressFields } from '../../../containers/store/checkout/shipping-address-fields'
import { Button } from '#/components/ui/button'
import { useUser } from '@clerk/react'
import { useLocationStore } from '#/lib/store/store/location/location'
import { useEffect } from 'react'
import { AddressController } from '#/controllers/address.controller'
interface ShippingAddressFormProps {
  onSubmit?: (data: ShippingAddressInput) => void
}
export default function ShippingAddressForm({
  onSubmit,
}: ShippingAddressFormProps) {
  const { user } = useUser()
  const { items } = useLocationStore()
  const form = useForm({
    defaultValues: {
      label: '',
      street: '',
      city: '',
      reference: '',
      latitude: 0,
      longitude: 0,
      isDefault: false,
    },
    validators: {
      onSubmit: shippingAddressSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit?.(value)
    },
  })

  useEffect(() => {
    if (items.length === 0) return
    form.setFieldValue('latitude', items[0].latitude)
    form.setFieldValue('longitude', items[0].longitude)
  }, [items])

  const handleDebugValues = async () => {
    try {
      const values = form.state.values
      const addressController = new AddressController()
      await addressController.create(user?.id || '', values)
      console.log('Address created successfully:', values)
    } catch (error) {
      console.error('Error creating address:', error)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-lg font-medium"></h2>
        <ShippingAddressFields form={form as any} />

        <Button
          type="submit"
          className="w-full py-5"
          onClick={handleDebugValues}
        >
          Save & Continue
        </Button>
      </div>
    </form>
  )
}
