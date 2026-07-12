import type { RestaurantModel } from '#/model/restaurants.model'
import { RestaurantsRepository } from '#/repositories/restaurants.repository'

export class RestaurantsService {
  private restaurantsRepository: RestaurantsRepository =
    new RestaurantsRepository()

  constructor() {}

  async createOne(payload: Partial<RestaurantModel>) {
    return this.restaurantsRepository.createOne(payload)
  }

  async list() {
    return this.restaurantsRepository.list()
  }

  async getOne(id: string) {
    return this.restaurantsRepository.getOne(id)
  }

  async update(id: string, payload: Partial<RestaurantModel>) {
    return this.restaurantsRepository.update(id, payload)
  }

  async updateStatus(id: string, status: 'approved' | 'rejected') {
    return this.restaurantsRepository.asycUpdateStatus(id, status)
  }
}
