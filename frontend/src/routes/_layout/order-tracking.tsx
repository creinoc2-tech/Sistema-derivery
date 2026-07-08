 import OrderTrackingTemplate from '#/components/templat/store/order/order-tracking-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/order-tracking')({
  component: RouteComponent,
})

function RouteComponent() {
  return <OrderTrackingTemplate />
}
