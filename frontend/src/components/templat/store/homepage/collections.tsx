import CollectionContainer from '#/components/containers/store/collection-container'
import { Button } from '#/components/ui/button'
import BurgerSolidIcon from '#/components/ui/icons/star-solid'
import Section from '@/components/base/common/section'
 
import { useState } from 'react'

// Maximum number of category tabs (including "All")
const MAX_CATEGORY_TABS = 4

export default function Collections() {
  const tabs = ['Pizzas', 'Hamburguesas', 'Postres', 'Bebidas'] as const
  const [active, setActive] = useState<(typeof tabs)[number]>('Pizzas')
  return (
    <Section
      title="Explora nuestras colecciones seleccionadas"
      description="Descubre un mundo de estilo y comodidad con nuestras colecciones seleccionadas. Desde clásicos atemporales hasta las últimas tendencias, te ofrecemos una selección que se adapta a todos los gustos y ocasiones. Explora nuestras colecciones y encuentra tu ajuste perfecto hoy."
      
    >
      <div className="@4x:px-12 @6xl:px-15 @7xl:px-20 px-5 pb-8">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={active === tab ? 'default' : 'ghost'}
              className="@6xl:h-14 h-12 @6xl:px-6 px-4 py-3 text-lg"
              type="button"
              onClick={() => setActive(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>
      <CollectionContainer />
    </Section>
  )
}
