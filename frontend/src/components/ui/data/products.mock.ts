import type { ProductModel } from '#/model/product.model'

const CATEGORY_TO_RESTAURANT = {
  entradas: 'resto-sabor-casero',
  platosFuertes: 'resto-sabor-casero',
  bebidas: 'resto-sabor-casero',
  postres: 'resto-sabor-casero',
  ensaladas: 'resto-sabor-casero',
  sopas: 'resto-sabor-casero',
  desayunos: 'resto-sabor-casero',
  pizzas: 'resto-pizza-house',
  pastas: 'resto-pizza-house',
  sushi: 'resto-sushi-zen',
} as const

const CATEGORY_IDS = {
  entradas: 'cat-entradas',
  platosFuertes: 'cat-platos-fuertes',
  bebidas: 'cat-bebidas',
  postres: 'cat-postres',
  ensaladas: 'cat-ensaladas',
  sopas: 'cat-sopas',
  pizzas: 'cat-pizzas',
  pastas: 'cat-pastas',
  sushi: 'cat-sushi',
  desayunos: 'cat-desayunos',
}

const PRODUCT_NAMES: Record<keyof typeof CATEGORY_IDS, string[]> = {
  entradas: ['Nachos con Queso', 'Alitas BBQ', 'Rollitos Primavera'],
  platosFuertes: [
    'Hamburguesa Clásica',
    'Lomo Saltado',
  ],
  bebidas: ['Coca-Cola 500ml', 'Limonada Natural', 'Agua Mineral'],
  postres: ['Tiramisú', 'Cheesecake', 'Brownie con Helado'],
  ensaladas: ['Ensalada César', 'Ensalada Griega', 'Ensalada de Quinoa'],
  sopas: ['Sopa de Verduras', 'Crema de Champiñones', 'Sopa Wonton'],
  pizzas: [
    'Pizza Margarita',
    'Pizza Pepperoni',
    'Pizza Hawaiana',
    'Pizza Cuatro Quesos',
    'Pizza Vegetariana',
  ],
  pastas: ['Pasta Carbonara', 'Fettuccine Alfredo', 'Ravioles de Ricotta', 'Spaghetti Bolognesa'],
  sushi: ['Roll California', 'Roll Philadelphia', 'Nigiri Salmón', 'Uramaki Tempura'],
  desayunos: ['Waffles con Miel', 'Huevos Benedictinos', 'Pancakes con Frutas'],
}

const FIXED_PRICES = [
  4.5, 8.9, 12.0, 6.75, 15.3, 3.2, 9.99, 7.4, 11.5, 5.6, 6.2, 10.1, 13.5, 14.2,
  9.3, 7.85, 16.0, 5.99, 8.25, 12.75,
]

const FIXED_RATINGS = [5, 4, 3, 4, 5, 3, 4, 5, 4, 3, 5, 4]

export interface ProductModelWithRating extends ProductModel {
  rating: number
}

const generateProducts = (): ProductModelWithRating[] => {
  const products: ProductModelWithRating[] = []
  let counter = 1

  ;(Object.keys(PRODUCT_NAMES) as (keyof typeof CATEGORY_IDS)[]).forEach(
    (categoryKey) => {
      PRODUCT_NAMES[categoryKey].forEach((name) => {
        const slug = name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')

        products.push({
          id: `prod-${counter}`,
          restaurantId: CATEGORY_TO_RESTAURANT[categoryKey],
          categoryId: CATEGORY_IDS[categoryKey],
          name,
          slug,
          description: `${name}, preparado con ingredientes frescos y de calidad.`,
          price: FIXED_PRICES[counter % FIXED_PRICES.length].toFixed(2),
          imageUrl: [
            `https://placehold.co/600x600?text=${encodeURIComponent(name)}+1`,
            `https://placehold.co/600x600?text=${encodeURIComponent(name)}+2`,
            `https://placehold.co/600x600?text=${encodeURIComponent(name)}+3`,
          ],
          isAvailable: counter % 3 !== 0,
          createdAt: '2026-01-01T00:00:00.000Z',
          rating: FIXED_RATINGS[counter % FIXED_RATINGS.length],
        })

        counter++
      })
    },
  )

  return products
}

export const mockProducts: ProductModelWithRating[] = generateProducts()