# ADR-0002: Protección de rutas autenticadas con Clerk mediante pathless layout route

**Estado:** Aceptado
**Fecha:** 2026-07
**Proyecto:** Derivery — frontend

---

## Contexto

Derivery necesita distinguir entre rutas públicas (storefront, listado de restaurantes, detalle de producto) y rutas que requieren que el usuario esté autenticado (perfil, y a futuro: pedidos, checkout, panel de restaurante). El frontend ya integra **Clerk** (`@clerk/react`) para autenticación, con `ClerkProvider` envolviendo la app completa en `__root.tsx`.

Se evaluó primero un enfoque de **middleware de servidor** (patrón visto en un proyecto de referencia, `shop-stack`, que usa `better-auth` con `createMiddleware().server(...)` aplicado en el `_layout.tsx` de un route group). Ese patrón es válido y más robusto en general (protege antes de que el servidor renderice, sin depender de hooks de cliente), pero **no es directamente portable** a este proyecto: `shop-stack` usa `better-auth`, no Clerk, y su middleware llama a `auth.api.getSession(...)`, una API que no existe en `@clerk/react`. Adoptarlo tal cual habría requerido instalar `@clerk/tanstack-react-start` (paquete de servidor de Clerk, no instalado todavía) y reescribir el flujo de autenticación de servidor desde cero.

Se necesitaba una solución que:
- No requiera instalar paquetes nuevos de Clerk además de los ya presentes (`@clerk/react`).
- Evite repetir la lógica de "¿está logueado?" en cada archivo de ruta protegida individualmente (riesgo ya observado en el proyecto: la primera implementación de `profile.tsx` tenía el chequeo de auth escrito directamente en el componente de la ruta, y un intento de generalizarlo colocó el archivo layout con un nombre y ubicación que TanStack Router no reconoce como pathless layout, dejando la protección sin efecto).

## Decisión

Se protege un grupo de rutas mediante un **pathless layout route** de TanStack Router, con la lógica de Clerk centralizada en un único archivo, en vez de middleware de servidor.

### Regla de ubicación (crítica para que TanStack Router lo reconozca)

Un archivo pathless layout debe llamarse **igual que la carpeta que protege**, ubicado **un nivel afuera** de esa carpeta — nunca adentro de ella con otro nombre:

```
src/routes/_layout/
  ├── _protected.tsx          ← layout guardia; protege todo lo de adentro
  └── _protected/
      ├── profile.tsx         ← protegido automáticamente
      ├── orders.tsx          ← futuro, protegido automáticamente al ubicarse acá
      └── settings.tsx        ← futuro, protegido automáticamente al ubicarse acá
```

### Implementación del guardia

```tsx
// src/routes/_layout/_protected.tsx
import { useUser } from '@clerk/react'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_layout/_protected')({
  component: ProtectedLayout,
})

function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/' })
    }
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded) return null
  if (!isSignedIn) return null

  return <Outlet />
}
```

Cualquier ruta que necesite login solo debe **ubicarse dentro de la carpeta `_protected/`**, sin escribir ninguna lógica de auth propia:

```tsx
// src/routes/_layout/_protected/profile.tsx
import ProfileTemplate from '#/components/templat/store/accounts/profile/profile-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_protected/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfileTemplate />
}
```

Después de mover o crear archivos dentro de `_protected/`, ejecutar `npm run generate-routes` para que TanStack Router regenere el árbol de rutas.

## Consecuencias

**Positivas:**
- Una sola implementación de la lógica de auth, reutilizada por todas las rutas protegidas presentes y futuras — evita el riesgo ya observado de repetir (o mal ubicar) el chequeo en cada archivo.
- No requiere paquetes adicionales de Clerk; usa el SDK de cliente ya instalado (`@clerk/react`).
- Nuevas rutas protegidas se agregan sin código extra: basta con ubicarlas dentro de `_protected/`.

**Negativas / riesgos aceptados:**
- Es protección **del lado del cliente**: el chequeo corre después de que React monta, con un instante de `return null` mientras `isLoaded` resuelve. No hay SSR real de la protección — un usuario podría, en teoría, ver el HTML inicial antes de la redirección si inspecciona la respuesta del servidor directamente (bajo riesgo para este proyecto: las rutas protegidas actuales no exponen datos sensibles en el HTML inicial, ya que consumen datos vía llamadas a la API del backend, no vía loaders con datos privados).
- Esta protección es exclusivamente de **UI/navegación**. No reemplaza la validación de autorización en el backend: cualquier endpoint de la API que devuelva datos de un usuario autenticado debe seguir validando el token de Clerk del lado del servidor (pendiente: `middlewares/auth.ts` en el backend Hono, todavía no implementado — ver deuda técnica).
- Solo cubre "¿está logueado?", no "¿tiene el rol correcto?". Si en el futuro se necesita una ruta exclusiva para `restaurant` o `admin`, este mismo patrón debe extenderse con un guardia adicional que además consulte el rol (ver "Trabajo futuro").

## Alternativas consideradas

- **Middleware de servidor con `@clerk/tanstack-react-start`** (patrón de referencia visto en `shop-stack`, adaptado a Clerk): más robusto (protección antes del render del servidor, sin parpadeo posible), pero requiere instalar y configurar un paquete adicional de Clerk para servidor. Se descarta por ahora para no sumar complejidad mientras el resto del stack de auth (webhook de sincronización de usuarios, middleware de auth del backend) todavía no está implementado. Queda como camino de migración futura si se detectan problemas reales de seguridad o UX con el enfoque actual.
- **Chequeo de auth repetido en cada archivo de ruta** (implementación inicial de `profile.tsx`): descartado por duplicar lógica y por el riesgo ya materializado de que una copia quede mal ubicada o desactualizada.

## Trabajo futuro (fuera del alcance de este ADR)

- Middleware de autorización por rol en el backend (Hono), para validar el token de Clerk en cada request y exponer `customer` / `restaurant` / `admin` al resto de los handlers.
- Guardia de rol en el frontend (`_protected-restaurant.tsx` o similar) para rutas exclusivas de panel de restaurante, construido sobre el mismo patrón de pathless layout descrito acá.
- Evaluar migración a middleware de servidor (`@clerk/tanstack-react-start`) si se requiere eliminar el parpadeo de `return null` o servir contenido protegido vía loaders con datos sensibles.
