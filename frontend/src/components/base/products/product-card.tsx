
import { cn } from '#/lib/utils'
import { useState } from 'react'
import { Button } from '#/components/ui/button'
import { Eye, Loader2, ShoppingCart, Star } from 'lucide-react'

import PriceTag from './price-tag'
import { Link } from '@tanstack/react-router'
import type { Productos } from '#/lib/store/store/product/product.store.interface'
import { useCartStores } from '#/lib/store/store/cart/cart.store'

interface ProductCardProps {
  product: Productos
  className?: string
  variant?: 'grid' | 'list'
}

export default function ProductCard({
  product,
  className,
  variant = 'grid',
}: ProductCardProps) {
  const [isAddingThis, setIsAddingThis] = useState(false)

  const { addItem } = useCartStores()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if inside a link
    e.stopPropagation()
    setIsAddingThis(true)
    try {
      addItem(
        {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
          imageUrl: product.imageUrl,
        },
        product.restaurantId,
      )
      // Log the current cart items after adding
      setIsAddingThis(false)
    } catch (error) {
      console.error('Error adding item to cart:', error)
      setIsAddingThis(false)
    }
  }
  return (
    <div
      className={cn(
        'group relative flex rounded-xl border-2 border-muted border-dashed p-4 transition-colors hover:border-primary/50',
        variant === 'grid' ? 'flex-col' : '@2xl:flex-row flex-col gap-6',
        className,
      )}
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-muted">
        <img
          src={product.imageUrl ?? ''}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.price.discountPercentage > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600">
              -{product.price.discountPercentage}%
            </Badge>
          )}
          {product.isNew && product.price.discountPercentage === 0 && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
        </div> */}

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/20 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full shadow-lg transition-transform hover:scale-110"
            title="Quick View"
          >
            <Eye className="h-5 w-5" />
            <span className="sr-only">Quick View</span>
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full shadow-lg transition-transform hover:scale-110"
            title="Add to Cart"
            onClick={handleAddToCart}
            disabled={isAddingThis}
          >
            {isAddingThis ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
            <span className="sr-only">Add to Cart</span>
          </Button>
        </div>
      </div>
      {/* Content Section */}
      <div className="mt-4  flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-muted-foreground/30 border-dashed bg-muted/50 px-3 py-1 font-medium text-muted-foreground text-xs">
            {product.categoryId}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-medium text-sm">{product.rating ?? 0}</span>
            <span className="text-[10px] text-muted-foreground">
              ({product.slug})
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <Link
          to="/product/$productId"
          params={{ productId: product.slug }}
          className="group/title"
        >
          <h3
            className="line-clamp-1 font-medium font-mono text-lg transition-colors group-hover/title:text-primary"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between border-muted border-t border-dashed pt-3">
          <div className="font-mono text-muted-foreground text-sm">
            <span className="font-medium text-base text-foreground">
              <PriceTag
                price={Number(product.price)}
                originalPrice={Number(product.price)}
              />
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="ml-1 font-medium text-[10px] text-muted-foreground">
              +{product.restaurantId}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
