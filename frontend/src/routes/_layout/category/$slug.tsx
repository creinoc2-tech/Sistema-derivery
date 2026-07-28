import CategoryDetailTemplate from '#/components/templat/store/category/category-detail-template'
import { CategoryController } from '#/controllers/category.controller'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/category/$slug')({
  loader: async ({ params }) => {
    const category = await new CategoryController().getBySlug(params.slug)

    if (!category) {
      throw notFound()
    }

    return { category }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { category } = Route.useLoaderData()
  return <CategoryDetailTemplate category={category} />
}
