# WI-004 — Webhook de Clerk para sincronizar usuarios en PostgreSQL

**Problem:**
Clerk gestiona la autenticación pero el backend no sabe quiénes son los usuarios — no hay tabla `users` ni sincronización entre Clerk y la base de datos.

**Expected result:**
Un webhook en el backend que escucha eventos de Clerk (`user.created`, `user.updated`) y sincroniza los datos del usuario en la tabla `users` de PostgreSQL.

**Suggested Knowledge Level:** K2

**Acceptance criteria:**
- `POST /api/v1/webhooks/clerk` recibe y valida la firma del webhook de Clerk
- Cuando un usuario se registra en Clerk, se crea un registro en la tabla `users` con `clerk_id`, `email`, `role`
- Cuando un usuario actualiza su perfil en Clerk, el registro en DB se actualiza
- El endpoint rechaza requests con firma inválida con `401`

**Out of scope:**
- Lógica de negocio de los usuarios (pedidos, restaurantes)
- Eliminación de usuarios
- Panel de admin

**How to test it (validation):**
1. Usar Clerk Dashboard → enviar un evento `user.created` de prueba al webhook
2. Verificar en la DB que se creó el registro con los campos correctos
3. Enviar un request al webhook con firma inválida — debe retornar `401`
4. `SELECT * FROM users` en Neon muestra el usuario creado

**Definition of Done:**
- Webhook funcional y validado con firma de Clerk
- Tabla `users` en PostgreSQL con schema Drizzle
- Usuario sincronizado correctamente al registrarse

**Open questions:**
- ¿El `role` inicial de un usuario nuevo siempre es `customer` o puede elegirse en el registro?
- ¿Se usa `svix` para validar la firma del webhook de Clerk?

**Suggested ownership (code globs):**
- `apps/backend/src/routes/auth/`
- `apps/backend/src/db/schema/users.ts`