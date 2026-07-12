import type { RestaurantModel } from '#/model/restaurants.model'
import HttpClient from '#/utils/HttpClient.util'

const httpClient = new HttpClient()

export class RestaurantsRepository {
  async createOne(payload: Partial<RestaurantModel>) {
    return httpClient.post<RestaurantModel, Partial<RestaurantModel>>(
      '/restaurants',
      payload,
    )
  }

  async list() {
    return httpClient.get<RestaurantModel[]>('/restaurants')
  }
  async getOne(id: string) {
    return httpClient.get<RestaurantModel>(`/restaurants/${id}`)
  }

  async update(id: string, payload: Partial<RestaurantModel>) {
    return httpClient.patch<RestaurantModel, Partial<RestaurantModel>>(
      `/restaurants/${id}`,
      payload,
    )
  }

  asycUpdateStatus(id: string, status: 'approved' | 'rejected') {
    return httpClient.patch<
      RestaurantModel,
      { status: 'approved' | 'rejected' }
    >(`/restaurants/${id}/approve`, { status })
  }
}
