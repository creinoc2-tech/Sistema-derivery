# WI-003 — Integrar Clerk en el frontend

**Problem:**
El frontend no tiene autenticación — no hay login, registro ni manejo de roles (cliente, restaurante, admin).

**Expected result:**
Clerk integrado en el frontend con rutas protegidas por rol y componentes de auth funcionales.

**Suggested Knowledge Level:** K2

**Acceptance criteria:**
- `<ClerkProvider>` envuelve la app en `__root.tsx`
- Rutas `(customer)`, `(restaurant)` y `(admin)` redirigen a login si el usuario no está autenticado
- El rol del usuario (cliente / restaurante / admin) se lee desde los metadatos de Clerk
- `<SignIn />` y `<UserButton />` renderizan correctamente
- Un usuario sin sesión no puede acceder a rutas protegidas

**Out of scope:**
- Sincronización de usuarios con la DB del backend (eso es WI-004)
- UI de los paneles por rol
- Lógica de negocio

**How to test it (validation):**
1. Ir a `/customer/orders` sin sesión — debe redirigir a login
2. Iniciar sesión con un usuario de rol `customer` — debe poder acceder a rutas `(customer)` pero no a `(restaurant)` ni `(admin)`
3. Iniciar sesión con rol `restaurant` — accede a `(restaurant)`, bloqueado en `(admin)`
4. `<UserButton />` muestra el avatar del usuario logueado

**Definition of Done:**
- Clerk configurado con las tres variables de entorno requeridas
- Rutas protegidas por rol funcionando
- Redirección a login para usuarios no autenticados

**Open questions:**
- ¿Los roles se definen como `publicMetadata.role` en Clerk o se usa otro campo?
- ¿La página de login es la de Clerk hosted o un componente embebido en la app?

**Suggested ownership (code globs):**
- `apps/frontend/src/routes/__root.tsx`
- `apps/frontend/src/routes/(customer)/**`
- `apps/frontend/src/routes/(restaurant)/**`
- `apps/frontend/src/routes/(admin)/**`