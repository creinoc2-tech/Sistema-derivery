import { z } from "zod";

export const createRestaurantSchema = z.object({
  ownerId: z.string(), 
  name: z.string().min(2).max(100),
  slug: z.string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
});

export const updateRestaurantSchema = createRestaurantSchema.partial();

export const approveRestaurantSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export const restaurantParamsSchema = z.object({
  id: z.string().uuid(),
});

export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
export type ApproveRestaurantInput = z.infer<typeof approveRestaurantSchema>;