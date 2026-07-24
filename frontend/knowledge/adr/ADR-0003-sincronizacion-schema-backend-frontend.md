# ADR-0002 — Sincronización de schemas del backend con los modelos del frontend

## Status
Accepted

## Date
2026-07-23

## Context

El frontend usa tres modelos como fuente de verdad para sus componentes y stores:
`CategoryModel`, `RestaurantModel` y `ProductModel`. El backend tiene sus propios
schemas de Drizzle ORM y Zod que no coinciden en campos con los modelos del frontend.

Esta desincronización causará errores en tiempo de ejecución cuando el frontend
consuma la API real en lugar de los mocks locales.

### Diferencias detectadas por entidad

#### Restaurante

| Campo | Frontend `RestaurantModel` | Backend Drizzle schema | Acción requerida |
|---|---|---|---|
| `id` | `string` | `text` UUID | ✅ coincide |
| `ownerId` | `string` | `text` FK → users | ✅ coincide |
| `name` | `string` | `text` | ✅ coincide |
| `slug` | `string` | `text` unique | ✅ coincide |
| `description` | `string?` | ❌ no existe | ➕ agregar al schema |
| `status` | `pending\|approved\|rejected` | `approvalStatusEnum` | ✅ coincide |
| `stripeAccountId` | `string?` | `text` nullable | ✅ coincide |
| `imageUrl` | `string?` | ❌ no existe | ➕ agregar al schema |
| `createdAt` | `string` | `timestamp` | ✅ coincide |

#### Categoría

| Campo | Frontend `CategoryModel` | Backend Drizzle schema | Acción requerida |
|---|---|---|---|
| `id` | `string` | `text` UUID | ✅ coincide |
| `restaurantId` | `string` | `text` FK → restaurants | ✅ coincide |
| `name` | `string` | `text` | ✅ coincide |
| `slug` | `string` | `text` | ✅ coincide |
| `imageUrl` | `string` | ❌ no existe | ➕ agregar al schema |
| `description` | `string` | ❌ no existe | ➕ agregar al schema |
| `sortOrder` | `number` | `integer` default 0 | ✅ coincide |
| `isActive` | `boolean` | `boolean` default true | ✅ coincide |
| `createdAt` | `string` | `timestamp` | ✅ coincide |

#### Producto

| Campo | Frontend `ProductModel` | Backend Drizzle schema | Acción requerida |
|---|---|---|---|
| `id` | `string` | `text` UUID | ✅ coincide |
| `restaurantId` | `string` | `text` FK → restaurants | ✅ coincide |
| `categoryId` | `string` | `text` FK → categories | ✅ coincide |
| `name` | `string` | `text` | ✅ coincide |
| `slug` | `string` | `text` | ✅ coincide |
| `description` | `string?` | `text` nullable | ✅ coincide |
| `price` | `string` | `numeric(10,2)` | ⚠️ cambiar a `number` en frontend |
| `imageUrl` | `string[]` | `text` (una sola URL) | ⚠️ cambiar a `string[]` en backend |
| `isAvailable` | `boolean` | `boolean` default true | ✅ coincide |
| `rating` | `number?` | ❌ no existe | ➕ agregar al schema o quitar del frontend |
| `createdAt` | `string` | `timestamp` | ✅ coincide |

---

## Decision

### 1. Agregar campos faltantes al schema Drizzle del backend

#### `restaurants.schema.ts` — agregar `description` e `imageUrl`

```ts
import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const approvalStatusEnum = pgEnum("approval_status", [
  "pending",
  "approved",
  "rejected",
]);

export const restaurants = pgTable("restaurants", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  ownerId: text("owner_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),            // ← agregar
  imageUrl: text("image_url"),                 // ← agregar
  status: approvalStatusEnum("status").notNull().default("pending"),
  stripeAccountId: text("stripe_account_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

#### `categories.schema.ts` — agregar `description` e `imageUrl`

```ts
import { pgTable, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurants.schema";

export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),           // ← agregar
  imageUrl: text("image_url"),                // ← agregar
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

#### `products.schema.ts` — cambiar `imageUrl` a array y agregar `rating`

