import { Button } from '#/components/ui/button'

import { cn } from '#/lib/utils'
import { Trash2 } from 'lucide-react'
import { QuantitySelector } from '../../products/details/quantity-selector'
import type { CartItems } from '#/lib/store/store/cart/cart.store.interface'
import { useCartStores } from '#/lib/store/store/cart/cart.store'
 interface CartItemProps {
  item: CartItems
  isCompact?: boolean
}

export default function CartItem({ item, isCompact = false }: CartItemProps) {
  const { removeItem , increment, decrement } = useCartStores()
   return (
    <div
      className={`flex gap-4 py-4 ${isCompact ? 'items-start' : 'items-center'} `}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-md border bg-muted',
          isCompact ? 'h-20 w-20' : 'h-24 w-24',
        )}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex justify-between gap-2">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">{item.name}</h4>
          </div>
          {!isCompact && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive/90"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">${item.price}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <QuantitySelector
                value={item.quantity}
                increment={() => increment(item.id)}
                decrement={() => decrement(item.id)}
                className="@7xl:h-9"
                size="sm"
              />
              {isCompact && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 h-8 w-8 text-destructive hover:text-destructive/90"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
