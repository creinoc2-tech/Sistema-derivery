ALTER TABLE "products" ALTER COLUMN "image_url" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image_url" SET DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "restaurants" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "restaurants" ADD COLUMN "image_url" text;