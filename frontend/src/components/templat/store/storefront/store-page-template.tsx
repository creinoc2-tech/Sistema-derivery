import { StoreHeaderSkeleton } from '#/components/base/store/storefront/store-header-skeleton'
import { Skeleton } from '#/components/ui/skeleton'
import { useStoreFront } from '#/lib/helper/store'
import { useEffect } from 'react'
import { StoreProductsSkeleton } from './store-products-skeleton'
import NotFound from '#/components/base/empty/notfound'
import { Store, StoreIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { BreadcrumbNav } from '#/components/base/common/breadcrumb-nav'
import StoreHeader from '#/components/containers/store/storefront/store-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StoreProducts from '#/components/containers/store/storefront/store-product'
import { StoreAbout } from '#/components/containers/store/storefront/store-about'
import { StoreReviews } from '#/components/containers/store/storefront/store-reviews'
import { useRestaurants } from '#/lib/store/store/restaurants/restaurants.store'
import { mockRestaurants } from '#/components/ui/data/restaurant.mocks'

interface StorePageTemplateProps {
  slug: string
}

export default function StorePageTemplate({ slug }: StorePageTemplateProps) {
  const restaurant = mockRestaurants.find((r) => r.slug === slug)

  {
    /* if (!restaurant) {
    return (
      <div className="@container container mx-auto px-4 py-8">
        Breadcrumbs Skeleton
        <div className="mb-6">
          <Skeleton className="h-5 w-64" />
        </div>
        <StoreHeaderSkeleton />
        Tabs Skeleton
        <div className="mt-8 space-y-6">
          <Skeleton className="h-10 w-full max-w-md" />
          <StoreProductsSkeleton />
        </div>
      </div>
    )
  }
   */
  }
  if (!restaurant) {
    return (
      <div className="@container flex min-h-[70vh] w-full items-center justify-center p-4">
        <NotFound
          title="Store not found"
          description="The store you're looking for doesn't exist or may have been removed."
          icon={
            <StoreIcon className="@[48rem]:size-24 size-12 text-muted-foreground" />
          }
          className="w-full @[48rem]:max-w-2xl max-w-md border-dashed @[48rem]:py-24 **:data-[slot=empty-description]:@[48rem]:text-lg **:data-[slot=empty-title]:@[48rem]:text-3xl"
        >
          <Link to="/store">
            <Button className="@[48rem]:h-12 @[48rem]:px-8 @[48rem]:text-base">
              Browse Stores
            </Button>
          </Link>
        </NotFound>
      </div>
    )
  }

  const storeSteps = [
    { label: 'Home', href: '/' },
    { label: 'Stores', href: '/store' },
    { label: restaurant.name, isActive: true },
  ] as const
  return (
    <div className="@container container mx-auto px-4 py-8">
      <BreadcrumbNav items={storeSteps} className="mb-4" />

      {/* Store Header */}
      <StoreHeader store={restaurant} />

      {/* Tabbed Content */}
      <div className="mt-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <StoreProducts id={restaurant.id} />
          </TabsContent>

          <TabsContent value="about">
            <StoreAbout store={restaurant} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
