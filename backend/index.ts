import { Hono } from "hono";
import { db } from "./src/db/client";
import { users } from "./src/db/schema/users.schema";
import { errorHandler } from "./src/middlewares/error-handler";
import { categoriesRoutes } from "./src/modules/categories/categories.routes";

const app = new Hono();

app.onError(errorHandler);
app.route("/categories", categoriesRoutes);

export default app;
