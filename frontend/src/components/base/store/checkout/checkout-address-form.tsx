import {
  shippingAddressSchema,
  type ShippingAddressInput,
} from '#/lib/store/validators/shipping-address'
import { useForm } from '@tanstack/react-form'
import { ShippingAddressFields } from '../../../containers/store/checkout/shipping-address-fields'
import { Button } from '#/components/ui/button'
import { useUser } from '@clerk/react'
interface ShippingAddressFormProps {
  onSubmit?: (data: ShippingAddressInput) => void
}
export default function ShippingAddressForm({
  onSubmit,
}: ShippingAddressFormProps) {
  const form = useForm({
    defaultValues: {
      label: '',
      street: '',
      city: '',
      reference: '',
      latitude: '',
      longitude: '',
      isDefault: false,
    },
    validators: {
      onSubmit: shippingAddressSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit?.(value)
    },
  })
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
        <Button type="submit" className="w-full py-5">
          Save & Continue
        </Button>
      </div>
    </form>
  )
}
