import { db } from "../../db/client";
import { eq } from "drizzle-orm";
import { restaurants } from "../../db/schema/restaurants.schema";
import type { CreateRestaurantInput, UpdateRestaurantInput } from "./restaurants.schema";

export const restaurantsRepository = {
  create(data: CreateRestaurantInput & { ownerId: string }) {
    return db.insert(restaurants).values(data).returning();
  },

  findAll() {
    return db.select().from(restaurants);
  },

  findById(id: string) {
    return db.select().from(restaurants).where(eq(restaurants.id, id)).then((rows) => rows[0]);
  },

  findBySlug(slug: string ) {
    return db.select().from(restaurants).where(eq(restaurants.slug, slug)).then((rows) => rows[0]);
  },

  
  update(id: string, data: Partial<UpdateRestaurantInput>) {
    return db.update(restaurants).set(data).where(eq(restaurants.id, id)).returning();
  },

  updateStatus(id: string, status: "approved" | "rejected") {
    return db.update(restaurants).set({ status }).where(eq(restaurants.id, id)).returning();
  },
};