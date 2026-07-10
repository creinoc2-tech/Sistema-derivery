-- 1. Primero la columna nueva en order_items (si no existe todavía)
ALTER TABLE "order_items" ADD COLUMN IF NOT EXISTS "product_id" text;

-- 2. Migrar los datos si hubiera alguno (probablemente no tenés registros aún)
-- (salteá esto si order_items está vacía)

-- 3. Borrar la constraint vieja si todavía existe
ALTER TABLE "order_items" DROP CONSTRAINT IF EXISTS "order_items_menu_item_id_menu_items_id_fk";

-- 4. Borrar la columna vieja
ALTER TABLE "order_items" DROP COLUMN IF EXISTS "menu_item_id";

-- 5. Hacer product_id NOT NULL y agregar su FK
ALTER TABLE "order_items" ALTER COLUMN "product_id" SET NOT NULL;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk"
  FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

-- 6. Ahora sí, borrar las tablas viejas
DROP TABLE IF EXISTS "menu_items" CASCADE;
DROP TABLE IF EXISTS "menu_categories" CASCADE;