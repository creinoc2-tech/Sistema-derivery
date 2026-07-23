# ADR-0001: Consolidación de la arquitectura de estado y eliminación de artefactos del template de e-commerce

**Estado:** Aceptado (en ejecución, migración parcial)
**Fecha:** 2026-07
**Proyecto:** Derivery — frontend

---

## Contexto

El frontend de Derivery se construyó sobre un **template de e-commerce genérico** (moda/retail), reutilizado como base de UI para acelerar el desarrollo del sistema real de delivery multi-restaurante. Esta decisión permitió evitar la reconstrucción completa de carrito, checkout, listados y estado desde cero. Sin embargo, dejó las siguientes consecuencias:

- **Dos generaciones de stores de Zustand/hooks conviviendo en paralelo**: una heredada del template (acoplada a conceptos de retail: `colors`, `sizes`, `brand`, `stock`, `rating` por producto, jerarquía profunda de categorías) y otra nueva, escrita a medida para el dominio real de Derivery (restaurantes, categorías planas y productos de menú).
- **Tipos duplicados** que describen la misma entidad de negocio de formas incompatibles (por ejemplo: `Store` vs `Restaurant`, `DisplayProduct` vs `ProductModel`, `Category` jerárquica vs `Category` plana).
- **Bugs de producción reales** causados por esta duplicación. El caso más costoso fue la coexistencia de dos instancias de Zustand para el carrito (`useCartStore` vs `useCartStores`): un componente (`cart-template.tsx`) leía de la instancia antigua mientras el resto de la app escribía en la nueva. Resultado: el carrito no mostraba items, aunque el usuario sí los agregaba.

Esta convivencia fue una decisión consciente durante la fase de migración: permite mover componente por componente sin romper todo de una vez y conserva código legado como referencia temporal. Sin embargo, **no es un estado final aceptable**. Cada mes que se mantiene aumenta el riesgo de que componentes nuevos importen por error la fuente antigua (como ya ocurrió con el carrito).

## Decisión

1. **Una sola fuente de verdad para estado de cliente por dominio**, ubicada en `src/lib/store/store/{dominio}/`:
   - `store/cart/`: carrito (Zustand con persistencia) - **canónico**
   - `store/categories/`: categorías (hook simple sobre datos locales/API) - **canónico**
   - `store/product/`: filtros y listado de productos - **canónico**
   - `store/restaurants/`: listado y filtros de restaurantes - **canónico**

2. **Una sola fuente de verdad de tipos por entidad**, con forma idéntica a lo que devuelve/espera la API real (`ProductModel`, `CategoryModel`, `RestaurantModel`). No se usarán estructuras anidadas heredadas del template (`price: { current, original, discountPercentage }`, `category: { id, name, slug }`, `images: { id, url, alt }[]`).

3. **Los artefactos heredados del template se marcan como deprecados** y se eliminan **archivo por archivo**, solo después de confirmar que ningún componente activo los importa (ver checklist de migración). No se permite borrado en bloque.

4. **Zustand se reserva exclusivamente para estado de cliente** (carrito, UI y preferencias persistentes como "restaurantes seguidos"). El estado de servidor (listados de productos/categorías/restaurantes) permanece por ahora en hooks simples, con plan de migración futura a TanStack Query (ya presente en el stack) para cache, invalidación y reintentos automáticos. Esta migración futura queda fuera del alcance de este ADR.

## Artefactos deprecados

No modificar los reemplazos canónicos. Retirar estos artefactos solo cuando ya no tengan consumidores.

| Artefacto viejo | Reemplazo canónico | Consumidores activos detectados en este audit |
|---|---|---|
| `lib/store/cart/cart-store.ts` + `cart.store.interface.ts` | `lib/store/store/cart/cart.store.ts` | 11 archivos (ver detalle abajo) |
| `lib/store/product/product-filters-store.ts` + `product.store.interface.ts` | `lib/store/store/product/product.store.ts` | 2 archivos |
| `lib/helper/categories.ts` (árbol jerárquico: `getCategoryBySlug`, `getSubcategories`, `getCategoryBreadcrumb`) | `mockCategories.find(...)` directo sobre `CategoryModel` plano | 3 archivos |
| `components/ui/data/products.ts` (Product de e-commerce: `price.current`, `images[]`, `brand`, `colors`, `sizes`, `rating.breakdown`) | `components/ui/data/products.mock.ts` (`ProductModel`) | 4 archivos |
| `types/store-types.ts` (`Store`, `DisplayProduct`) | `model/restaurants.model.ts`, `model/product.model.ts` | Referencia de comparación únicamente; no importar en código nuevo |
| `types/category-types.ts` (jerárquico, con `parentId`/`level`/`subcategories`) | `model/category.model.ts` (plano) | Referencia de comparación únicamente |

### Consumidores del cart store viejo — pendientes de migrar antes de poder borrar

```
src/components/containers/store/menu/menu-sheet.tsx
src/components/containers/store/checkout/shipping-method-selector.tsx
src/components/containers/store/checkout/checkout-order-summary.tsx
src/components/containers/store/cart/cart-summary.tsx
src/components/containers/store/cart/cart-sheet.tsx
src/components/containers/store/cart/cart-items-list.tsx
src/components/containers/store/product-details/main-section.tsx
src/components/templat/store/cart/cart-template.tsx
src/components/base/common/navbar.tsx
src/components/base/common/header.tsx
src/components/base/store/cart/cart-item.tsx
```

