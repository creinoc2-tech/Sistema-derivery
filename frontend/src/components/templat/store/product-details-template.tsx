import ProductBreadcrumb from '#/components/base/products/details/product-breadcrum'
import ProductDetailsTabs from '#/components/containers/store/product-details/details-tabs'
import ProductMainSection from '#/components/containers/store/product-details/main-section'
import SimilarProductsSection from '#/components/containers/store/product-details/similar-products-section'
import { mockCategories } from '#/components/ui/data/categories.mock'
import { mockProducts } from '#/components/ui/data/products.mock'
import { toProductBreadcrumbs } from '#/lib/mappers/product-breadcrumbs.mapper'
import { getSimilarProducts } from '#/lib/mappers/similar-products.mapper'
import { useProductFilter } from '#/lib/store/store/product/product.store'
import type { ProductModel } from '#/model/product.model'
import { useEffect, useState } from 'react'

interface ProductDetailsTemplateProps {
  product: ProductModel
}

export default function ProductDetailsTemplate({
  product,
}: ProductDetailsTemplateProps) {
  const category = mockCategories.find((c) => c.id === product.categoryId)
  const breadcrumbs = toProductBreadcrumbs(product, category)
  // dentro del componente
  const [similarProducts, setSimilarProducts] = useState<ProductModel[]>([])

  useEffect(() => {
    getSimilarProducts(product.categoryId).then(setSimilarProducts)
  }, [product.id])

  return (
    <div className="@container container mx-auto @4xl:px-6 px-4 @5xl:py-12 py-8">
      <ProductBreadcrumb items={breadcrumbs} />

      <div className="space-y-16">
        <ProductMainSection product={product} />
        <ProductDetailsTabs product={product} />
        <SimilarProductsSection products={similarProducts} />
      </div>
    </div>
  )
}
