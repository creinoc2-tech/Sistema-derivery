import NotFound from '#/components/base/empty/notfound'
import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Grid3x3, List, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
 
import { mockCategories } from '#/components/ui/data/categories.mock'
import { mockProducts } from '#/components/ui/data/products.mock'
import ProductGrid from '#/components/containers/store/product-list/product-grid'

export default function CategoryDetailTemplate({ slug }: { slug: string }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const category = mockCategories.find((c) => c.slug === slug)
  const categoryProducts = category
    ? mockProducts.filter((p) => p.categoryId === category.id)
    : []

  if (!category) {
    return (
      <div className="@container container mx-auto px-4 py-8">
        <NotFound
          title="Category not found"
          description="The category you're looking for doesn't exist or has been removed."
          icon={<ShoppingBag className="h-10 w-10 text-muted-foreground" />}
        >
          <Link to="/category">
            <Button variant="outline">Browse All Categories</Button>
          </Link>
        </NotFound>
      </div>
    )
  }

  return (
    <div className="@container container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/category">Categorías</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

       {/* Category Header */}
      <div className="mb-8">
        <div className="flex @md:flex-row flex-col @md:items-center @md:justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">
              {category.name}
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              {categoryProducts.length} productos en esta categoría
            </p>
          </div>

          <Link to="/category">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a categorías
            </Button>
          </Link>
        </div>
      </div>

       {/* Products in this category */}
      <div>
        <div className="mb-6 flex @4xl:flex-row flex-col @4xl:items-center @4xl:justify-between gap-4">
          <h2 className="font-semibold text-xl">
            Productos en {category.name}
          </h2>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="gap-2"
            >
              <Grid3x3 className="h-4 w-4" />
              Cuadrícula
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              Lista
            </Button>
          </div>
        </div>

        {categoryProducts.length > 0 ? (
          <ProductGrid products={categoryProducts} viewMode={viewMode} />
        ) : (
          <p className="text-muted-foreground text-center py-12">
            Todavía no hay productos en esta categoría.
          </p>
        )}
      </div>
    </div>

   )
}
