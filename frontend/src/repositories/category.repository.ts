import type { CategoryModel } from '#/model/category.model'
import HttpClient from '#/utils/HttpClient.util'

const httpClient = new HttpClient()

export class CategoryRepository {
  async createOne(restaurantId: string, payload: Partial<CategoryModel>) {
    return httpClient.post<CategoryModel, Partial<CategoryModel>>(
      `/restaurants/${restaurantId}/categories`,
      payload,
    )
  }

  async list(restaurantId: string) {
    return httpClient.get<CategoryModel[]>(
      `/restaurants/${restaurantId}/categories`,
    )
  }

  async getOne(restaurantId: string, id: string) {
    return httpClient.get<CategoryModel>(
      `/restaurants/${restaurantId}/categories/${id}`,
    )
  }

  async update(restaurantId: string, id: string, payload: Partial<CategoryModel>) {
    return httpClient.patch<CategoryModel, Partial<CategoryModel>>(
      `/restaurants/${restaurantId}/categories/${id}`,
      payload,
    )
  }

  async delete(restaurantId: string, id: string) {
    return httpClient.delete<void>(
      `/restaurants/${restaurantId}/categories/${id}`,
    )
  }
}