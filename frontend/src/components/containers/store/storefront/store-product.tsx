import { useQuery } from '@tanstack/react-query'
import { Loader2, PackageOpen } from 'lucide-react'
import { useMemo, useState } from 'react'
import NotFound from '@/components/base/empty/notfound'
import ProductCard from '@/components/base/products/product-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockProducts } from '#/components/ui/data/products.mock'
 
interface StoreProductsProps {
  id: string
 }

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
]

export default function StoreProducts({
  id,
}: StoreProductsProps) {
  const [sortBy, setSortBy] = useState('newest')

  const storeProducts = mockProducts.filter(
    (product) => product.restaurantId=== id,
  )

  
  return <div className="space-y-6">

       {/* Header with count and sort */}
      <div className="flex @2xl:flex-row flex-col items-start @2xl:items-center justify-between gap-4">
        <div className="@2xl:items-center">
          <h2 className="font-semibold text-xl">
            Products ({storeProducts.length})
          </h2>
          <p className="text-muted-foreground text-sm">
            Browse all products from this store
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-45">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

       {/* Products Grid */}
      <div className="grid @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
        {storeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
  </div>
}
