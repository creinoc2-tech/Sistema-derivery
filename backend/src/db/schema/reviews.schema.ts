import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { restaurants } from "./restaurants.schema";
import { orders } from "./orders.schema";

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  customerId: text("customer_id").notNull().references(() => users.id),
  restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
  orderId: text("order_id").notNull().references(() => orders.id),
  rating: integer("rating").notNull(), // 1 a 5
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});