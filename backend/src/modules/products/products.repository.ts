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
        rating: data.rating?.toString() || "5.0",
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

  findAll() {
    return db.select().from(products);
  },

  findByCategoryId(categoryId: string) {
    return db
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId))
      .then((rows) => rows);
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
    const { price, rating, ...rest } = data;
    return db
      .update(products)
      .set({
        ...rest,
        ...(price !== undefined && { price: price.toString() }),
        ...(rating !== undefined && { rating: rating.toString() }),
      })
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
