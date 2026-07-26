import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { productsHandlers } from "./products.handlers";
import { listProductsQuerySchema, productParamsSchema } from "./products.schema";

const productsGlobal = new Hono();

productsGlobal.get("/all", productsHandlers.listAll);
productsGlobal.get("/:slug", zValidator("param", productParamsSchema), productsHandlers.get);

export { productsGlobal as productsGlobalRoutes };