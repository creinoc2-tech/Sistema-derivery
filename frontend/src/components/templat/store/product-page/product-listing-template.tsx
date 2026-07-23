import SearchBar from '#/components/base/products/searchbar'
import SortDropdown from '#/components/base/products/sort-dropdown'
import ProductGrid from '#/components/containers/store/product-list/product-grid'
import { mockCategories } from '#/components/ui/data/categories.mock'
import { useProductFilter } from '#/lib/store/store/product/product.store'
import FilterSidebar from './filter-sidebar'
import MobileFilterDrawer from './mobile-filter-drawer'

export default function ProductListingTemplate() {
  const {
    filters: productFilter,
    updateFilter: updateProductFilter,
    products: dataproduct,
    isPending: isProductPending,
    totalProducts: totalProductCount,
  } = useProductFilter()
  return (
    <div className="@container container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex @4xl:flex-row flex-col items-start @4xl:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">All Products</h1>
            <p className="mt-1 text-muted-foreground">Showing products</p>
          </div>

          <div className="flex @4xl:w-auto w-full items-center gap-2">
            <MobileFilterDrawer
              filters={productFilter}
              updateFilter={updateProductFilter}
              totalResults={totalProductCount}
              availableCategories={mockCategories.map((cat) => ({
                id: cat.id,
                name: cat.name,
              }))}
            />
            <div className="@4xl:w-75 flex-1">
              <SearchBar
                value={productFilter.search}
                onChange={(val) => updateProductFilter('search', val)}
              />
            </div>
            <SortDropdown
              value={productFilter.sort}
              onChange={(val) => updateProductFilter('sort', val)}
            />
          </div>
        </div>

        <div className="@container flex items-start gap-8">
          {/* Desktop Sidebar */}
          <aside className="sticky top-24 @5xl:block hidden w-64 shrink-0">
            <FilterSidebar
              filters={productFilter}
              updateFilter={updateProductFilter}
              availableCategories={mockCategories.map((cat) => ({
                id: cat.id,
                name: cat.name,
              }))}
            />
          </aside>
          <main className="min-w-0 flex-1">
            <ProductGrid products={dataproduct} isLoading={isProductPending} />
          </main>
        </div>
      </div>
    </div>
  )
}
