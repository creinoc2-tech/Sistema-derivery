import CategoryDetailTemplate from '#/components/templat/store/category/category-detail-template'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/category/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()

  return <CategoryDetailTemplate slug={slug} />
}
