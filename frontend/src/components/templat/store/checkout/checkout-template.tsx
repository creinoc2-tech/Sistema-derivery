import { BreadcrumbNav } from '#/components/base/common/breadcrumb-nav'
import ShippingAddressForm from '#/components/base/store/checkout/checkout-address-form'
import CheckoutOrderSummary from '#/components/containers/store/checkout/checkout-order-summary'
import ShippingMethodSelector from '#/components/containers/store/checkout/shipping-method-selector'
import { Skeleton } from '#/components/ui/skeleton'
export default function CheckoutTemplate() {
  const checkoutSteps = [
    { label: 'Cart', href: '/cart' },
    { label: 'Shipping', href: '#', isActive: true },
  ]

  return (
    <div className="@container container mx-auto px-4 py-8">
      <BreadcrumbNav items={checkoutSteps} className="mb-8" />

      {/* Main Content */}
      <div className="grid gap-8 @5xl:grid-cols-12">
        <div className="space-y-8 @5xl:col-span-7">
          <ShippingAddressForm />
          <ShippingMethodSelector />
        </div>
        <div className="@5xl:col-span-5">
           <CheckoutOrderSummary />
        </div>
      </div>
    </div>
  )
}
