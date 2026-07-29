import type { AddressModel } from '#/model/address.model'
import { AddressService } from '#/services/address.service'

export class AddressController {
  private addressService: AddressService = new AddressService()

  constructor() {}

  async create(userId: string, payload: Partial<AddressModel>) {
    return this.addressService.create(userId, payload)
  }

  async list(userId: string): Promise<AddressModel[] | null> {
    return this.addressService.list(userId)
  }

  async get(userId: string, id: string): Promise<AddressModel | null> {
    return this.addressService.get(userId, id)
  }

  async update(
    userId: string,
    id: string,
    payload: Partial<AddressModel>,
  ): Promise<AddressModel | null> {
    return this.addressService.update(userId, id, payload)
  }

  async remove(userId: string, id: string): Promise<void> {
    return this.addressService.remove(userId, id)
  }
}