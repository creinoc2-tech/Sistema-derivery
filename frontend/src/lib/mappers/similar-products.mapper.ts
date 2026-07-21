// lib/mappers/similar-products.mapper.ts
import type { ProductModel } from '#/model/product.model'

export function getSimilarProducts(
  product: ProductModel,
  allProducts: ProductModel[],
  limit = 6,
): ProductModel[] {
  return allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit)
}