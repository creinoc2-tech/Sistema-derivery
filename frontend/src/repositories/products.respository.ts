import type { ProductModel } from '#/model/product.model'
import HttpClient from '#/utils/HttpClient.util'

const httpClient = new HttpClient()

export interface ListProductsFilters {
  categoryId?: string
  isAvailable?: boolean
}

export class ProductRepository {
  async createOne(restaurantId: string, payload: Partial<ProductModel>) {
    return httpClient.post<ProductModel, Partial<ProductModel>>(
      `/restaurants/${restaurantId}/products`,
      payload,
    )
  }

  async list(restaurantId: string, filters?: ListProductsFilters) {
    const params = new URLSearchParams()
    if (filters?.categoryId) params.set('categoryId', filters.categoryId)
    if (filters?.isAvailable !== undefined)
      params.set('isAvailable', String(filters.isAvailable))

    const query = params.toString()
    return httpClient.get<ProductModel[]>(
      `/restaurants/${restaurantId}/products${query ? `?${query}` : ''}`,
    )
  }

  async getOne(restaurantId: string, id: string) {
    return httpClient.get<ProductModel>(
      `/restaurants/${restaurantId}/products/${id}`,
    )
  }

  async update(restaurantId: string, id: string, payload: Partial<ProductModel>) {
    return httpClient.patch<ProductModel, Partial<ProductModel>>(
      `/restaurants/${restaurantId}/products/${id}`,
      payload,
    )
  }

  async toggleAvailability(restaurantId: string, id: string, isAvailable: boolean) {
    return httpClient.patch<ProductModel, { isAvailable: boolean }>(
      `/restaurants/${restaurantId}/products/${id}/availability`,
      { isAvailable },
    )
  }

  async delete(restaurantId: string, id: string) {
    return httpClient.delete<void>(
      `/restaurants/${restaurantId}/products/${id}`,
    )
  }
}