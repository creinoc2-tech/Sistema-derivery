import CollectionItem from '#/components/base/common/collection-item'
 import { useCartStores } from '#/lib/store/store/cart/cart.store'
import { gridCellBorderClasses } from '#/lib/utils'
import { mockProducts } from '#/components/ui/data/products.mock'
import type { ProductModel } from '#/model/product.model'

export default function CollectionContainer() {
  const columns2 = 2
  const columns3 = 3
  const { addItem } = useCartStores()

  const handleAddCart = async (product: ProductModel) => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: 1,
        imageUrl: product.imageUrl,
      },
      product.restaurantId,
    )
  }
  return (
    <div className="grid @4xl:grid-cols-2 @6xl:grid-cols-3 grid-cols-1">
      {mockProducts.slice(0, 6).map((p, index) => (
        <CollectionItem
          key={p.id}
          image={p.imageUrl  || 'https://via.placeholder.com/300x300.png?text=No+Image'}
          title={p.name}
          category={p.categoryId}
          fit={p.restaurantId}
          price={`${p.price}`}
          className={gridCellBorderClasses(index, columns2, columns3)}
          onAddToCart={() => handleAddCart(p)}
        />
      ))}
    </div>
  )
}
