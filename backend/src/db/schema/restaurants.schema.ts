import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const approvalStatusEnum = pgEnum("approval_status", ["pending", "approved", "rejected"]);

export const restaurants = pgTable("restaurants", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  ownerId: text("owner_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: approvalStatusEnum("status").notNull().default("pending"),
  stripeAccountId: text("stripe_account_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});