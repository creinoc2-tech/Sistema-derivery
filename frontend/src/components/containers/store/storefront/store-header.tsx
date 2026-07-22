import StoreBanner from '#/components/base/store/storefront/store-banner'
import { StoreStats } from '#/components/base/store/storefront/store-stats'
import type { RestaurantModel } from '#/model/restaurants.model'

interface StoreHeaderProps {
  store: RestaurantModel
}

export default function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <div className="space-y-6">
      <StoreBanner store={store} />
      <StoreStats restaurant={store} />
    </div>
  )
}