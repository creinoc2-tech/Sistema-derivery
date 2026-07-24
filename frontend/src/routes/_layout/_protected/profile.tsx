import ProfileTemplate from '#/components/templat/store/accounts/profile/profile-template'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_protected/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfileTemplate />
}
