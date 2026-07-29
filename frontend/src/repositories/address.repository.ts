import type { AddressModel } from '#/model/address.model'
import HttpClient from '#/utils/HttpClient.util'

const httpClient = new HttpClient()

export class AddressRepository {
  async create(
    userId: string,
    payload: Partial<AddressModel>,
  ): Promise<AddressModel | null> {
    return httpClient.post<AddressModel, Partial<AddressModel>>(
      `/users/${userId}/addresses`,
      payload,
    )
  }

  async list(userId: string): Promise<AddressModel[] | null> {
    return httpClient.get<AddressModel[]>(`/users/${userId}/addresses`)
  }

  async get(userId: string, id: string): Promise<AddressModel | null> {
    return httpClient.get<AddressModel>(`/users/${userId}/addresses/${id}`)
  }

  async update(
    userId: string,
    id: string,
    payload: Partial<AddressModel>,
  ): Promise<AddressModel | null> {
    return httpClient.patch<AddressModel, Partial<AddressModel>>(
      `/users/${userId}/addresses/${id}`,
      payload,
    )
  }

  async remove(userId: string, id: string): Promise<void> {
    return httpClient.delete<void>(`/users/${userId}/addresses/${id}`)
  }
}
