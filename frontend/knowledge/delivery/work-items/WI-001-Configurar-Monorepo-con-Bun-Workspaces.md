# WI-001 — Configurar monorepo con Bun workspaces

**Problem:**
El proyecto no tiene estructura de monorepo — frontend y backend viven separados sin workspace compartido ni tipos comunes.

**Expected result:**
Un monorepo funcional con `apps/frontend`, `apps/backend` y `packages/types` gestionado por Bun workspaces, donde ambas apps comparten tipos TypeScript y pueden instalarse con un solo comando desde la raíz.

**Suggested Knowledge Level:** K1

**Acceptance criteria:**
- `bun install` desde la raíz instala dependencias de ambas apps
- `packages/types` es importable desde frontend y backend sin rutas relativas
- `apps/frontend` corre con `bun run dev` desde la raíz
- El `package.json` raíz tiene `workspaces: ["apps/*", "packages/*"]`

**Out of scope:**
- Configurar CI/CD
- Migrar lógica de negocio existente
- Configurar el backend (eso es WI-002)

**How to test it (validation):**
1. Desde la raíz: `bun install` — no debe dar errores
2. Desde la raíz: `bun run dev --filter frontend` — debe levantar el frontend en puerto 3000
3. Crear un tipo en `packages/types/index.ts` e importarlo en `apps/frontend/src` — debe compilar sin error
4. `tsc --noEmit` en ambas apps — sin errores de tipos

**Definition of Done:**
- Monorepo corre desde la raíz
- `packages/types` está configurado y es importable
- No hay rutas relativas entre apps

**Open questions:**
- ¿Se mueve el frontend actual a `apps/frontend` o se crea desde cero?
- ¿El `package.json` raíz necesita scripts propios o solo delega a las apps?

**Suggested ownership (code globs):**
- `package.json`
- `apps/frontend/package.json`
- `packages/types/**`