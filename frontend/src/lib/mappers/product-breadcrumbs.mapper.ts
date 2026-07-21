import type { ProductModel } from '#/model/product.model'
import type { CategoryModel } from '#/model/category.model'

interface BreadcrumbItem {
  label: string
  href: string
}

export function toProductBreadcrumbs(
  product: ProductModel,
  category: CategoryModel | undefined,
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Inicio', href: '/' }]

  if (category) {
    items.push({
      label: category.name,
      href: `/category/${category.slug}`,
    })
  }

  items.push({
    label: product.name,
    href: `/product/${product.id}`,
  })

  return items
}