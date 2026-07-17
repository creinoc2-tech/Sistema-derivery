import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import type { FilterState } from '#/lib/store/product/product.store.interface'
import { COLORS, SIZES } from '#/components/ui/data/products'
import FilterGroup from '#/components/base/products/filter-group'
import { ColorRadioItem } from '#/components/base/products/color-redio-item'
import type { FilterStates } from '#/lib/store/store/product/product.store.interface'

interface FilterSidebarProps {
  filters: FilterStates
  updateFilter: (
    key: keyof FilterStates,
    value: string | number | string[] | [number, number] | null,
  ) => void
  availableCategories: { id: string; name: string }[] // 👈 antes era string[]
  //availableBrands: string[];
  className?: string
}

export default function FilterSidebar({
  filters,
  updateFilter,
  availableCategories,
  // availableBrands,
  className,
}: FilterSidebarProps) {
  const handlePriceChange = (value: [number, number]) => {
    updateFilter('priceRange', value)
  }

  return (
    <div className={`space-y-1 px-4 ${className}`}>
      <div className="mb-4 font-semibold text-lg">Filters</div>

      {availableCategories.length > 0 && (
        <FilterGroup id="categories" title="Categories">
          <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
            {availableCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={filters.categoryId === category.id}
                  onCheckedChange={(checked) =>
                    updateFilter('categoryId', checked ? category.id : null)
                  }
                />
                <Label
                  htmlFor={`cat-${category.id}`}
                  className="cursor-pointer font-normal text-sm"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Price Range */}
      <FilterGroup id="price" title="Price Range">
        <div className="px-2 pt-4 pb-2">
          <Slider
            defaultValue={[0, 100]}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            max={100}
            step={1}
            onValueChange={handlePriceChange}
            className="mb-4 border-2 border-muted-foreground/30"
          />
          <div className="flex justify-between text-muted-foreground text-sm ">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </FilterGroup>

      {/* Brands */}
      {/* {availableBrands.length > 0 && (
        <FilterGroup id="brands" title="Brands">
          <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
            {availableBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked as boolean, brand, "brands")
                  }
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="cursor-pointer font-normal text-sm"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Colors */}

      {/* Ratings */}
      <FilterGroup id="ratings" title="Ratings">
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              type="button"
              className="flex w-full cursor-pointer items-center space-x-2 rounded border-0 bg-transparent p-1 hover:bg-muted/50"
              onClick={() =>
                updateFilter(
                  'rating',
                  filters.rating === rating ? null : rating,
                )
              }
            >
              <div
                className={`h-4 w-4 rounded-full border ${filters.rating === rating ? 'border-primary bg-primary' : 'border-gray-300'}`}
              />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-muted-foreground text-sm">& Up</span>
              </div>
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Availability */}
      <FilterGroup id="availability" title="Availability">
        <div className="space-y-2">
          {[
            { value: 'all', label: 'Todos' },
            { value: 'available', label: 'Disponibles' },
            { value: 'unavailable', label: 'No disponibles' },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`avail-${option.value}`}
                checked={filters.availability === option.value}
                onCheckedChange={(checked) =>
                  checked && updateFilter('availability', option.value)
                }
              />
              <Label
                htmlFor={`avail-${option.value}`}
                className="cursor-pointer font-normal text-sm"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterGroup>
    </div>
  )
}
