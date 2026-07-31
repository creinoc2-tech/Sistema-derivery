import {
  FormTextareaField,
  FormTextField,
} from '#/components/base/forms/form-field'
import { PhoneInput } from '#/components/base/forms/phone-input'
import { Button } from '#/components/ui/button'
import type { ShippingAddressInput } from '#/lib/store/validators/shipping-address'
import { FieldGroup } from '@/components/ui/field'
import { useUser } from '@clerk/react'
import { Label } from '@/components/ui/label'
import { useLocationStore } from '#/lib/store/store/location/location'
import LocationSheet from '../location/LocationSheet'
import { useEffect } from 'react'

interface ShippingAddressFieldsProps {
  form: {
    Field: (props: {
      name: keyof ShippingAddressInput
      children: (field: any) => React.ReactNode
    }) => React.ReactNode
    setFieldValue: (name: keyof ShippingAddressInput, value: unknown) => void
  } & Record<string, unknown>
}

export function ShippingAddressFields({ form }: ShippingAddressFieldsProps) {
  const { user } = useUser()
  const { setIsOpen , items } = useLocationStore()
  useEffect(() => {
    if (items.length === 0) return
    const location = items[0]

    form.setFieldValue('street', location.street)
    form.setFieldValue('city', location.city)
    if (location.label) form.setFieldValue('label', location.label)
  }, [items])

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

      <div className="grid grid-cols-2 @4xl:grid-cols-1 gap-6 items-center">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="use-current-location"
            className="text-sm font-medium text-[rgba(130,130,130,1)]"
          >
            Location
          </Label>
          <Button
            type="button"
            variant="secondary"
            className="w-full py-5 h-11 flex items-center justify-center"
            id="use-current-location"
            onClick={() => setIsOpen(true)}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Use Current Location
          </Button>
        </div>
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
      <LocationSheet />
    </FieldGroup>
  )
}
