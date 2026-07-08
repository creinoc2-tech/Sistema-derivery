import CategoryCard from '#/components/base/store/category/category-card'
import type { Category } from '#/types/category-types'

import { cn } from '@/lib/utils'

interface CategoryGridProps {
  categories: Category[]
  variant?: 'default' | 'compact' | 'featured' | 'list'
  columns?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  className?: string
  showProductCount?: boolean
}

export default function CategoryGrid({
  categories,
  variant = 'default',
  columns = {
    default: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  },
  className,
  showProductCount = true,
}: CategoryGridProps) {
  const gridClasses = cn(
    ' grid gap-4',
    columns.default && `grid-cols-${columns.default}`,
    columns.sm && `@xl:grid-cols-${columns.sm}`,
    columns.md && `@2xl:grid-cols-${columns.md}`,
    columns.lg && `@5xl:grid-cols-${columns.lg}`,
    columns.xl && `@7xl:grid-cols-${columns.xl}`,
    className,
  )
  return (
    <div className={gridClasses}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          variant={variant}
          showProductCount={showProductCount}
        />
      ))}
    </div>
  )
}
