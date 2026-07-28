import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { addressesHandlers } from "./address.handlers";
import {
	addressParamsSchema,
	addressUserParamsSchema,
	createAddressSchema,
	updateAddressSchema,
} from "./addresses.schema";

const addresses = new Hono();

addresses.post(
	"/",
	zValidator("param", addressUserParamsSchema),
	zValidator("json", createAddressSchema),
	addressesHandlers.create,
);

addresses.get(
	"/",
	zValidator("param", addressUserParamsSchema),
	addressesHandlers.list,
);

addresses.get(
	"/:id",
	zValidator("param", addressParamsSchema),
	addressesHandlers.get,
);

addresses.patch(
	"/:id",
	zValidator("param", addressParamsSchema),
	zValidator("json", updateAddressSchema),
	addressesHandlers.update,
);

addresses.delete(
	"/:id",
	zValidator("param", addressParamsSchema),
	addressesHandlers.remove,
);

export { addresses as addressesRoutes };
