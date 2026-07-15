import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { Skeleton } from '#/components/ui/skeleton'
import { useCartStore } from '#/lib/store/cart/cart-store'
import { useCartStores } from '#/lib/store/store/cart/cart.store'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, Loader2, Tag, X } from 'lucide-react'

export default function CartSummary() {
  const { items, subtotal, clearCart } = useCartStores()

  // Mock discount for now
  const discount = 0
  const deliveryFee = 15
  const total = subtotal - discount + (items.length > 0 ? deliveryFee : 0)

  if (items.length === 0) return null

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-semibold text-lg">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-destructive">
          <span className="text-muted-foreground">Discount</span>
          <span className="font-medium">-${discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="font-medium">
            ${items.length > 0 ? deliveryFee.toFixed(2) : '0.00'}
          </span>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Coupon Input */}
        <div className="flex gap-2  ">
          <InputGroup className="py-6">
            <InputGroupAddon align="inline-start">
              <Tag className="h-4 w-4" />
            </InputGroupAddon>

            <InputGroupInput placeholder="Enter coupon code..." />

            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="ghost">
              Apply
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

         <Link to="/checkout">
          <Button className="w-full rounded-full py-6" size="lg">
            Go to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

      </div>
    </div>
  )
}
