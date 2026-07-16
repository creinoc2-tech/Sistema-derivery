import type { ProductModel } from '#/model/product.model'

const RESTAURANT_ID = 'resto-mock-1'

const CATEGORY_IDS = {
  entradas: 'cat-entradas',
  platosFuertes: 'cat-platos-fuertes',
  bebidas: 'cat-bebidas',
  postres: 'cat-postres',
}

const PRODUCT_NAMES: Record<keyof typeof CATEGORY_IDS, string[]> = {
  entradas: ['Nachos con Queso', 'Alitas BBQ', 'Rollitos Primavera'],
  platosFuertes: [
    'Pizza Margarita',
    'Hamburguesa Clásica',
    'Pasta Carbonara',
    'Lomo Saltado',
  ],
  bebidas: ['Coca-Cola 500ml', 'Limonada Natural', 'Agua Mineral'],
  postres: ['Tiramisú', 'Cheesecake', 'Brownie con Helado'],
}

const FIXED_PRICES = [4.50, 8.90, 12.00, 6.75, 15.30, 3.20, 9.99, 7.40, 11.50, 5.60, 6.20, 10.10, 13.50]

const generateProducts = (): ProductModel[] => {
  const products: ProductModel[] = []
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
          restaurantId: RESTAURANT_ID,
          categoryId: CATEGORY_IDS[categoryKey],
          name,
          slug,
          description: `${name}, preparado con ingredientes frescos y de calidad.`,
          price: FIXED_PRICES[counter % FIXED_PRICES.length].toFixed(2),
          imageUrl: `https://placehold.co/600x600?text=${encodeURIComponent(name)}`,
          isAvailable: true,
          createdAt: '2026-01-01T00:00:00.000Z',
        })

        counter++
      })
    },
  )

  return products
}

export const mockProducts: ProductModel[] = generateProducts()