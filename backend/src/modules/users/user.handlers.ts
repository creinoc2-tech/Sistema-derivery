import type { Context } from "hono";
import { usersService } from "./user.service";

export const usersHandlers = {
	async create(c: Context) {
		const input = c.req.valid("json" as never);
		const user = await usersService.create(input);
		return c.json(user, 201);
	},

	async list(c: Context) {
		const users = await usersService.list();
		return c.json(users);
	},

	async get(c: Context) {
		const { id } = c.req.valid("param" as never);
		const user = await usersService.findById(id);
		return c.json(user);
	},

	async update(c: Context) {
		const { id } = c.req.valid("param" as never);
		const input = c.req.valid("json" as never);
		const user = await usersService.update(id, input);
		return c.json(user);
	},

	async remove(c: Context) {
		const { id } = c.req.valid("param" as never);
		await usersService.remove(id);
		return c.body(null, 204);
	},
};
