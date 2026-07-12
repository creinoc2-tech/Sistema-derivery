import { cors } from "hono/cors";

export const corsMiddleware = cors({
  origin: ["http://localhost:3000"], // tu frontend con TanStack Start
  allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true, // vas a necesitarlo cuando conectes Clerk (cookies/tokens)
});