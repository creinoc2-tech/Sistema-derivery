import CategoryCardList from "./category-card-list";
import CategoryCardGrid from "./category-card-grid";
import type { CategoryModel } from "#/model/category.model";
import type { FC } from "react";

interface CategoryCardProps {
  category: CategoryModel;
  variant?: "default" | "compact" | "featured" | "list";
  className?: string;
}

export default function CategoryCard({
  category,
  variant = "default",
  className,
}: CategoryCardProps) {
  if (variant === "list") {
    return <CategoryCardList category={category} className={className} />;
  }

  return (
    <CategoryCardGrid
      category={category}
      variant={variant }
      className={className}
    />
  );
}