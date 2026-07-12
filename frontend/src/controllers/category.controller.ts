import type { CategoryModel } from '#/model/category.model'
import { CategoryService } from '#/services/category.service'

export class CategoryController {
  private categoryService: CategoryService = new CategoryService()

  constructor() {}

  async createOne(restaurantId: string, payload: Partial<CategoryModel>) {
    return this.categoryService.createOne(restaurantId, payload)
  }

  async list(restaurantId: string) {
    return this.categoryService.list(restaurantId)
  }

  async getOne(restaurantId: string, id: string) {
    return this.categoryService.getOne(restaurantId, id)
  }

  async update(restaurantId: string, id: string, payload: Partial<CategoryModel>) {
    return this.categoryService.update(restaurantId, id, payload)
  }

  async delete(restaurantId: string, id: string) {
    return this.categoryService.delete(restaurantId, id)
  }
}