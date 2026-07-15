import type { CategoryModel } from '#/model/category.model'

const RESTAURANT_ID = 'resto-mock-1'

export const mockCategories: CategoryModel[] = [
  {
    id: 'cat-entradas',
    restaurantId: RESTAURANT_ID,
    name: 'Entradas',
    slug: 'entradas',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-platos-fuertes',
    restaurantId: RESTAURANT_ID,
    name: 'Platos Fuertes',
    slug: 'platos-fuertes',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-bebidas',
    restaurantId: RESTAURANT_ID,
    name: 'Bebidas',
    slug: 'bebidas',
    sortOrder: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-postres',
    restaurantId: RESTAURANT_ID,
    name: 'Postres',
    slug: 'postres',
    sortOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
]