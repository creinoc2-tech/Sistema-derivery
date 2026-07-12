import { Hono } from "hono";

import { errorHandler } from "./src/middlewares/error-handler";
import { categoriesRoutes } from "./src/modules/categories/categories.routes";
import { swaggerUI } from "@hono/swagger-ui";
import { restaurantsRoutes } from "./src/modules/restaurants/restaurants.routes";
import { productsRoutes } from "./src/modules/products/products.routes";
import { corsMiddleware } from "./src/middlewares/cors";

const app = new Hono();
app.use("*", corsMiddleware);  

app.onError(errorHandler);
app.route("/restaurants/:restaurantId/categories", categoriesRoutes);
app.route("/restaurants", restaurantsRoutes);
app.route("/restaurants/:restaurantId/products", productsRoutes);

export default {
  port: 4000,
  fetch: app.fetch,
};
