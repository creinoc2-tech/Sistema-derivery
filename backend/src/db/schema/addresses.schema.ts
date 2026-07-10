import { pgTable, text, timestamp, boolean, numeric } from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const addresses = pgTable("addresses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id),
  label: text("label"),                 // ej: "Casa", "Trabajo"
  street: text("street").notNull(),
  city: text("city").notNull(),
  reference: text("reference"),         // ej: "Portón azul, timbre 2"
  latitude: numeric("latitude", { precision: 9, scale: 6 }),
  longitude: numeric("longitude", { precision: 9, scale: 6 }),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});