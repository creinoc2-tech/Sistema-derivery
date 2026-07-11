import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { productsHandlers } from "./products.handlers";
import {
  createProductSchema,
  updateProductSchema,
  toggleAvailabilitySchema,
  productParamsSchema,
  listProductsQuerySchema,
} from "./products.schema";

const products = new Hono();

products.post("/", zValidator("json", createProductSchema), productsHandlers.create);
products.get("/", zValidator("query", listProductsQuerySchema), productsHandlers.list);
products.get("/:id", zValidator("param", productParamsSchema), productsHandlers.get);
products.patch("/:id", zValidator("param", productParamsSchema), zValidator("json", updateProductSchema), productsHandlers.update);
products.patch("/:id/availability", zValidator("param", productParamsSchema), zValidator("json", toggleAvailabilitySchema), productsHandlers.toggleAvailability);
products.delete("/:id", zValidator("param", productParamsSchema), productsHandlers.remove);

export { products as productsRoutes };