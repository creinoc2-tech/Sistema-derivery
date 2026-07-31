import * as z from "zod";

export const shippingAddressSchema = z.object({
  label: z.string() ,
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  reference: z.string() ,
  latitude: z.number() ,
  longitude: z.number() ,
  isDefault: z.boolean() ,
});

export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;
