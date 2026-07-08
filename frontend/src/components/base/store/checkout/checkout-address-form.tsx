import {
  shippingAddressSchema,
  type ShippingAddressInput,
} from '#/lib/store/validators/shipping-address'
import { useForm } from '@tanstack/react-form'
import { ShippingAddressFields } from '../../../containers/store/checkout/shipping-address-fields'
import { Button } from '#/components/ui/button'
interface ShippingAddressFormProps {
  onSubmit?: (data: ShippingAddressInput) => void
}
export default function ShippingAddressForm({
  onSubmit,
}: ShippingAddressFormProps) {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      countryCode: 'BD',
      city: '',
      state: '',
      zipCode: '',
      description: '',
    } as ShippingAddressInput,
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
        <h2 className="text-lg font-medium">Shipping Address</h2>
        <ShippingAddressFields form={form as any} />

        <Button
          type="submit"
          className="w-full py-5"
         >
          Save & Continue
        </Button>
      </div>
    </form>
  )
}
