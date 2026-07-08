import OrderConfirmationTemplate from '#/components/templat/store/order/order-confirmation-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/store/order-confirmation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <OrderConfirmationTemplate />
}
