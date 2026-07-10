import type { Context } from "hono";
import { restaurantsService } from "./restaurants.service";

export const restaurantsHandlers = {
  async create(c: Context) {
    const input = c.req.valid("json" as never) as any;
    const { ownerId, ...rest } = input;
    const restaurant = await restaurantsService.create(ownerId, rest);
    return c.json(restaurant, 201);
  },

  async list(c: Context) {
    const list = await restaurantsService.listAll();
    return c.json(list);
  },

  async get(c: Context) {
    const { id } = c.req.valid("param" as never);
    const restaurant = await restaurantsService.findById(id);
    return c.json(restaurant);
  },

  async update(c: Context) {
    const { id } = c.req.valid("param" as never);
    const input = c.req.valid("json" as never) as any;
    const { ownerId, ...rest } = input;
    const restaurant = await restaurantsService.update(id, ownerId, rest);
    return c.json(restaurant);
  },

  async approve(c: Context) {
    const { id } = c.req.valid("param" as never);
    const { status } = c.req.valid("json" as never);
    const restaurant = await restaurantsService.approve(id, status);
    return c.json(restaurant);
  },
};