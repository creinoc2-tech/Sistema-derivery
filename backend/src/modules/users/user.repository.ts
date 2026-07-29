import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { users } from "../../db/schema/users.schema";
import type { CreateUserInput, UpdateUserInput } from "./user.schema";

export const usersRepository = {
	create(data: CreateUserInput) {
		return db.insert(users).values(data).returning();
	},

	findAll() {
		return db.select().from(users);
	},

	findById(id: string) {
		return db
			.select()
			.from(users)
			.where(eq(users.id, id))
			.then((rows) => rows[0]);
	},

	findByEmail(email: string) {
		return db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.then((rows) => rows[0]);
	},

	update(id: string, data: UpdateUserInput) {
		return db.update(users).set(data).where(eq(users.id, id)).returning();
	},

	delete(id: string) {
		return db.delete(users).where(eq(users.id, id));
	},
};
