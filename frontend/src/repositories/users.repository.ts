import type { UserModel } from '#/model/users.model'
import HttpClient from '#/utils/HttpClient.util'

const httpClient = new HttpClient()

export class UsersRepository {
  async create(payload: Partial<UserModel>) {
    return httpClient.post<UserModel, Partial<UserModel>>('/users', payload)
  }

  async list() {
    return httpClient.get<UserModel[]>('/users')
  }

  async getOne(id: string) {
    return httpClient.get<UserModel>(`/users/${id}`)
  }

  async update(id: string, payload: Partial<UserModel>) {
    return httpClient.patch<UserModel, Partial<UserModel>>(
      `/users/${id}`,
      payload,
    )
  }

  async delete(id: string) {
    return httpClient.delete<void>(`/users/${id}`)
  }
}
