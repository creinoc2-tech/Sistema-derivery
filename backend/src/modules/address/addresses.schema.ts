import { z } from "zod";

export const createAddressSchema = z.object({
  label: z.string().max(50).optional(),
  street: z.string().min(3).max(200),
  city: z.string().min(2).max(100),
  reference: z.string().max(200).optional(),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  isDefault: z.boolean().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();

export const addressUserParamsSchema = z.object({
  userId: z.string(),
});

export const addressParamsSchema = z.object({
  userId: z.string(),
  id: z.string(),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;