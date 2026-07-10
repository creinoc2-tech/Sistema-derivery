import type { Context } from "hono";
import { categoriesService } from "./categories.service";

export const categoriesHandlers = {
  async create(c: Context) {
  const { restaurantId } = c.req.param();
    const input = c.req.valid("json" as never);
    const category = await categoriesService.create(restaurantId!, input);
    return c.json(category, 201);
  },

  async list(c: Context) {
    const { restaurantId } = c.req.param();
    const list = await categoriesService.listByRestaurant(restaurantId!);
    return c.json(list);
  },

    async get(c: Context) {
    const { id } = c.req.valid("param" as never);
    const category = await categoriesService.findById(id);
    if (!category) return c.json({ error: "CATEGORY_NOT_FOUND" }, 404);
    return c.json(category);
  },

  async update(c: Context) {
    const { restaurantId } = c.req.param();
    const { id } = c.req.valid("param" as never);
    const input = c.req.valid("json" as never);
    const category = await categoriesService.update(id, restaurantId!, input);
    return c.json(category);
  },

  async remove(c: Context) {
    const { restaurantId } = c.req.param();
    const { id } = c.req.valid("param" as never);
    await categoriesService.delete(id, restaurantId!);
    return c.body(null, 204);
  },
};