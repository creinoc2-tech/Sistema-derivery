import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Link, useParams } from '@tanstack/react-router'
import { Circle } from 'lucide-react'
import type { CategoryModel } from '#/model/category.model'

interface CategoryTreeProps {
  categories: CategoryModel[]
  className?: string
}

export default function CategoryTree({
  categories,
  className,
}: CategoryTreeProps) {
  const params = useParams({ strict: false })
  const currentSlug = (params as any).slug

  const renderCategory = (category: CategoryModel) => {
    const isActive = category.slug === currentSlug

    return (
      <Collapsible key={category.id} className="w-full">
        <div
          className={cn(
            'group relative flex items-center gap-2 rounded-md py-1.5 pr-2 transition-colors hover:bg-accent/50',
            isActive && 'bg-accent font-medium',
          )}
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            <Circle
              className={cn(
                'h-1.5 w-1.5 fill-muted-foreground text-muted-foreground',
                isActive && 'fill-primary text-primary',
              )}
            />
          </div>

          <Link
            to="/category/$slug"
            params={{ slug: category.slug }}
            className="flex flex-1 items-center gap-2 overflow-hidden"
            activeProps={{ className: 'font-medium text-primary' }}
          >
            <span className="flex-1 truncate text-sm">{category.name}</span>
          </Link>
        </div>
      </Collapsible>
    )
  }

  return (
    <div className={cn('space-y-1', className)}>
      {categories.map((category) => renderCategory(category))}
    </div>
  )
}