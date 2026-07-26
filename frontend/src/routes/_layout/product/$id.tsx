import ProductDetailsTemplate from '#/components/templat/store/product-details-template'
import { mockProducts } from '#/components/ui/data/products.mock'
import { ProductController } from '#/controllers/product.controller'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/product/$id')({
  loader: async ({ params }) => {
    const product = await new ProductController().getOneProducto(params.id)

    if (!product) {
      throw notFound()
    }

    return { product }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { product } = Route.useLoaderData()
  console.log('Product data loaded:', product) // Debugging log
  return <ProductDetailsTemplate product={product} />
}
