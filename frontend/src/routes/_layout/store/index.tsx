import StoresListingTemplate from '#/components/templat/store/storefront/stores-listing-template';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/store/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <StoresListingTemplate />;
}
