import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { CategoryModel } from '#/model/category.model'

interface CategoryCardListProps {
  category: CategoryModel
  className?: string
}

export default function CategoryCardList({
  category,
  className,
}: CategoryCardListProps) {
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className="group block"
    >
      <Card
        className={cn(
          'overflow-hidden py-0 transition-all hover:border-primary/50 hover:shadow-md',
          className,
        )}
      >
        <CardContent className="flex items-center gap-4 p-4">
          {/* Imagen */}
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
            {category.imageUrl ? (
              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                <span className="text-muted-foreground text-xs">
                  Sin imagen
                </span>
              </div>
            )}
          </div>

          {/* Nombre */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-bold text-lg transition-colors group-hover:text-primary">
              {category.name}
            </h3>

            <p
              className={
                'font-bold transition-colors group-hover:text-primary text-[12px] text-neutral-500'
              }
            >
              {category.description}
            </p>

            <span className="text-muted-foreground text-xs">
             {category.slug}
            </span>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="shrink-0 text-muted-foreground group-hover:text-primary"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
