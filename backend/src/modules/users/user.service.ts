import { AppError } from "../../lib/app-error";
import { usersRepository } from "./user.repository";
import type { CreateUserInput, UpdateUserInput } from "./user.schema";

export const usersService = {
	async create(input: CreateUserInput) {
		const existingById = await usersRepository.findById(input.id);
		if (existingById) throw new AppError("USER_ALREADY_EXISTS", 409);

		const existingByEmail = await usersRepository.findByEmail(input.email);
		if (existingByEmail) throw new AppError("EMAIL_ALREADY_EXISTS", 409);

		const [user] = await usersRepository.create(input);
		return user;
	},

	list() {
		return usersRepository.findAll();
	},

	async findById(id: string) {
		const user = await usersRepository.findById(id);
		if (!user) throw new AppError("USER_NOT_FOUND", 404);
		return user;
	},

	async update(id: string, input: UpdateUserInput) {
		const user = await usersRepository.findById(id);
		if (!user) throw new AppError("USER_NOT_FOUND", 404);

		if (input.email && input.email !== user.email) {
			const existingByEmail = await usersRepository.findByEmail(input.email);
			if (existingByEmail && existingByEmail.id !== id) {
				throw new AppError("EMAIL_ALREADY_EXISTS", 409);
			}
		}

		const [updated] = await usersRepository.update(id, input);
		return updated;
	},

	async remove(id: string) {
		const user = await usersRepository.findById(id);
		if (!user) throw new AppError("USER_NOT_FOUND", 404);

		return usersRepository.delete(id);
	},
};
