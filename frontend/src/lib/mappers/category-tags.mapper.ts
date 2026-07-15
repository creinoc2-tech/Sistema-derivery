import { Pizza, Beef, Fish, Salad, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface LocalCategory {
  id: string;
  name: string;
  slug: string;
}

const localCategories: LocalCategory[] = [
  { id: "1", name: "Pizza", slug: "pizza" },
  { id: "2", name: "Burgers", slug: "burgers" },
  { id: "3", name: "Sushi", slug: "sushi" },
  { id: "4", name: "Ensaladas", slug: "ensaladas" },
];

const iconsByCategorySlug: Record<string, LucideIcon> = {
  pizza: Pizza,
  burgers: Beef,
  sushi: Fish,
  ensaladas: Salad,
};

export function toCategoryTagItems() {
  return localCategories.map((c) => ({
    id: c.id,
    name: c.name,
    icon: iconsByCategorySlug[c.slug] ?? UtensilsCrossed,
  }));
}