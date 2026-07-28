import { db } from "../../db/client";
import { eq } from "drizzle-orm";
import { addresses } from "../../db/schema/addresses.schema";
import type { CreateAddressInput, UpdateAddressInput } from "./addresses.schema";

export const addressesRepository = {
  create(data: CreateAddressInput, userId: string) {
    return db.insert(addresses).values({
      ...data,
      userId,
      latitude: data.latitude?.toString(),
      longitude: data.longitude?.toString(),
    }).returning();
  },

  findAllByUser(userId: string) {
    return db.select().from(addresses).where(eq(addresses.userId, userId));
  },

  findById(id: string) {
    return db.select().from(addresses).where(eq(addresses.id, id)).then((rows) => rows[0]);
  },

  update(id: string, data: Partial<UpdateAddressInput>) {
    const { latitude, longitude, ...rest } = data;
    return db.update(addresses).set({
      ...rest,
      ...(latitude !== undefined && { latitude: latitude.toString() }),
      ...(longitude !== undefined && { longitude: longitude.toString() }),
    }).where(eq(addresses.id, id)).returning();
  },

  unsetDefaultForUser(userId: string) {
    return db.update(addresses).set({ isDefault: false }).where(eq(addresses.userId, userId));
  },

  delete(id: string) {
    return db.delete(addresses).where(eq(addresses.id, id));
  },
};