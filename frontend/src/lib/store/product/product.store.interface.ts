import type { SortOption } from "#/components/base/products/sort-dropdown";

export interface FilterState {
  search: string;
  sort: SortOption;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  rating: number | null;
  availability: string[];
  conditions: string[];
}