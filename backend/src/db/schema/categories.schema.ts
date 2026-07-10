import { pgTable, text, timestamp, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurants.schema";

export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});