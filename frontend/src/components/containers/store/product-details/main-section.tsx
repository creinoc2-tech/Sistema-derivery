import ProductActions from '#/components/base/products/details/product-actions'
import ProductHeader from '#/components/base/products/details/product-header'
import ProductImageGallery from '#/components/base/products/details/product-image-gallery'
import ProductPrice from '#/components/base/products/details/product-price'
import { QuantitySelector } from '#/components/base/products/details/quantity-selector'
import ShippingInfoSection from '#/components/base/products/details/shipping-info-section'
import RestaurantInfoCard from '#/components/base/products/details/store-info-card'
import { mockCategories } from '#/components/ui/data/categories.mock'
import { useCartStores } from '#/lib/store/store/cart/cart.store'
import { useRestaurants } from '#/lib/store/store/restaurants/restaurants.store'
import type { ProductModel } from '#/model/product.model'
import { useState } from 'react'

interface ProductMainSectionProps {
  product: ProductModel
}

export default function ProductMainSection({
  product,
}: ProductMainSectionProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStores()

  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isCompareListed, setIsCompareListed] = useState(false)

  const handleAddToCart = () => {
    try {
      addItem(
        {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
          imageUrl: product.imageUrl[0] ?? '',
        },
        product.restaurantId,
      )
     } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }

  const handleBuyNow = () => {
    console.log(
      'Buy Now clicked for product:',
      product.name,
      'with quantity:',
      quantity,
    )
  }

  const categoria = mockCategories.find(
    (category) => category.id === product.categoryId,
  )

  const { restaurants } = useRestaurants()

  const restaurant = restaurants.find(
    (restaurantItem) => restaurantItem.id === product.restaurantId,
  )

  return (
    <div className="grid @5xl:grid-cols-12 grid-cols-1 @5xl:gap-12 gap-8">
      <div className="@5xl:col-span-7">
        <ProductImageGallery images={product.imageUrl} />
      </div>

      {/* Right Column - Product Details */}
      <div className="@5xl:col-span-5 flex flex-col gap-8">
        <div className="space-y-6">
          <ProductHeader
            title={product.name}
            category={{
              name: categoria?.name || '',
              slug: categoria?.slug || '',
            }}
            rating={product.rating || 0}
            reviewCount={product.rating || 0}
          />

          <ProductPrice
            price={Number(product.price)}
            isAvailable={product.isAvailable}
          />

          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-4">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={10}
                disabled={!product.isAvailable}
              />
            </div>

            <ProductActions
              onAddToCart={() => handleAddToCart()}
              onBuyNow={handleBuyNow}
              onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
              onToggleCompare={() => setIsCompareListed(!isCompareListed)}
              isWishlisted={isWishlisted}
              isCompareListed={isCompareListed}
              disabled={!product.isAvailable}
            />
          </div>
        </div>

        {restaurant ? (
          <>
            <RestaurantInfoCard restaurant={restaurant} />
            <ShippingInfoSection />
          </>
        ) : (
          <p className="text-muted-foreground text-sm">
            No se encontró información del restaurante.
          </p>
        )}
      </div>
    </div>
  )
}
