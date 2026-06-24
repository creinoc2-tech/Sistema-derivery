---
type: business
status: draft
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Business

## Problem

Las personas que quieren pedir comida a domicilio no tienen una plataforma local unificada donde múltiples restaurantes puedan publicar sus menús y recibir pedidos en línea. Los restaurantes tampoco tienen una herramienta simple para gestionar su menú, pedidos entrantes y pagos sin depender de plataformas grandes que cobran comisiones altas.

## Users

**Cliente**
- Quiere encontrar restaurantes cercanos, ver menús, armar su pedido y pagarlo sin fricciones.
- Quiere saber en qué estado está su pedido después de confirmar la compra.

**Restaurante (vendor)**
- Quiere publicar su menú con categorías, precios y disponibilidad.
- Quiere recibir y gestionar pedidos entrantes en tiempo real.
- Quiere cobrar por sus ventas de forma automática sin manejar pagos manualmente.

**Admin**
- Quiere supervisar todos los restaurantes y pedidos de la plataforma.
- Quiere gestionar usuarios, pagos y configuración global.

## Value Proposition

Una plataforma multi-restaurante donde los clientes pueden pedir comida en línea y los restaurantes pueden gestionar su negocio de forma autónoma, con pagos automáticos y una experiencia moderna.

## Business Rules

- Un restaurante debe estar aprobado por el admin antes de publicarse.
- Un cliente puede hacer un pedido solo si está autenticado.
- Cada pedido pertenece a un único restaurante (no se mezclan pedidos de varios restaurantes en un solo checkout).
- Los pagos se procesan a través de Stripe Connect — cada restaurante recibe su pago menos la comisión de la plataforma.
- Un pedido tiene estados secuenciales: `pending → confirmed → preparing → ready → delivered`.
- Solo el restaurante puede mover el pedido de `pending` a `confirmed` y de `confirmed` a `preparing`.

## Constraints

- El stack es fijo: React + TanStack Router en el frontend, Node.js/Bun + Drizzle ORM + PostgreSQL en el backend.
- El proyecto es un monorepo con frontend y backend separados.
- No hay app móvil en esta etapa — solo web.
- El módulo de repartidor no está en el alcance inicial.

## Assumptions

- Los restaurantes tienen acceso a internet y pueden gestionar pedidos desde un navegador.
- Stripe Connect está disponible en el país de operación.
- El volumen inicial es bajo — no se necesita infraestructura de alta escala en esta etapa.

## Open Questions

- ¿Se permite que un cliente haga un pedido sin cuenta (guest checkout)?
- ¿El admin puede editar el menú de un restaurante, o solo el restaurante lo hace?
- ¿Hay un módulo de notificaciones en tiempo real (websockets) desde el inicio, o los restaurantes refrescan manualmente?

## Quality checklist

- [x] The problem is stated without assuming the solution.
- [x] Users have goals, not just labels.