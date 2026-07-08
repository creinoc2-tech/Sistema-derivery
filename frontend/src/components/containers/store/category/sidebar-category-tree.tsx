import CategoryTree from '#/components/base/store/category/category-tree'
import { categoryTree, getRootCategories } from '#/lib/helper/categories'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
 export default function SidebarCategoryTree() {
  
   const allCategories = categoryTree ; 
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
