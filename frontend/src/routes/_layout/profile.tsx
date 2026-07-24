import ProfileTemplate from '#/components/templat/store/accounts/profile/profile-template'
import { useUser } from '@clerk/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_layout/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSignedIn, isLoaded } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/' })
    }
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded) return null
  if (!isSignedIn) return null

  return <ProfileTemplate />
}