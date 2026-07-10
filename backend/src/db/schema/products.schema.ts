// db/schema/products.schema.ts (antes menu.schema.ts)
import { pgTable, text, timestamp, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurants.schema";
import { categories } from "./categories.schema";

export const products = pgTable("products", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
  categoryId: text("category_id").notNull().references(() => categories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});