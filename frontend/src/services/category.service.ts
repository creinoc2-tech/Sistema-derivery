import type { CategoryModel } from '#/model/category.model'
import { CategoryRepository } from '#/repositories/category.repository'

export class CategoryService {
  private categoryRepository: CategoryRepository = new CategoryRepository()

  constructor() {}

  async createOne(restaurantId: string, payload: Partial<CategoryModel>) {
    return this.categoryRepository.createOne(restaurantId, payload)
  }

  async list(restaurantId: string) {
    return this.categoryRepository.list(restaurantId)
  }

  async getOne(restaurantId: string, id: string) {
    return this.categoryRepository.getOne(restaurantId, id)
  }

  async update(restaurantId: string, id: string, payload: Partial<CategoryModel>) {
    return this.categoryRepository.update(restaurantId, id, payload)
  }

  async delete(restaurantId: string, id: string) {
    return this.categoryRepository.delete(restaurantId, id)
  }
}