import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CategoryModel } from "#/model/category.model";

interface CategoryCardGridProps {
  category: CategoryModel;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export default function CategoryCardGrid({
  category,
  variant = "default",
  className,
}: CategoryCardGridProps) {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className="group block h-full"
    >
      <Card
        className={cn(
          "hover:-translate-y-1 h-full overflow-hidden py-0 transition-all duration-300 hover:shadow-xl",
          isFeatured
            ? "border-primary/20 shadow-md"
            : "border-muted hover:border-primary/50",
          className
        )}
      >
        <CardContent className="flex h-full flex-col p-0">
          {/* Imagen */}
          <div
            className={cn(
              "relative w-full overflow-hidden bg-muted",
              isCompact ? "aspect-2/1" : isFeatured ? "aspect-video" : "aspect-4/3"
            )}
          >
            {category.imageUrl ? (
              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                <span className="text-muted-foreground text-sm">Sin imagen</span>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
          </div>

          {/* Contenido */}
          <div className="flex flex-1 flex-col p-5">
            <h3
              className={cn(
                "font-bold transition-colors group-hover:text-primary",
                isCompact ? "text-lg" : "text-xl"
              )}
            >
              {category.name}
            </h3>

             <p
              className={cn(
                "font-bold transition-colors group-hover:text-primary",
                isCompact ? "text-lg" : "text-[12px] text-neutral-500"
              )}
            >
              {category.description}
            </p>

            <div className="mt-auto flex items-center justify-end border-border/50 border-t pt-3">
              <div className="-translate-x-2 flex items-center font-medium text-primary text-sm opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Ver <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}