import type { AddressModel } from '#/model/address.model'
import { AddressRepository } from '#/repositories/address.repository'

export class AddressService {
  private addressRepository: AddressRepository = new AddressRepository()

  constructor() {}

  async create(userId: string, payload: Partial<AddressModel>) {
    return this.addressRepository.create(userId, payload)
  }

  async list(userId: string): Promise<AddressModel[] | null> {
    return this.addressRepository.list(userId)
  }

  async get(userId: string, id: string): Promise<AddressModel | null> {
    return this.addressRepository.get(userId, id)
  }

  async update(
    userId: string,
    id: string,
    payload: Partial<AddressModel>,
  ): Promise<AddressModel | null> {
    return this.addressRepository.update(userId, id, payload)
  }

  async remove(userId: string, id: string): Promise<void> {
    return this.addressRepository.remove(userId, id)
  }
} 