---
type: product
status: draft
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Product

## Product Brief

Una plataforma web multi-restaurante donde los clientes pueden descubrir restaurantes, armar pedidos y pagar en línea. Los restaurantes gestionan su menú, pedidos entrantes y cobros de forma autónoma. El admin supervisa toda la plataforma desde un panel centralizado.

## Capabilities

**Cliente**
- Explorar restaurantes disponibles y ver sus menús con categorías y precios
- Agregar ítems al carrito y hacer checkout con pago online
- Ver el estado de su pedido en tiempo real (`pending → confirmed → preparing → ready → delivered`)
- Consultar historial de pedidos y dejar reseñas

**Restaurante**
- Gestionar menú: crear, editar y desactivar categorías e ítems
- Recibir y actualizar pedidos entrantes en tiempo real
- Ver historial de pedidos y transacciones
- Gestionar staff, cupones de descuento y configuración del local
- Cobrar automáticamente via Stripe Connect

**Admin**
- Aprobar o rechazar restaurantes antes de que se publiquen
- Supervisar pedidos, usuarios y transacciones de toda la plataforma
- Gestionar configuración global y comisiones

## Scope

- Autenticación y roles con Clerk (cliente, restaurante, admin)
- Storefront público con listado de restaurantes y menús
- Carrito de compras y checkout con Stripe
- Panel de gestión para restaurantes
- Panel de administración global
- Estados de pedido actualizados por el restaurante
- Reseñas de clientes sobre restaurantes
- Cupones de descuento por restaurante

## Out of Scope

- App móvil (solo web en esta etapa)
- Módulo de repartidor / tracking GPS
- Chat entre cliente y restaurante
- Sistema de fidelización o puntos
- Integración con impresoras de cocina
- Guest checkout (se requiere cuenta para pedir)

## Success Criteria

- Un cliente puede registrarse, encontrar un restaurante, hacer un pedido y pagarlo sin fricción
- Un restaurante puede gestionar su menú y ver sus pedidos entrantes desde su panel
- El admin puede aprobar restaurantes y supervisar la plataforma
- Los pagos llegan automáticamente al restaurante via Stripe Connect

## Assumptions

- Los restaurantes tienen acceso a internet y gestionan pedidos desde el navegador
- Stripe Connect está disponible en el país de operación
- El volumen inicial es bajo — no se necesita escala horizontal en esta etapa

## Open Questions

- ¿Los ítems del menú pueden tener variantes (tamaño, extras, sin ingrediente)?
- ¿El restaurante puede pausar temporalmente la recepción de pedidos?
- ¿Las reseñas requieren moderación antes de publicarse?

## Quality checklist

- [x] The product fits in one page.
- [x] Scope and out-of-scope are explicit.