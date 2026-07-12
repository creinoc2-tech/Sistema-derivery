import { z } from "zod";

export const createProductSchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(2).max(100),
  slug: z.string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  description: z.string().max(500).optional(),
  price: z.coerce.number().positive().multipleOf(0.01),
  imageUrl: z.string().url().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const toggleAvailabilitySchema = z.object({
  isAvailable: z.boolean(),
});

export const productParamsSchema = z.object({
  id: z.string().uuid(),
});

 export const listProductsQuerySchema = z.object({
  categoryId: z.string().uuid().optional(),
  isAvailable: z
    .preprocess((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    }, z.boolean())
    .optional(),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ToggleAvailabilityInput = z.infer<typeof toggleAvailabilitySchema>;
export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;