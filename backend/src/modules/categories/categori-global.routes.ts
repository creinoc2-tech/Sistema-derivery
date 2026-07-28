import { Hono } from "hono";
import { categoriesHandlers } from "./categories.handlers";
import { zValidator } from "@hono/zod-validator";
import { categoryParamsSchema, categorySlugSchema } from "./categories.schema";
 
const categoriesGlobal = new Hono();

categoriesGlobal.get("/all", categoriesHandlers.listAll);
categoriesGlobal.get("/:slug", zValidator("param", categorySlugSchema), categoriesHandlers.getBySlug);
categoriesGlobal.get("/producto/:id", zValidator("param", categoryParamsSchema), categoriesHandlers.get);


export { categoriesGlobal as categoriesGlobalRoutes };
