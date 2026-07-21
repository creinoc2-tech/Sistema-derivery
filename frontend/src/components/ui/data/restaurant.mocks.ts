import type { RestaurantModel } from '#/model/restaurants.model'

const OWNER_ID = 'user_test_1'

export const mockRestaurants: RestaurantModel[] = [
  {
    id: 'resto-sabor-casero',
    ownerId: OWNER_ID,
    name: 'Sabor Casero',
    slug: 'sabor-casero',
    description: 'Comida casera preparada con ingredientes frescos.',
    status: 'approved',
    stripeAccountId: undefined,
    createdAt: '2026-01-01T00:00:00.000Z',
    imageUrl: 'https://placehold.co/600x400?text=Sabor+Casero',
  },
  {
    id: 'resto-pizza-house',
    ownerId: OWNER_ID,
    name: 'Pizza House',
    slug: 'pizza-house',
    description: 'Pizzas y pastas artesanales al horno de leña.',
    status: 'approved',
    stripeAccountId: undefined,
    createdAt: '2026-01-02T00:00:00.000Z',
    imageUrl: 'https://placehold.co/600x400?text=Pizza+House',
  },
  {
    id: 'resto-sushi-zen',
    ownerId: OWNER_ID,
    name: 'Sushi Zen',
    slug: 'sushi-zen',
    description: 'Sushi fresco y cocina asiática de autor.',
    status: 'approved',
    stripeAccountId: undefined,
    createdAt: '2026-01-03T00:00:00.000Z',
    imageUrl: 'https://placehold.co/600x400?text=Sushi+Zen',
  },
]