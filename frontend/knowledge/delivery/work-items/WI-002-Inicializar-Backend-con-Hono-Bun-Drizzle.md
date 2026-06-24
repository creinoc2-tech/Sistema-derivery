# WI-002 — Inicializar backend con Hono + Bun + Drizzle

**Problem:**
No existe backend — el sistema no tiene API, base de datos ni lógica de servidor.

**Expected result:**
Un servidor Hono corriendo en Bun con Drizzle ORM conectado a Neon PostgreSQL, con un endpoint de health check funcional y la estructura de carpetas definida.

**Suggested Knowledge Level:** K1

**Acceptance criteria:**
- `bun run dev` en `apps/backend` levanta el servidor sin errores
- `GET /api/v1/health` retorna `{ status: "ok" }`
- Drizzle está conectado a Neon y puede hacer una query simple
- Las variables de entorno están validadas con Zod al arrancar
- Estructura de carpetas: `routes/`, `db/`, `middleware/`, `lib/`

**Out of scope:**
- Rutas de negocio (restaurantes, pedidos, menú)
- Integración con Clerk
- Stripe

**How to test it (validation):**
1. `bun run dev` — servidor levanta en el puerto configurado sin errores
2. `curl http://localhost:3001/api/v1/health` — retorna `{ status: "ok" }`
3. Arrancar sin las env vars requeridas — debe fallar con mensaje claro de Zod
4. `bun run db:push` — Drizzle conecta a Neon sin errores

**Definition of Done:**
- Servidor Hono corriendo
- Drizzle conectado a Neon
- Env vars validadas
- Estructura de carpetas creada

**Open questions:**
- ¿Puerto del backend: 3001 o configurable por env var?
- ¿Se usa `drizzle-kit` para migraciones desde el inicio o solo `db:push` en desarrollo?

**Suggested ownership (code globs):**
- `apps/backend/src/**`
- `apps/backend/package.json`