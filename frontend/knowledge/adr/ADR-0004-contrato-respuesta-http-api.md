# ADR-0003 — Contrato de respuesta HTTP de la API (restaurantes, categorías y productos)

## Status
Accepted

## Date
2026-07-23

## Restricción crítica

**NO modificar:**
- `*.handlers.ts`
- `*.service.ts`
- `*.repository.ts`

Solo se modifican: `*.schema.ts` (Drizzle) y `*.schema.ts` (Zod) de cada módulo.
Los handlers, services y repositories funcionan correctamente y no son parte de este ADR.

---

## Context

El frontend consume la API del backend usando TanStack Query. Para que la
deserialización funcione sin transformaciones manuales, el JSON que devuelve
cada endpoint debe tener exactamente los mismos campos y tipos que los modelos
del frontend (`RestaurantModel`, `CategoryModel`, `ProductModel`).

Los handlers ya devuelven directamente lo que retorna el service, que a su vez
retorna lo que retorna el repository, que devuelve filas de Drizzle. Por eso
**el contrato de respuesta depende 100% de los campos que existan en el schema
de Drizzle** — que es lo único que se cambia en este ADR.

---

## Endpoints y contrato de respuesta esperado

### Restaurantes

**Base URL:** `/api/restaurants`

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/` | Crear restaurante |
| `GET` | `/` | Listar todos |
| `GET` | `/:id` | Obtener uno por id |
| `PATCH` | `/:id` | Actualizar |
| `PATCH` | `/:id/approve` | Aprobar o rechazar |

**Respuesta esperada (GET `/` y GET `/:id`):**
```json
{
  "id": "uuid",
  "ownerId": "clerk_user_id",
  "name": "Sabor Casero",
  "slug": "sabor-casero",
  "description": "Comida casera ecuatoriana",
  "imageUrl": "https://...",
  "status": "approved",
  "stripeAccountId": null,
  "createdAt": "2024-03-15T10:30:00.000Z"
}
```

**Campos que deben existir en `restaurants.schema.ts` (Drizzle) para que
aparezcan en la respuesta:**

```ts
description: text("description"),   // ← agregar
imageUrl: text("image_url"),         // ← agregar
```

---

### Categorías

**Base URL:** `/api/restaurants/:restaurantId/categories`

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/` | Crear categoría |
| `GET` | `/` | Listar por restaurante |
| `GET` | `/:id` | Obtener una por id |
| `PATCH` | `/:id` | Actualizar |
| `DELETE` | `/:id` | Eliminar |

**Respuesta esperada (GET `/`):**
```json
[
  {
    "id": "uuid",
    "restaurantId": "uuid",
    "name": "Entradas",
    "slug": "entradas",
    "description": "Deliciosas entradas para comenzar",
    "imageUrl": "https://...",
    "sortOrder": 1,
    "isActive": true,
    "createdAt": "2024-03-15T10:30:00.000Z"
  }
]
```

**Campos que deben existir en `categories.schema.ts` (Drizzle):**

```ts
description: text("description"),   // ← agregar
imageUrl: text("image_url"),         // ← agregar
```

---

### Productos

