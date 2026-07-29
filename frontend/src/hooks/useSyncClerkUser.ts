import { UsersController } from '#/controllers/users.controller'
import { useUser } from '@clerk/react'
import { useEffect, useRef } from 'react'

const usersController = new UsersController()

export function useSyncClerkUser() {
  const { user, isSignedIn, isLoaded } = useUser()
  const syncedUserId = useRef<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return
    if (syncedUserId.current === user.id) return

    const email = user.primaryEmailAddress?.emailAddress
    const name = user.fullName || user.username || email || 'Usuario'

    if (!email) return

    syncedUserId.current = user.id

    usersController.create({ id: user.id, email, name }).catch((error: any) => {
      const code = error?.response?.data?.error
       if (code === 'USER_ALREADY_EXISTS') return

      console.error('No se pudo sincronizar el usuario con el backend', error)
       syncedUserId.current = null
    })
  }, [isLoaded, isSignedIn, user])
}
