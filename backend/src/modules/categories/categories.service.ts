import { AppError } from "../../lib/app-error";
import { categoriesRepository } from "./categories.repository";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./categories.schema";

export const categoriesService = {
  async create(restaurantId: string, input: CreateCategoryInput) {
    const existing = await categoriesRepository.findBySlugAndRestaurant(
      input.slug,
      restaurantId,
    );
    if (existing) throw new AppError("SLUG_ALREADY_EXISTS", 409);

    const [category] = await categoriesRepository.create(input, restaurantId);
    return category;
  },

  async listByRestaurant(restaurantId: string) {
    return categoriesRepository.findAllByRestaurant(restaurantId);
  },

  async findById(id: string) {
    return categoriesRepository.findById(id);
  },

  async update(id: string, restaurantId: string, input: UpdateCategoryInput) {
    const category = await categoriesRepository.findById(id);
    if (!category) throw new AppError("CATEGORY_NOT_FOUND", 404);
    if (category.restaurantId !== restaurantId)
      throw new AppError("FORBIDDEN", 403);

    const [updated] = await categoriesRepository.update(id, input);
    return updated;
  },

  async delete(id: string, restaurantId: string) {
    const category = await categoriesRepository.findById(id);
    if (!category) throw new AppError("CATEGORY_NOT_FOUND", 404);
    if (category.restaurantId !== restaurantId)
      throw new AppError("FORBIDDEN", 403);

    return categoriesRepository.delete(id);
  },
};
