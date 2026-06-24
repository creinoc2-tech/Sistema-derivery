---
type: current-state
updated_at: 2026-06-24
---

# frontend — Knowledge

> What is true about this product right now.

## Purpose

Frontend SPA del sistema de delivery multi-restaurante. Sirve a tres tipos de usuario: cliente, restaurante y admin. Actualmente es la base técnica configurada — sin funcionalidad de negocio implementada todavía.

## Architecture overview

- SPA construida con React 19 + TanStack Router (file-based routing)
- Estilos con Tailwind CSS v4 + Shadcn/ui
- Estado del servidor con TanStack Query
- Linting con Biome, formateo con Prettier
- Solo tiene rutas base: `/` (index) y `/about`
- Componentes iniciales: `Header`, `Footer`, `ThemeToggle`, `Button` (Shadcn)

## Key domains

- `(public)` — storefront: listado de restaurantes, menú, detalle de restaurante
- `(customer)` — área autenticada del cliente: carrito, checkout, historial, reseñas
- `(restaurant)` — panel del restaurante: menú, pedidos, configuración
- `(admin)` — panel de administración: restaurantes, usuarios, transacciones

> Ninguno de estos dominios tiene rutas implementadas todavía — están definidos en el plan pero no en el código.

## Active constraints

- El frontend es una SPA pura — sin SSR
- Consume la API del backend via `VITE_API_URL`
- Auth gestionada por Clerk (pendiente de integrar)
- No hay tests escritos todavía
- Package manager: npm (detectado por Kaddo), pero el monorepo raíz usará Bun workspaces