 import { Hono } from "hono";
import { db } from "./src/db/client";
import { users } from "./src/db/schema/users.schema";
import { errorHandler } from "./src/middlewares/error-handler";

const app = new Hono();

 app.onError(errorHandler);

export default app;