import type { Context } from "hono";
import { categoriesService } from "./categories.service";

export const categoriesHandlers = {
  async create(c: Context) {
    const user = c.get("user");
    const input = c.req.valid("json" as never);
    const category = await categoriesService.create(user.restaurantId, input);
    return c.json(category, 201);
  },

  async list(c: Context) {
    const user = c.get("user");
    const list = await categoriesService.listByRestaurant(user.restaurantId);
    return c.json(list);
  },

    async get(c: Context) {
    const { id } = c.req.valid("param" as never);
    const category = await categoriesService.findById(id);
    if (!category) return c.json({ error: "CATEGORY_NOT_FOUND" }, 404);
    return c.json(category);
  },

  async update(c: Context) {
    const user = c.get("user");
    const { id } = c.req.valid("param" as never);
    const input = c.req.valid("json" as never);
    const category = await categoriesService.update(id, user.restaurantId, input);
    return c.json(category);
  },

  async remove(c: Context) {
    const user = c.get("user");
    const { id } = c.req.valid("param" as never);
    await categoriesService.delete(id, user.restaurantId);
    return c.body(null, 204);
  },
};