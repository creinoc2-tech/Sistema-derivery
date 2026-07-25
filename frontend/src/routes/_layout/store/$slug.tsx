import StorePageTemplate from '#/components/templat/store/storefront/store-page-template'
import { RestaurantsController } from '#/controllers/restaurants.controller'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/store/$slug')({
  loader: async ({ params }) => {
    const restaurant = await new RestaurantsController().getBySlug(params.slug)

    if (!restaurant) {
      throw notFound()
    }

    return { restaurant }
  },
  component: RouteComponent,
})

function RouteComponent() {
 const { restaurant } = Route.useLoaderData()
  return <StorePageTemplate restaurant={restaurant} />
}
