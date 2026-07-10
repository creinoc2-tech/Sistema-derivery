// db/schema/transactions.schema.ts
import { pgTable, text, timestamp, numeric, pgEnum } from "drizzle-orm/pg-core";
import { orders } from "./orders.schema";
import { restaurants } from "./restaurants.schema";

export const transactionStatusEnum = pgEnum("transaction_status", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
]);

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  orderId: text("order_id").notNull().references(() => orders.id),
  restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull().unique(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  platformFee: numeric("platform_fee", { precision: 10, scale: 2 }).notNull(),
  status: transactionStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});