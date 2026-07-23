import CategoryGrid from '#/components/containers/store/category/category-grid'
import SidebarCategoryTree from '#/components/containers/store/category/sidebar-category-tree'
import { Separator } from '#/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useCategories } from '#/lib/store/store/categories/categories.store'
import { getActiveCategories } from '#/lib/mappers/category.active.mapper'

export default function CategoryTemplate() {
  const { categories } = useCategories()
  const activeCategories = getActiveCategories(categories)

  return (
    <div className="@container container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-4 font-bold text-3xl tracking-tight">
          Todas las Categorías
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explora nuestra amplia gama de categorías de productos
        </p>
      </div>

      <div className="grid @5xl:grid-cols-12 gap-8">
        {/* Sidebar - Category Tree */}
        <div className="@5xl:col-span-3">
          <SidebarCategoryTree />
        </div>

        <div className="@5xl:col-span-9 space-y-8">
          {/* Featured Categories */}
          {activeCategories.length > 0 && (
            <div>
              <h2 className="mb-4 font-semibold text-xl">
                Categorías Destacadas
              </h2>
              <CategoryGrid
                categories={activeCategories}
                variant="featured"
                columns={{
                  default: 4,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 3,
                }}
              />
            </div>
          )}

          <Separator />

          {/* All Categories */}
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl">Todas las Categorías</h2>
              <TabsList>
                <TabsTrigger value="grid"> Cuadrícula</TabsTrigger>
                <TabsTrigger value="list"> Lista</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-6">
              <CategoryGrid
                categories={categories}
                variant="default"
                columns={{
                  default: 2,
                  sm: 3,
                  md: 4,
                  lg: 4,
                  xl: 5,
                }}
              />
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <CategoryGrid
                categories={categories}
                variant="list"
                columns={{
                  default: 1,
                  sm: 1,
                  md: 2,
                  lg: 2,
                  xl: 2,
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
