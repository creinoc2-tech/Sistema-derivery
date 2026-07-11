import type { Context } from "hono";
import { productsService } from "./products.service";

export const productsHandlers = {
  async create(c: Context) {
    const { restaurantId } = c.req.param()!;
    const input = c.req.valid("json" as never);
    const product = await productsService.create(restaurantId!, input);
    return c.json(product, 201);
  },

  async list(c: Context) {
    const { restaurantId } = c.req.param();
    const query = c.req.valid("query" as never) as any;
    const list = await productsService.listByRestaurant(restaurantId!, query);
    return c.json(list);
  },

  async get(c: Context) {
    const { id } = c.req.valid("param" as never);
    const product = await productsService.findById(id);
    return c.json(product);
  },

  async update(c: Context) {
    const { restaurantId, id } = c.req.param();
    const input = c.req.valid("json" as never);
    const product = await productsService.update(id!, restaurantId!, input);
    return c.json(product);
  },

  async toggleAvailability(c: Context) {
    const { restaurantId, id } = c.req.param()!;
    const { isAvailable } = c.req.valid("json" as never) as any;
    const product = await productsService.toggleAvailability(id!, restaurantId!, isAvailable);
    return c.json(product);
  },

  async remove(c: Context) {
    const { restaurantId, id } = c.req.param()!;
    await productsService.delete(id!, restaurantId!);
    return c.body(null, 204);
  },
};