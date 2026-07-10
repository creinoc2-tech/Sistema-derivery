import { pgTable, text, timestamp, integer, boolean, numeric, pgEnum } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurants.schema";
 
export const menuCategories = pgTable("menu_categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const menuItems = pgTable("menu_items", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
  categoryId: text("category_id").notNull().references(() => menuCategories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});