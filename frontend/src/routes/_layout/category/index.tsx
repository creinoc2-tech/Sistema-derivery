import CategoryTemplate from '#/components/templat/store/category/category-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/category/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CategoryTemplate />
}
