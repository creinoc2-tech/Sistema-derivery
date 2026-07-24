import { useUser } from '@clerk/react'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_layout/_protected/protected')({
  component: ProtectedLayout,
})

function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/' })
    }
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded) return null
  if (!isSignedIn) return null

  return <Outlet />
}