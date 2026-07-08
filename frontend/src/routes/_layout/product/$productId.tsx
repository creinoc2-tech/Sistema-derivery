import ProductDetailsTemplate from '#/components/templat/store/product-details-template'
import { mockProducts } from '#/components/ui/data/products'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/product/$productId')({
  loader: async ({ params }) => {
    const product = mockProducts.find(
      (product) => product.id === params.productId,
    )

    if (!product) {
      throw notFound()
    }

    return { product }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { product } = Route.useLoaderData()
  return <ProductDetailsTemplate product={product} />
}
