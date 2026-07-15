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

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

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
          price: (getRandomInt(300, 2500) / 100).toFixed(2),
          imageUrl: `https://placehold.co/600x600?text=${encodeURIComponent(name)}`,
          isAvailable: Math.random() > 0.15,
          createdAt: new Date(
            Date.now() - getRandomInt(0, 10_000_000_000),
          ).toISOString(),
        })

        counter++
      })
    },
  )

  return products
}

export const mockProducts: ProductModel[] = generateProducts()