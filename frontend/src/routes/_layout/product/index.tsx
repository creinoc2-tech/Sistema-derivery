import ProductListingTemplate from '#/components/templat/store/product-page/product-listing-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/product/')({
  component: RouteComponent,
   ssr: false,
})

function RouteComponent() {
  return <ProductListingTemplate />
}