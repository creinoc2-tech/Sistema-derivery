import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as usersSchema from "./schema/users.schema";
import * as restaurantsSchema from "./schema/restaurants.schema";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, {
  schema: { ...usersSchema, ...restaurantsSchema },
});