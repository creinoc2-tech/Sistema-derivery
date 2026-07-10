import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
 
import { categoriesHandlers } from "./categories.handlers";
import { createCategorySchema, updateCategorySchema, categoryParamsSchema } from "./categories.schema";

const categories = new Hono();

 
categories.post("/", zValidator("json", createCategorySchema), categoriesHandlers.create);
categories.get("/", categoriesHandlers.list);
categories.get("/:id", zValidator("param", categoryParamsSchema), categoriesHandlers.get);
categories.patch("/:id", zValidator("param", categoryParamsSchema), zValidator("json", updateCategorySchema), categoriesHandlers.update);
categories.delete("/:id", zValidator("param", categoryParamsSchema), categoriesHandlers.remove);

export default categories;