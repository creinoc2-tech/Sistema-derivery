import OrderTemplate from '#/components/templat/store/accounts/order-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  return <OrderTemplate />
}
