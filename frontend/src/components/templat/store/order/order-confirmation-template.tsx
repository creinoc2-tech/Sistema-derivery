import OrderSuccessHeader from '#/components/base/order/order-success-header'
import HelpSection from '#/components/base/store/order/help-section'
import { OrderDetailsCard } from '#/components/base/store/order/order-details-card'
import OrderSummary from '#/components/base/store/order/order-summary'
import OrderInfoSection from '#/components/containers/store/order/order-info-section'
import OrderItemsList from '#/components/containers/store/order/order-items-list'
import { mockOrderData } from '#/components/ui/data/order'
import { Separator } from '@/components/ui/separator'

export default function OrderConfirmationTemplate() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <OrderSuccessHeader />

      <div className="space-y-6   p-6">
        <OrderDetailsCard
          orderId={mockOrderData.orderId}
          orderDate={mockOrderData.orderDate}
          estimatedDelivery={mockOrderData.estimatedDelivery} // Could be calculated
        />
      </div>

      <div className="rounded-lg border bg-background p-6 shadow-sm">
        <OrderItemsList items={mockOrderData.items} />

        <Separator className="my-6" />

        <OrderInfoSection
          paymentMethod={mockOrderData.paymentMethod} // TODO: get from payment details if available
          address={mockOrderData.address}
          deliveryMethod={mockOrderData.deliveryMethod}
        />

        <Separator className="my-6" />

        <div className="grid gap-6 @xl:grid-cols-2">
          <HelpSection />

          <OrderSummary
            itemCost={mockOrderData.itemCost}
            shippingCost={mockOrderData.shippingCost}
            tax={mockOrderData.tax}
            couponDiscount={mockOrderData.couponDiscount}
            total={mockOrderData.total}
          />
        </div>
      </div>
    </div>
  )
}
