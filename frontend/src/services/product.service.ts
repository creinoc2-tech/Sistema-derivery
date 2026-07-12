import type { ProductModel } from '#/model/product.model'
import { ProductRepository, type ListProductsFilters } from '#/repositories/products.respository'
 
export class ProductService {
  private productRepository: ProductRepository = new ProductRepository()

  constructor() {}

  async createOne(restaurantId: string, payload: Partial<ProductModel>) {
    return this.productRepository.createOne(restaurantId, payload)
  }

  async list(restaurantId: string, filters?: ListProductsFilters) {
    return this.productRepository.list(restaurantId, filters)
  }

  async getOne(restaurantId: string, id: string) {
    return this.productRepository.getOne(restaurantId, id)
  }

  async update(restaurantId: string, id: string, payload: Partial<ProductModel>) {
    return this.productRepository.update(restaurantId, id, payload)
  }

  async toggleAvailability(restaurantId: string, id: string, isAvailable: boolean) {
    return this.productRepository.toggleAvailability(restaurantId, id, isAvailable)
  }

  async delete(restaurantId: string, id: string) {
    return this.productRepository.delete(restaurantId, id)
  }
}