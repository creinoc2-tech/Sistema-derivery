import type { ProductModel } from '#/model/product.model'
import type { ListProductsFilters } from '#/repositories/products.respository'
import { ProductService } from '#/services/product.service'
 
export class ProductController {
  private productService: ProductService = new ProductService()

  constructor() {}

  async createOne(restaurantId: string, payload: Partial<ProductModel>) {
    return this.productService.createOne(restaurantId, payload)
  }

  async list(restaurantId: string, filters?: ListProductsFilters) {
    return this.productService.list(restaurantId, filters)
  }

  async getOne(restaurantId: string, id: string) {
    return this.productService.getOne(restaurantId, id)
  }

  async update(restaurantId: string, id: string, payload: Partial<ProductModel>) {
    return this.productService.update(restaurantId, id, payload)
  }

  async toggleAvailability(restaurantId: string, id: string, isAvailable: boolean) {
    return this.productService.toggleAvailability(restaurantId, id, isAvailable)
  }

  async delete(restaurantId: string, id: string) {
    return this.productService.delete(restaurantId, id)
  }
}