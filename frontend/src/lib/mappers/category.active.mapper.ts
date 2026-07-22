 import type { CategoryModel } from '#/model/category.model'

export function getActiveCategories(
  allCategories: CategoryModel[],
  limit = 3,
): CategoryModel[] {
  return allCategories.filter((c) => c.isActive == true).slice(0, limit)
}
