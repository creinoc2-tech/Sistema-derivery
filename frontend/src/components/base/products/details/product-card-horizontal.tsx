import { Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductModel } from '#/model/product.model'

interface ProductCardHorizontalProps {
  product: ProductModel
  className?: string
}

export default function ProductCardHorizontal({
  product,
  className,
}: ProductCardHorizontalProps) {
  const mainImage = product.imageUrl[0] ?? 'https://placehold.co/300x300'
  const price = Number(product.price)
  const rating = product.rating ?? 0

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className={cn(
        'group flex w-full min-w-70 max-w-[320px] flex-col gap-3 rounded-lg border bg-background p-4 transition-all hover:shadow-md',
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
        <img
          src={mainImage}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {!product.isAvailable && (
          <span className="absolute top-2 left-2 rounded-full bg-destructive px-2 py-1 text-destructive-foreground text-xs">
            No disponible
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="line-clamp-2 font-medium text-foreground text-sm group-hover:text-primary">
          {product.name}
        </h3>

        {product.rating !== undefined && (
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.round(rating) ? 'fill-current' : 'text-muted',
                  )}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-xs">
              {rating.toFixed(1)}
            </span>
          </div>
        )}

        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-bold text-foreground text-lg">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  )
}