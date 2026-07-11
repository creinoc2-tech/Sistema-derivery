import { db } from "../../db/client";
import { eq, and } from "drizzle-orm";
import { products } from "../../db/schema/products.schema";
import type { CreateProductInput, UpdateProductInput } from "./products.schema";

export const productsRepository = {
  create(data: CreateProductInput, restaurantId: string) {
    return db
      .insert(products)
      .values({
        ...data,
        price: data.price.toString(),
        restaurantId,
      })
      .returning();
  },

  findAllByRestaurant(
    restaurantId: string,
    filters?: { categoryId?: string; isAvailable?: boolean },
  ) {
    const conditions = [eq(products.restaurantId, restaurantId)];
    if (filters?.categoryId)
      conditions.push(eq(products.categoryId, filters.categoryId));
    if (filters?.isAvailable !== undefined)
      conditions.push(eq(products.isAvailable, filters.isAvailable));

    return db
      .select()
      .from(products)
      .where(and(...conditions));
  },

  findById(id: string) {
    return db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .then((rows) => rows[0]);
  },

  findBySlugAndRestaurant(slug: string, restaurantId: string) {
    return db
      .select()
      .from(products)
      .where(
        and(eq(products.slug, slug), eq(products.restaurantId, restaurantId)),
      )
      .then((rows) => rows[0]);
  },

  update(id: string, data: Partial<UpdateProductInput>) {
    const { price, ...rest } = data;
    return db
      .update(products)
      .set({ ...rest, ...(price !== undefined && { price: price.toString() }) })
      .where(eq(products.id, id))
      .returning();
  },

  updateAvailability(id: string, isAvailable: boolean) {
    return db
      .update(products)
      .set({ isAvailable })
      .where(eq(products.id, id))
      .returning();
  },

  delete(id: string) {
    return db.delete(products).where(eq(products.id, id));
  },
};
