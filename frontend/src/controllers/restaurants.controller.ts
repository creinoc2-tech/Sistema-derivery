import type { RestaurantModel } from '#/model/restaurants.model'
import { RestaurantsService } from '#/services/restaurants.service'

export class RestaurantsController {
  private restaurantsService: RestaurantsService = new RestaurantsService()

  constructor() {}

  async createOne(payload: Partial<RestaurantModel>) {
    return this.restaurantsService.createOne(payload)
  }

  async list() {
    return this.restaurantsService.list()
  }

  async getOne(id: string) {
    return this.restaurantsService.getOne(id)
  }

  async update(id: string, payload: Partial<RestaurantModel>) {
    return this.restaurantsService.update(id, payload)
  }

  async updateStatus(id: string, status: 'approved' | 'rejected') {
    return this.restaurantsService.updateStatus(id, status)
  }
}
