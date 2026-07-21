import { Button } from '#/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Label } from '#/components/ui/label'
import { useRestaurants } from '#/lib/store/store/restaurants/restaurants.store'
import { Input } from '#/components/ui/input'

const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'name', label: 'Nombre (A-Z)' },
]

export default function StoreFilterSidebar() {
  const { filters, updateFilter, clearFilters } = useRestaurants()

  const hasActiveFilters = filters.search || filters.sortBy !== 'newest'

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter('search', e.target.value)
  }

  const handleSortChange = (value: string) => {
    updateFilter('sortBy', value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-5" />
          <h2 className="font-semibold text-lg">Filtros</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 gap-1 text-xs"
          >
            <X className="size-3" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Buscar Tiendas</Label>
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Buscar por nombre..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-9 py-5"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <Label>Ordenar por</Label>
        <Select value={filters.sortBy  } onValueChange={handleSortChange}>
          <SelectTrigger className="w-full pl-9 py-5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
