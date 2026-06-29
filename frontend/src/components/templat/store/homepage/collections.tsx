import CollectionContainer from '#/components/containers/store/collection-container'
import { Button } from '#/components/ui/button'
import Section from '@/components/base/common/section'

import StarSolidIcon from '@/components/ui/icons/star-solid'
import { useState } from 'react'

// Maximum number of category tabs (including "All")
const MAX_CATEGORY_TABS = 4

export default function Collections() {
  const tabs = ['All', 'Mens', 'Womens', 'Kids'] as const
  const [active, setActive] = useState<(typeof tabs)[number]>('Womens')
  return (
    <Section
      title="Elevate Your Style with Our Latest Collection"
      description="Each piece is crafted to enhance your fashion statement."
      rightAsset={
        <StarSolidIcon className="@5xl:h-79 @6xl:h-96.5 h-20 @5xl:w-75.25 @6xl:w-61.5" />
      }
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
       <CollectionContainer/>
    </Section>
  )
}
