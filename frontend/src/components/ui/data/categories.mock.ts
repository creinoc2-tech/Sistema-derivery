import type { CategoryModel } from '#/model/category.model'

export const mockCategories: CategoryModel[] = [
  // Sabor Casero
  {
    id: 'cat-entradas',
    restaurantId: 'resto-sabor-casero',
    name: 'Entradas',
    slug: 'entradas',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-platos-fuertes',
    restaurantId: 'resto-sabor-casero',
    name: 'Platos Fuertes',
    slug: 'platos-fuertes',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-bebidas',
    restaurantId: 'resto-sabor-casero',
    name: 'Bebidas',
    slug: 'bebidas',
    sortOrder: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-postres',
    restaurantId: 'resto-sabor-casero',
    name: 'Postres',
    slug: 'postres',
    sortOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-ensaladas',
    restaurantId: 'resto-sabor-casero',
    name: 'Ensaladas',
    slug: 'ensaladas',
    sortOrder: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-sopas',
    restaurantId: 'resto-sabor-casero',
    name: 'Sopas',
    slug: 'sopas',
    sortOrder: 6,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-desayunos',
    restaurantId: 'resto-sabor-casero',
    name: 'Desayunos',
    slug: 'desayunos',
    sortOrder: 7,
    isActive: true,
    createdAt: new Date().toISOString(),
  },

  // Pizza House
  {
    id: 'cat-pizzas',
    restaurantId: 'resto-pizza-house',
    name: 'Pizzas',
    slug: 'pizzas',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cat-pastas',
    restaurantId: 'resto-pizza-house',
    name: 'Pastas',
    slug: 'pastas',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
  },

  // Sushi Zen
  {
    id: 'cat-sushi',
    restaurantId: 'resto-sushi-zen',
    name: 'Sushi',
    slug: 'sushi',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
]