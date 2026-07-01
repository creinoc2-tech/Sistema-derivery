import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/product/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/product/$productId"!</div>
}
