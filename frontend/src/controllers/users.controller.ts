import type { UserModel } from '#/model/users.model'
import { UsersService } from '#/services/users.service'

export class UsersController {
  private usersService: UsersService = new UsersService()

  constructor() {}

  async create(payload: Partial<UserModel>) {
    return this.usersService.create(payload)
  }

  async list(): Promise<UserModel[] | null> {
    return this.usersService.list()
  }

  async getOne(id: string): Promise<UserModel | null> {
    return this.usersService.getOne(id)
  }

  async update(id: string, payload: Partial<UserModel>) {
    return this.usersService.update(id, payload)
  }

  async delete(id: string): Promise<void> {
    return this.usersService.delete(id)
  }
}