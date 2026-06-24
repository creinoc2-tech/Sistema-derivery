---
type: roadmap
updated_at: 2026-06-24
---

# frontend — Roadmap

> What we intend to build and why.

## Now

**Fundación del monorepo**
- Configurar Bun workspaces con `apps/frontend` y `apps/backend`
- Integrar Clerk en el frontend (auth + roles)
- Crear estructura de rutas por rol: `(public)`, `(customer)`, `(restaurant)`, `(admin)`
- Configurar cliente HTTP (TanStack Query + fetch hacia el backend)

**Backend base**
- Inicializar proyecto Hono + Bun + Drizzle ORM
- Conectar Neon PostgreSQL
- Middleware de auth con Clerk JWT
- Webhook de Clerk para sincronizar usuarios en la DB

## Next

**Storefront y menú**
- Listado de restaurantes públicos
- Página de detalle de restaurante con menú por categorías
- Panel de restaurante: gestión de menú (categorías e ítems)

**Pedidos**
- Carrito de compras en el cliente
- Checkout con Stripe
- Estados de pedido: `pending → confirmed → preparing → ready → delivered`
- Panel de restaurante: gestión de pedidos entrantes

## Later

- Panel de admin: aprobación de restaurantes, supervisión global
- Reseñas de clientes
- Cupones de descuento por restaurante
- Notificaciones en tiempo real (WebSockets o polling)
- Módulo de repartidor (fuera del alcance inicial)