**Base URL:** `/api/restaurants/:restaurantId/products`

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/` | Crear producto |
| `GET` | `/` | Listar por restaurante (con filtros opcionales) |
| `GET` | `/:id` | Obtener uno por id |
| `PATCH` | `/:id` | Actualizar |
| `PATCH` | `/:id/availability` | Cambiar disponibilidad |
| `DELETE` | `/:id` | Eliminar |

**Query params disponibles en `GET /`:**
- `categoryId` (string, opcional) — filtrar por categoría
- `isAvailable` (boolean, opcional) — filtrar por disponibilidad

**Respuesta esperada (GET `/`):**
```json
[
  {
    "id": "uuid",
    "restaurantId": "uuid",
    "categoryId": "uuid",
    "name": "Ceviche Mixto",
    "slug": "ceviche-mixto",
    "description": "Ceviche de mariscos frescos",
    "price": "12.50",
    "imageUrl": ["https://...", "https://..."],
    "isAvailable": true,
    "createdAt": "2024-03-15T10:30:00.000Z"
  }
]
```

**Campos que deben existir en `products.schema.ts` (Drizzle):**

```ts
// Cambiar imageUrl de text a json array
imageUrl: json("image_url").$type<string[]>().default([]),  // ← cambiar
```

> `price` devuelve `string` desde Drizzle porque el tipo PostgreSQL `numeric`
> se serializa como string en JSON. El frontend debe parsear con `parseFloat()`
> o `Number()` al consumir la respuesta. Alternativamente, en el `ProductModel`
> del frontend se acepta `price: string | number`.

---

## Cambios a realizar — solo en schemas

### `backend/src/db/schema/restaurants.schema.ts`

Agregar después de `slug`:
```ts
description: text("description"),
imageUrl: text("image_url"),
```

### `backend/src/db/schema/categories.schema.ts`

Agregar después de `slug`:
```ts
description: text("description"),
imageUrl: text("image_url"),
```

### `backend/src/db/schema/products.schema.ts`

Reemplazar:
```ts
// antes
imageUrl: text("image_url"),

// después
imageUrl: json("image_url").$type<string[]>().default([]),
```

### `backend/src/modules/restaurants/restaurants.schema.ts` (Zod)

Agregar en `createRestaurantSchema`:
```ts
description: z.string().max(500).optional(),
imageUrl: z.string().url().optional(),
```

### `backend/src/modules/categories/categories.schema.ts` (Zod)

Agregar en `createCategorySchema`:
```ts
description: z.string().max(300).optional(),
imageUrl: z.string().url().optional(),
```

### `backend/src/modules/products/products.schema.ts` (Zod)

Reemplazar en `createProductSchema`:
```ts
// antes
imageUrl: z.string().url().optional(),

// después
imageUrl: z.array(z.string().url()).default([]),
```

---

## Migración Drizzle

Después de editar los schemas Drizzle ejecutar desde `backend/`:

```bash
bun run drizzle-kit generate
bun run drizzle-kit migrate
```

Verificar que el archivo generado en `src/db/migrations/` contiene:
- `ALTER TABLE restaurants ADD COLUMN description text;`
- `ALTER TABLE restaurants ADD COLUMN image_url text;`
- `ALTER TABLE categories ADD COLUMN description text;`
- `ALTER TABLE categories ADD COLUMN image_url text;`
- `ALTER TABLE products ALTER COLUMN image_url TYPE json;`

---

## Ajuste en el frontend — `ProductModel`

```ts
// src/model/product.model.ts
export interface ProductModel {
  id: string
  restaurantId: string
  categoryId: string
  name: string
  slug: string
  description?: string
  price: string        // ← mantener como string (viene así de numeric en PG)
  imageUrl: string[]   // ← array
  isAvailable: boolean
  createdAt: string
  // rating eliminado — es calculado desde reviews, no campo del producto
}
```

---

## Consequences

### Positivas
- El frontend puede consumir la API real sin ninguna transformación manual.
- Los mocks del frontend ya tienen `imageUrl`, `description` y `imageUrl[]`
  por lo que los componentes visuales no necesitan cambios.
- Controllers, services y repositories no se tocan — riesgo cero de romper
  la lógica de negocio existente.

### Negativas / riesgos
- El cambio de `imageUrl` en productos de `text` a `json` requiere migración.
  Con base de datos vacía (desarrollo) no hay riesgo de pérdida de datos.
- `price` sigue siendo `string` en el JSON — el frontend debe hacer
  `Number(product.price)` para cálculos matemáticos.

---

## Related decisions

- ADR-0001: consolidación de stores — los modelos canónicos del frontend.
- ADR-0002: sincronización de schemas — origen de los cambios documentados aquí.
