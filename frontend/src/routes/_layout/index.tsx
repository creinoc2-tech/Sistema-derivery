import Collections from '#/components/templat/store/homepage/collections'
import CtaBanner from '#/components/templat/store/homepage/cta-banner'
import FeatureGrid from '#/components/templat/store/homepage/feature-grid'
import Hero from '#/components/templat/store/homepage/heor'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({ component: App })

function App() {
  return (
       <div className="min-h-screen">
        <Hero />
        {/* <Brand /> */}
        <FeatureGrid />
        <Collections />
        <CtaBanner />
      </div>
   )
}
