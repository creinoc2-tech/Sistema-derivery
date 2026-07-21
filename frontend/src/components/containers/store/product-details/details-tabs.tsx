import ProductAdditionalInfoTab from '#/components/base/products/details/product-additional-info-tab'
import type { ProductModel } from '#/model/product.model'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
 import ProductDescriptionTab from '#/components/base/products/details/product-description-tab'
 import { useRestaurants } from '#/lib/store/store/restaurants/restaurants.store'

interface ProductDetailsTabsProps {
  product: ProductModel
}

export default function ProductDetailsTabs({
  product,
}: ProductDetailsTabsProps) {
  const { updateFilter, restaurants } = useRestaurants()

  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === product.restaurantId,
  )

  const restaurantInfo: Record<string, string> = {
    Restaurante: restaurant?.name ?? 'No disponible',
    Descripción: restaurant?.description ?? 'Sin descripción',
    Propietario: restaurant?.ownerId ?? 'Desconocido',
  }
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList
        variant="line"
        className="grid h-auto w-full
  grid-cols-2
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
          Restaurant Infomation
        </TabsTrigger>
{ /*
        <TabsTrigger
          value="reviews"
          className="h-12 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:hidden"
        >
          Reviews ({product.rating})
        </TabsTrigger>

        <TabsTrigger
          value="shipping"
          className="h-12 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:hidden"
        >
          Shipping & Returns
        </TabsTrigger> */}
      </TabsList>

      <div className="mt-8">
        <TabsContent value="description">
          <ProductDescriptionTab description={product.description || ''} />
        </TabsContent>

        <TabsContent value="additional-info">
          <ProductAdditionalInfoTab specifications={restaurantInfo} />
        </TabsContent>

       { /*<TabsContent value="reviews">
          <ProductReviewsTab
            productId={product.id}
            reviews={product.reviews}
            averageRating={product.rating}
            ratingBreakdown={product.ratingBreakdown}
            totalRatings={product.totalRatings}
          />
        </TabsContent>}


        { <TabsContent value="shipping">
          <ProductShippingTab shipping={product.shipping} />
        </TabsContent> */}
      </div>
    </Tabs>
  )
}
