import { Hono } from "hono";

import { errorHandler } from "./src/middlewares/error-handler";
import { categoriesRoutes } from "./src/modules/categories/categories.routes";
import { swaggerUI } from "@hono/swagger-ui";
import { restaurantsRoutes } from "./src/modules/restaurants/restaurants.routes";
import { productsRoutes  } from "./src/modules/products/products.routes";
import { productsGlobalRoutes } from "./src/modules/products/products-global.routes";
import { corsMiddleware } from "./src/middlewares/cors";
import { categoriesGlobalRoutes } from "./src/modules/categories/categori-global.routes";
import { addressesRoutes } from "./src/modules/address/address.routes";
import { usersRoutes } from "./src/modules/users/user.route";

const app = new Hono();
app.use("*", corsMiddleware);  

app.onError(errorHandler);
app.route("/restaurants/:restaurantId/categories", categoriesRoutes);
app.route("/restaurants", restaurantsRoutes);
app.route("/restaurants/:restaurantId/products", productsRoutes);
app.route("/products", productsGlobalRoutes);
app.route("/categories",  categoriesGlobalRoutes);
app.route("/users", usersRoutes);
app.route("/users/:userId/addresses", addressesRoutes);


export default {
  port: 4000,
  fetch: app.fetch,
};
