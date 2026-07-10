import { db } from "../../db/client";
import { eq, and } from "drizzle-orm";
import { categories } from "../../db/schema/categories.schema";
import type {
  CreateCategoryInput,
  createCategorySchema,
} from "./categories.schema";

export const categoriesRepository = {
  create(data: CreateCategoryInput , restaurantId: string) {
    return db.insert(categories).values({ ...data, restaurantId }).returning();
  },

  findAllByRestaurant(restaurantId: string) {
    return db
      .select()
      .from(categories)
      .where(eq(categories.restaurantId, restaurantId));
  },

  findById(id: string) {
    return db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .then((rows) => rows[0]);
  },

  findBySlugAndRestaurant(slug: string, restaurantId: string) {
    return db
      .select()
      .from(categories)
      .where(
        and(
          eq(categories.slug, slug),
          eq(categories.restaurantId, restaurantId),
        ),
      )
      .then((rows) => rows[0]);
  },

  update(
    id: string,
    data: Partial<CreateCategoryInput>,
  ) {
    return db
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();
  },

   delete(id: string) {
    return db.delete(categories).where(eq(categories.id, id));
  },
};
