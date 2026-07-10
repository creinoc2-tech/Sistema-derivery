import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { restaurantsHandlers } from "./restaurants.handlers";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
  approveRestaurantSchema,
  restaurantParamsSchema,
} from "./restaurants.schema";

const restaurants = new Hono();

restaurants.post("/", zValidator("json", createRestaurantSchema), restaurantsHandlers.create);
restaurants.get("/", restaurantsHandlers.list);
restaurants.get("/:id", zValidator("param", restaurantParamsSchema), restaurantsHandlers.get);
restaurants.patch("/:id", zValidator("param", restaurantParamsSchema), zValidator("json", updateRestaurantSchema), restaurantsHandlers.update);
restaurants.patch("/:id/approve", zValidator("param", restaurantParamsSchema), zValidator("json", approveRestaurantSchema), restaurantsHandlers.approve);

export { restaurants as restaurantsRoutes };