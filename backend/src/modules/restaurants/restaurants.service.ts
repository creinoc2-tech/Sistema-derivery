import { AppError } from "../../lib/app-error";
import { restaurantsRepository } from "./restaurants.repository";
import type { CreateRestaurantInput, UpdateRestaurantInput } from "./restaurants.schema";

export const restaurantsService = {
  async create(ownerId: string, input: CreateRestaurantInput) {
    const existing = await restaurantsRepository.findBySlug(input.slug);
    if (existing) throw new AppError("SLUG_ALREADY_EXISTS", 409);

    const [restaurant] = await restaurantsRepository.create({ ...input, ownerId });
    return restaurant;
  },

  listAll() {
    return restaurantsRepository.findAll();
  },

  async findById(id: string) {
    const restaurant = await restaurantsRepository.findById(id);
    if (!restaurant) throw new AppError("RESTAURANT_NOT_FOUND", 404);
    return restaurant;
  },

  async update(id: string, ownerId: string, input: UpdateRestaurantInput) {
    const restaurant = await restaurantsRepository.findById(id);
    if (!restaurant) throw new AppError("RESTAURANT_NOT_FOUND", 404);
    if (restaurant.ownerId !== ownerId) throw new AppError("FORBIDDEN", 403);

    const [updated] = await restaurantsRepository.update(id, input);
    return updated;
  },

  async approve(id: string, status: "approved" | "rejected") {
    const restaurant = await restaurantsRepository.findById(id);
    if (!restaurant) throw new AppError("RESTAURANT_NOT_FOUND", 404);

    const [updated] = await restaurantsRepository.updateStatus(id, status);
    return updated;
  },
};