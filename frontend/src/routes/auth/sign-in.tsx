import { createFileRoute } from '@tanstack/react-router'
import { Show, SignIn, SignInButton, SignUpButton, UserButton } from '@clerk/react'

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SignIn  forceRedirectUrl="/"/>
    </>
  )
}
