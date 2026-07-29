import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { usersHandlers } from "./user.handlers";
import {
	createUserSchema,
	updateUserSchema,
	userParamsSchema,
} from "./user.schema";

const users = new Hono();

users.post("/", zValidator("json", createUserSchema), usersHandlers.create);
users.get("/", usersHandlers.list);
users.get("/:id", zValidator("param", userParamsSchema), usersHandlers.get);
users.patch(
	"/:id",
	zValidator("param", userParamsSchema),
	zValidator("json", updateUserSchema),
	usersHandlers.update,
);
users.delete(
	"/:id",
	zValidator("param", userParamsSchema),
	usersHandlers.remove,
);

export { users as usersRoutes };
