import CartTemplate from '#/components/templat/store/cart/cart-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CartTemplate />
}
