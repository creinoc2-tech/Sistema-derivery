// middlewares/error-handler.ts
import type { ErrorHandler } from "hono";
import { AppError } from "../lib/app-error";

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof AppError) {
    return c.json({ error: err.code, message: err.message }, err.status as any);
  }

  console.error(err); // log real del error inesperado
  return c.json({ error: "INTERNAL_SERVER_ERROR" }, 500);
};