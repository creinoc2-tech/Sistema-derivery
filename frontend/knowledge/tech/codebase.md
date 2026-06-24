type: codebase
status: draft
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Codebase

## Repository Structure

├── apps/

│   ├── frontend/          # React + TanStack Router (SPA)

│   └── backend/           # Hono + Bun (API REST)

├── packages/

│   └── types/             # Tipos TypeScript compartidos

├── package.json           # Workspace root (Bun workspaces)

└── .kaddo/                # Conocimiento del proyecto

## Candidate Stack

**Frontend**
- React 19
- TanStack Router (file-based routing)
- TanStack Query (server state)
- Shadcn/ui + Tailwind CSS v4
- Clerk React SDK (auth + roles)
- Stripe.js (checkout)
- Zod (validación de formularios)

**Backend**
- Bun (runtime)
- Hono (framework HTTP)
- Drizzle ORM (queries + migraciones)
- PostgreSQL en Neon (base de datos)
- Clerk SDK (validación JWT por middleware)
- Stripe Node SDK (Connect + webhooks)
- Zod (validación de requests)

**Shared**
- TypeScript estricto en todo el monorepo
- `packages/types` — interfaces y schemas compartidos entre frontend y backend

## Quality Attributes

- **Tipado estricto**: `strict: true` en todos los `tsconfig.json`, sin `any` explícitos
- **Validación en la frontera**: toda entrada del cliente se valida con Zod antes de tocar la base de datos
- **Separación de capas**: routes → handlers → db, sin lógica de negocio en los endpoints directamente
- **Errores consistentes**: el backend retorna siempre `{ error: string, code: string }` en caso de fallo
- **Variables de entorno tipadas**: todas las env vars se validan con Zod al arrancar el servidor

## Development Standards

- Nombres de archivos: `kebab-case` para archivos, `PascalCase` para componentes React
- Endpoints REST: sustantivos en plural, versionados bajo `/api/v1/`
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, etc.)
- Imports: absolutos desde `src/` en ambas apps, sin `../../../`
- Sin comentarios obvios — el código se documenta con nombres claros
- Cada módulo del backend exporta su router de Hono y sus schemas Zod

## Git Strategy

GitHub Flow + Conventional Commits + SemVer. Una rama por feature, PR a `main`, deploy automático al mergear.

## Initial Modules

**Backend (`apps/backend/src/routes/`)**
- `auth/` — webhooks de Clerk para sincronizar usuarios con la DB
- `restaurants/` — CRUD de restaurantes, aprobación por admin
- `menu/` — categorías e ítems del menú por restaurante
- `orders/` — creación, estados y consulta de pedidos
- `payments/` — integración Stripe Connect, webhooks de pago
- `reviews/` — reseñas de clientes por restaurante
- `coupons/` — cupones de descuento por restaurante
- `admin/` — endpoints exclusivos del rol admin

**Frontend (`apps/frontend/src/routes/`)**
- `(public)/` — storefront, listado de restaurantes, menú, detalle
- `(customer)/` — carrito, checkout, historial de pedidos, reseñas
- `(restaurant)/` — panel del restaurante (menú, pedidos, configuración)
- `(admin)/` — panel admin (restaurantes, usuarios, transacciones)

## Assumptions

- Bun workspaces gestiona las dependencias del monorepo sin Turborepo ni Nx en esta etapa
- No hay generación de código automática (no codegen de OpenAPI en el inicio)
- El frontend consume la API via variables de entorno (`VITE_API_URL`)
- Los tipos compartidos en `packages/types` son interfaces planas, sin lógica

## Open Questions

- ¿Se usa `biome` o `eslint + prettier` para linting y formateo?
- ¿El backend expone documentación OpenAPI desde el inicio (Hono tiene soporte nativo)?
- ¿Se configura CI/CD desde el inicio o se deja para después del MVP?

## Quality checklist

- [x] Structure follows business and product, not a framework default.
- [x] No production code is described here — only the foundation.