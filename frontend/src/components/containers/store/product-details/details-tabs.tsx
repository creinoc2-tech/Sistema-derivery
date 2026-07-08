import ProductAdditionalInfoTab from '#/components/base/products/details/product-additional-info-tab'
import type { Product } from '#/components/ui/data/products'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProductReviewsTab from './product-reviews-tab'
import ProductDescriptionTab from '#/components/base/products/details/product-description-tab'
import ProductShippingTab from '#/components/base/products/details/product-shipping-tab'

interface ProductDetailsTabsProps {
  product: Product
}

export default function ProductDetailsTabs({
  product,
}: ProductDetailsTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList
        variant="line"
       className="grid h-auto w-full
  grid-cols-4
  gap-6
  sm:gap-0
  rounded-none
  p-0
  mb-3
 "
      >
        <TabsTrigger
          value="description"
          className="h-12 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:hidden"
        >
          Description
        </TabsTrigger>

        <TabsTrigger
          value="additional-info"
          className="h-12 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:hidden"
        >
          Additional Information
        </TabsTrigger>

        <TabsTrigger
          value="reviews"
          className="h-12 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:hidden"
        >
          Reviews ({product.rating.count})
        </TabsTrigger>

        <TabsTrigger
          value="shipping"
          className="h-12 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:hidden"
        >
          Shipping & Returns
        </TabsTrigger>
      </TabsList>
      

      <div className="mt-8">
        <TabsContent value="description">
          <ProductDescriptionTab description={product.description} />
        </TabsContent>

        <TabsContent value="additional-info">
          <ProductAdditionalInfoTab specifications={product.specifications} />
        </TabsContent>

        <TabsContent value="reviews">
          <ProductReviewsTab
            reviews={product.reviews}
            averageRating={product.rating.average}
            ratingBreakdown={product.rating.breakdown}
            totalRatings={product.rating.count}
            productId={product.id}
          />
        </TabsContent>

        <TabsContent value="shipping">
          <ProductShippingTab shipping={product.shipping} />
        </TabsContent>
      </div>
    </Tabs>
  )
}
