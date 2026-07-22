import CategoryTree from '#/components/base/store/category/category-tree'
import { categoryTree } from '#/lib/helper/categories'
import { useCategories } from '#/lib/store/store/categories/categories.store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
 export default function SidebarCategoryTree() {
  
    const {categories: allCategories} =  useCategories() // Assuming you have a hook to fetch categories
   return (
    <Card>
      <CardHeader>
        <CardTitle>Browse Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryTree categories={allCategories}   />
      </CardContent>
    </Card>
  )
}
