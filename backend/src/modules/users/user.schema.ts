import { z } from "zod";

export const userRoleSchema = z.enum(["customer", "restaurant", "admin"]);

export const createUserSchema = z.object({
	id: z.string().min(1),
	email: z.string().email(),
	name: z.string().min(2).max(120),
	role: userRoleSchema.default("customer"),
});

export const updateUserSchema = z
	.object({
		email: z.string().email().optional(),
		name: z.string().min(2).max(120).optional(),
		role: userRoleSchema.optional(),
	})
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided",
	});

export const userParamsSchema = z.object({
	id: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
