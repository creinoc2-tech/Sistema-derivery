// lib/mappers/similar-products.mapper.ts
import { ProductController } from '#/controllers/product.controller'
import type { ProductModel } from '#/model/product.model'
const productController = new ProductController()

export async function getSimilarProducts(categoryId: string): Promise<ProductModel[]> {
  const products = await productController.getByCategoryId(categoryId)
  return products ?? []
}
