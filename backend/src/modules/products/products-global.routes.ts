import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { productsHandlers } from "./products.handlers";
import { listProductsQuerySchema, productParamsSchema, productCategoryParamsSchema } from "./products.schema";

const productsGlobal = new Hono();

productsGlobal.get("/all", productsHandlers.listAll);
productsGlobal.get("/:id", zValidator("param", productParamsSchema), productsHandlers.get);
productsGlobal.get("/category/:categoryId", zValidator("param", productCategoryParamsSchema), productsHandlers.getByCategoryId);

export { productsGlobal as productsGlobalRoutes };