### Consumidores del product store viejo

```
src/components/templat/store/product-page/product-listing-template.tsx
src/components/templat/store/product-page/filter-sidebar.tsx
```

### Consumidores de `lib/helper/categories.ts` (jerárquico)

```
src/components/containers/store/category/sidebar-category-tree.tsx
src/components/templat/store/category/category-detail-template.tsx
src/components/templat/store/category/category-template.tsx
```

### Consumidores de `components/ui/data/products.ts` (viejo)

```
src/components/containers/store/product-details/product-reviews-tab.tsx
src/components/containers/store/product-details/main-section.tsx
src/components/templat/store/product-page/filter-sidebar.tsx
src/lib/store/product/product-filters-store.ts
```

> Nota: este listado es una fotografía del zip auditado en esta sesión. Puede haber cambiado en zips posteriores. Volver a ejecutar el audit (comando abajo) antes de cualquier borrado.

## Checklist de migración

Aplicar por artefacto y repetir hasta vaciar cada lista de consumidores.

1. Abrir el archivo consumidor.
2. Reemplazar el import viejo por el canónico equivalente.
3. Ajustar los campos usados en el JSX/lógica a la forma real del modelo nuevo (sin `colors`, `sizes`, `brand`, `stock`, `price.current`, jerarquía de categorías).
4. Verificar en el navegador que el componente sigue funcionando.
5. Volver a ejecutar el comando de audit (abajo). Cuando un artefacto viejo tenga **0 consumidores**, recién ahí eliminar el archivo.

### Comando de audit (ejecutar desde `frontend/`)

```bash
echo "--- cart viejo ---"
grep -rl "lib/store/cart/cart-store" src --include="*.ts" --include="*.tsx"

echo "--- product store viejo ---"
grep -rl "lib/store/product/product-filters-store\|lib/store/product/product.store.interface" src --include="*.ts" --include="*.tsx"

echo "--- data/products viejo ---"
grep -rl "components/ui/data/products'" src --include="*.ts" --include="*.tsx" | grep -v "products.mock"

echo "--- lib/helper/categories (jerárquico) ---"
grep -rl "lib/helper/categories" src --include="*.ts" --include="*.tsx"
```

Cuando cada bloque devuelva vacío, el artefacto correspondiente es seguro de borrar.

## Artefactos ya migrados

No modificar salvo bug real.

- `lib/store/store/cart/cart.store.ts` + `cart.store.interface.ts`: carrito, con la regla de negocio "un pedido pertenece a un solo restaurante" resuelta en `addItem`.
- `lib/store/store/categories/categories.store.ts` — categorías planas por restaurante.
- `lib/store/store/product/product.store.ts` — filtros de producto (categoría, disponibilidad, precio, búsqueda, orden).
- `lib/store/store/restaurants/restaurants.store.ts`: listado de restaurantes; filtra `status === 'approved'` para el storefront público.
- `lib/helper/store.ts` (`useStoreFront`, Zustand con persist): reescrito para `RestaurantModel`; conserva `followedRestaurants`/`toggleFollow`/`isFollowing` como estado de cliente legítimo.
- `model/product.model.ts`, `model/category.model.ts`, `model/restaurants.model.ts`: fuente de verdad de tipos, espejo de la API real.
- `components/ui/data/{products,categories,restaurant}.mocks.ts`: datos de prueba coherentes entre sí (mismos IDs cruzados entre restaurante -> categoría -> producto), sin `Math.random()`/`Date.now()` a nivel de módulo (evita hydration mismatch en SSR).

## Consecuencias

**Positivas:**
- Un componente nuevo no tiene ambigüedad sobre qué store importar — solo existe un camino "correcto" documentado.
- Se eliminan bugs de sincronización como el ya detectado en el carrito.
- Los tipos vuelven a ser un espejo fiel del backend, evitando trabajo de "traducir" datos inventados que nunca van a existir en la API real (`discountPercentage`, `stock.quantity`, `colors`, `sizes`).

**Negativas / riesgos aceptados:**
- Mientras dura la migración (11 + 2 + 3 + 4 archivos pendientes), el repositorio convive con dos generaciones de código. Cualquier desarrollador nuevo debe consultar este ADR antes de tocar `lib/store/` o `components/ui/data/`.
- El estado de servidor (productos/categorías/restaurantes) sigue en hooks `useState`/`useEffect` caseros, no en TanStack Query. Se acepta como deuda técnica documentada, no como parte de este ADR.

## Alternativas consideradas

- **Migración "big bang"** (reemplazar todo de una sola vez): descartada por alto riesgo de romper funcionalidad en producción sin red de contención; el proyecto no tiene tests automatizados que detecten regresiones.
- **Mantener ambas generaciones indefinidamente** detrás de un flag: descartada por costosa para el tamaño del equipo (equipo chico, según `.kaddo/config.yml`); no se justifica la complejidad de un feature flag para código que de todos modos debe retirarse.
