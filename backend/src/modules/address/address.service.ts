import { AppError } from "../../lib/app-error";
import { addressesRepository } from "./address.repository";
import type {
  CreateAddressInput,
  UpdateAddressInput,
} from "./addresses.schema";

export const addressesService = {
  async create(userId: string, input: CreateAddressInput) {
    if (input.isDefault) {
      await addressesRepository.unsetDefaultForUser(userId);
    }
    const [address] = await addressesRepository.create(input, userId);
    return address;
  },

  listByUser(userId: string) {
    return addressesRepository.findAllByUser(userId);
  },

  async findById(userId: string, id: string) {
    const address = await addressesRepository.findById(id);
    if (!address) throw new AppError("ADDRESS_NOT_FOUND", 404);
    if (address.userId !== userId) throw new AppError("FORBIDDEN", 403);
    return address;
  },

  async update(userId: string, id: string, input: UpdateAddressInput) {
    const address = await addressesRepository.findById(id);
    if (!address) throw new AppError("ADDRESS_NOT_FOUND", 404);
    if (address.userId !== userId) throw new AppError("FORBIDDEN", 403);

    if (input.isDefault) {
      await addressesRepository.unsetDefaultForUser(userId);
    }

    const [updated] = await addressesRepository.update(id, input);
    return updated;
  },

  async remove(userId: string, id: string) {
    const address = await addressesRepository.findById(id);
    if (!address) throw new AppError("ADDRESS_NOT_FOUND", 404);
    if (address.userId !== userId) throw new AppError("FORBIDDEN", 403);

    return addressesRepository.delete(id);
  },
};