```ts
import { pgTable, text, timestamp, boolean, numeric, json } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurants.schema";
import { categories } from "./categories.schema";

export const products = pgTable("products", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
  categoryId: text("category_id").notNull().references(() => categories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: json("image_url").$type<string[]>().default([]),  // ← cambiar a array
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

> `rating` se decide NO agregar al schema de productos porque es un valor calculado
> (promedio de reseñas), no un campo almacenado. Se elimina del `ProductModel` del
> frontend o se calcula en la query SQL con un JOIN a la tabla `reviews`.

---

### 2. Actualizar los schemas Zod del backend

#### `restaurants.schema.ts` (Zod)

```ts
import { z } from "zod";

export const createRestaurantSchema = z.object({
  ownerId: z.string(),
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  description: z.string().max(500).optional(),   // ← agregar
  imageUrl: z.string().url().optional(),          // ← agregar
});

export const updateRestaurantSchema = createRestaurantSchema.partial();

export const approveRestaurantSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export const restaurantParamsSchema = z.object({
  id: z.string(),
});

export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
export type ApproveRestaurantInput = z.infer<typeof approveRestaurantSchema>;
```

#### `categories.schema.ts` (Zod)

```ts
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(50),
  slug: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  description: z.string().max(300).optional(),   // ← agregar
  imageUrl: z.string().url().optional(),          // ← agregar
  sortOrder: z.number().int().min(0).default(0),
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryParamsSchema = z.object({
  id: z.string(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
```

#### `products.schema.ts` (Zod)

```ts
import { z } from "zod";

export const createProductSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  description: z.string().max(500).optional(),
  price: z.coerce.number().positive().multipleOf(0.01),
  imageUrl: z.array(z.string().url()).default([]),  // ← cambiar a array
});

export const updateProductSchema = createProductSchema.partial();

export const toggleAvailabilitySchema = z.object({
  isAvailable: z.boolean(),
});

export const productParamsSchema = z.object({
  id: z.string(),
});

export const listProductsQuerySchema = z.object({
  categoryId: z.string().optional(),
  isAvailable: z
    .preprocess((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    }, z.boolean())
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ToggleAvailabilityInput = z.infer<typeof toggleAvailabilitySchema>;
export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;
```

---

### 3. Ajuste en el frontend — `ProductModel`

```ts
// src/model/product.model.ts
export interface ProductModel {
  id: string
  restaurantId: string
  categoryId: string
  name: string
  slug: string
  description?: string
  price: number        // ← cambiar de string a number
  imageUrl: string[]   // ← mantener como array
  isAvailable: boolean
  createdAt: string
  // rating: number?   // ← eliminar — es calculado, no viene del producto
}
```

---

### 4. Generar la migración de Drizzle

Después de editar los schemas Drizzle, ejecutar:

```bash
cd backend
bun run drizzle-kit generate
bun run drizzle-kit migrate
```

Esto genera el archivo SQL en `src/db/migrations/` y lo aplica en Neon PostgreSQL.

---

## Consequences

### Positivas
- Frontend y backend hablan el mismo contrato — sin conversiones ni mapeos manuales.
- Los mocks del frontend ya tienen `imageUrl`, `description` y `imageUrl[]` por lo
  que los componentes visuales no necesitan cambios.
- Un solo `imageUrl` como array en productos permite múltiples fotos sin cambiar
  la interfaz del frontend.

### Negativas / riesgos
- El cambio de `imageUrl` en productos de `text` a `json` requiere una migración
  de datos si ya hay registros en la DB. Con datos de prueba no hay riesgo.
- `rating` eliminado del `ProductModel` — cualquier componente que lo use debe
  actualizarse para obtenerlo de `reviews` mediante un endpoint separado.
- El `restaurantParamsSchema` y `categoryParamsSchema` cambian de `z.string().uuid()`
  a `z.string()` porque el backend usa `crypto.randomUUID()` que no siempre es UUID
  estricto en todas las versiones de Bun.

---

## Related decisions

- ADR-0001: consolidación de stores del frontend — los modelos canónicos definidos
  aquí son los que usan los stores canónicos del ADR-0001.
- ADR-0003 (pendiente): contrato de respuesta HTTP — formato exacto del JSON que
  devuelve cada endpoint de la API para que el frontend pueda deserializarlo sin
  transformaciones.
