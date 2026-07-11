import { AppError } from "../../lib/app-error";
import { productsRepository } from "./products.repository";
import { categoriesRepository } from "../categories/categories.repository";
import type { CreateProductInput, UpdateProductInput } from "./products.schema";

async function assertCategoryBelongsToRestaurant(
  categoryId: string,
  restaurantId: string,
) {
  const category = await categoriesRepository.findById(categoryId);
  if (!category) throw new AppError("CATEGORY_NOT_FOUND", 404);
  if (category.restaurantId !== restaurantId)
    throw new AppError("CATEGORY_RESTAURANT_MISMATCH", 409);
}

export const productsService = {
  async create(restaurantId: string, input: CreateProductInput) {
    await assertCategoryBelongsToRestaurant(input.categoryId, restaurantId);

    const existing = await productsRepository.findBySlugAndRestaurant(
      input.slug,
      restaurantId,
    );
    if (existing) throw new AppError("SLUG_ALREADY_EXISTS", 409);

    const [product] = await productsRepository.create(input, restaurantId);
    return product;
  },

  listByRestaurant(
    restaurantId: string,
    filters?: { categoryId?: string; isAvailable?: boolean },
  ) {
    return productsRepository.findAllByRestaurant(restaurantId, filters);
  },

  async findById(id: string) {
    const product = await productsRepository.findById(id);
    if (!product) throw new AppError("PRODUCT_NOT_FOUND", 404);
    return product;
  },

  async update(id: string, restaurantId: string, input: UpdateProductInput) {
    const product = await productsRepository.findById(id);
    if (!product) throw new AppError("PRODUCT_NOT_FOUND", 404);
    if (product.restaurantId !== restaurantId)
      throw new AppError("FORBIDDEN", 403);

    if (input.categoryId) {
      await assertCategoryBelongsToRestaurant(input.categoryId, restaurantId);
    }

    const [updated] = await productsRepository.update(id, input);
    return updated;
  },

  async toggleAvailability(
    id: string,
    restaurantId: string,
    isAvailable: boolean,
  ) {
    const product = await productsRepository.findById(id);
    if (!product) throw new AppError("PRODUCT_NOT_FOUND", 404);
    if (product.restaurantId !== restaurantId)
      throw new AppError("FORBIDDEN", 403);

    const [updated] = await productsRepository.updateAvailability(
      id,
      isAvailable,
    );
    return updated;
  },

  async delete(id: string, restaurantId: string) {
    const product = await productsRepository.findById(id);
    if (!product) throw new AppError("PRODUCT_NOT_FOUND", 404);
    if (product.restaurantId !== restaurantId)
      throw new AppError("FORBIDDEN", 403);

    return productsRepository.delete(id);
  },
};
