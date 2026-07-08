import CheckoutTemplate from '#/components/templat/store/checkout/checkout-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CheckoutTemplate />
}
