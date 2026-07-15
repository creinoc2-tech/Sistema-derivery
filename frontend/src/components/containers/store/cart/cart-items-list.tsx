import { useCartStore } from '#/lib/store/cart/cart-store'
import { useCartStores } from '#/lib/store/store/cart/cart.store'
import CartItem from '@/components/base/store/cart/cart-item'

 export default function CartItemsList() {
  const { items } = useCartStores()

  return (
    <div className="space-y-6">
      <div className="divide-y rounded-lg border bg-background p-6 shadow-sm">
        <div className="divide-y rounded-lg border bg-background p-6 shadow-sm">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
