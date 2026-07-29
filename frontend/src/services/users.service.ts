import type { UserModel } from '#/model/users.model'
import { UsersRepository } from '#/repositories/users.repository'

export class UsersService {
  private usersRepository: UsersRepository = new UsersRepository()

  constructor() {}

  async create(payload: Partial<UserModel>) {
    return this.usersRepository.create(payload)
  }

  async list(): Promise<UserModel[] | null> {
    return this.usersRepository.list()
  }

  async getOne(id: string): Promise<UserModel | null> {
    return this.usersRepository.getOne(id)
  }

  async update(id: string, payload: Partial<UserModel>) {
    return this.usersRepository.update(id, payload)
  }

  async delete(id: string): Promise<void> {
    return this.usersRepository.delete(id)
  }
}