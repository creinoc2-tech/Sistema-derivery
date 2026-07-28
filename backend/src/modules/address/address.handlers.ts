import type { Context } from "hono";
import { addressesService } from "./address.service";

export const addressesHandlers = {
	async create(c: Context) {
		const { userId } = c.req.valid("param" as never);
		const input = c.req.valid("json" as never);
		const address = await addressesService.create(userId, input);
		return c.json(address, 201);
	},

	async list(c: Context) {
		const { userId } = c.req.valid("param" as never);
		const list = await addressesService.listByUser(userId);
		return c.json(list);
	},

	async get(c: Context) {
		const { userId, id } = c.req.valid("param" as never);
		const address = await addressesService.findById(userId, id);
		return c.json(address);
	},

	async update(c: Context) {
		const { userId, id } = c.req.valid("param" as never);
		const input = c.req.valid("json" as never);
		const address = await addressesService.update(userId, id, input);
		return c.json(address);
	},

	async remove(c: Context) {
		const { userId, id } = c.req.valid("param" as never);
		await addressesService.remove(userId, id);
		return c.body(null, 204);
	},
};
