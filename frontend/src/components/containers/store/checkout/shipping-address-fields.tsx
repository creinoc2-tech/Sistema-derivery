import {
  FormTextareaField,
  FormTextField,
} from '#/components/base/forms/form-field'
import { PhoneInput } from '#/components/base/forms/phone-input'
import type { ShippingAddressInput } from '#/lib/store/validators/shipping-address'
import { FieldGroup } from '@/components/ui/field'
import { useUser } from '@clerk/react'

interface ShippingAddressFieldsProps {
  form: {
    Field: (props: {
      name: keyof ShippingAddressInput
      children: (field: any) => React.ReactNode
    }) => React.ReactNode
  } & Record<string, unknown>
}

export function ShippingAddressFields({ form }: ShippingAddressFieldsProps) {
  const { user } = useUser()

  return (
    <FieldGroup className="gap-8">
      <div className="grid @4xl:grid-cols-1 grid-cols-2 gap-6">
        <FormTextField
          label="Name"
          value={user?.fullName || user?.username || 'Usuario'}
          disabled
          className="text-[rgba(130,130,130,1)]"
          onChange={() => {}}
        />

        <FormTextField
          label="Email"
          value={user?.primaryEmailAddress?.emailAddress || 'user@example.com'}
          disabled
          className="text-[rgba(130,130,130,1)]"
          onChange={() => {}}
        />
      </div>
      <div className="grid @4xl:grid-cols-1 grid-cols-2 gap-6">
        <form.Field
          name="label"
          children={(field) => (
            <FormTextField
              label="Label"
              required
              placeholder="Home"
              autoComplete="off"
              field={field}
            />
          )}
        />

        <form.Field
          name="street"
          children={(field) => (
            <FormTextField
              label="Street Address"
              required
              placeholder="123 Main St"
              autoComplete="street-address"
              field={field}
            />
          )}
        />
      </div>

      <div className="grid @4xl:grid-cols-1  gap-6">
        <form.Field
          name="city"
          children={(field) => (
            <FormTextField
              label="City"
              required
              placeholder="Dhaka"
              autoComplete="address-level2"
              field={field}
            />
          )}
        />

      </div>

      <form.Field
        name="reference"
        children={(field) => (
          <FormTextareaField
            label=" Delivery Instructions"
            placeholder=" e.g., Leave at the front door, call upon arrival, etc."
            description="Provide any specific instructions for the delivery person to ensure a smooth delivery process."
            field={field}
            className="min-h-24"
          />
        )}
      />
    </FieldGroup>
  )
}
