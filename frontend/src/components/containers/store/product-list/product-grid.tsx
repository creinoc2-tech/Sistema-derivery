import ProductCard from '#/components/base/products/product-card'
import ProductGridSkeleton from '#/components/base/products/product-grid-skeleton'
import ProductNotFound from '#/components/base/products/product-not-found'
import type { Product } from '#/components/ui/data/products'
import { cn } from '#/lib/utils'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  viewMode?: 'grid' | 'list'
}
export default function ProductGrid({
  products,
  isLoading,
  viewMode = 'grid',
}: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton />
  }

  if (products.length === 0) {
    return <ProductNotFound />
  }

  return (
       <div
        className={cn(
          'gap-6',
          viewMode === 'grid'
            ? 'grid @4xl:grid-cols-2 @7xl:grid-cols-3 grid-cols-1'
            : 'flex flex-col',
        )}
      >
        {products.map((product) => (
            
          <ProductCard key={product.id} product={product}  />
        ))}

  
      </div>
   )
}
