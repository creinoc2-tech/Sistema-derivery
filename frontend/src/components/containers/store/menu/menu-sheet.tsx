import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCartStore } from '#/lib/store/cart/cart-store'

import {
  CircleUserRound,
  Receipt,
  Heart,
  Wallet,
  LifeBuoy,
  Car,
  Ticket,
  Globe,
  Gift,
  FileText,
  ExternalLink,
  LogOut,
} from 'lucide-react'
import { useAuth, useClerk, useUser } from '@clerk/react'

export default function MenuSheet() {
  const { isSignedIn, userId } = useAuth()
  const { user  } = useUser()
  const { isOpenMenu, setIsOpenMenu, items, subtotal } = useCartStore()
  const { signOut } = useClerk()


  return (
    <Sheet open={isOpenMenu} onOpenChange={setIsOpenMenu}>
      <SheetContent side="left" className="flex w-full flex-col sm:max-w-64 ">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-6 overflow-y-auto">
          {isSignedIn ? (
            <>
              <div className="flex items-center gap-4 ">
                <CircleUserRound className="h-12 w-12 text-gray-400" />

                <div>
                  <h2 className="text-[16px] font-semibold uppercase">
                    {user?.firstName} {user?.lastName}
                  </h2>

                  <button className="text-sm text-green-600 hover:underline">
                    Administra la cuenta
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-col mb-4">
                <Link
                  to="/orders"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <Receipt className="h-5 w-5" />
                  <span>Pedidos</span>
                </Link>

                <Link
                  to="/favorites"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <Heart className="h-5 w-5" />
                  <span>Favoritos</span>
                </Link>

                <Link
                  to="/wallet"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <Wallet className="h-5 w-5" />
                  <span>Billetera</span>
                </Link>

                <Link
                  to="/help"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <LifeBuoy className="h-5 w-5" />
                  <span>Ayuda</span>
                </Link>

                <Link
                  to="/ride"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <Car className="h-5 w-5" />
                  <span>Solicitar un viaje</span>
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>

                <Link
                  to="/promotions"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <Ticket className="h-5 w-5" />
                  <span>Promociones</span>
                </Link>

                <Link
                  to="/uber-one"
                  className="flex items-start gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <Globe className="mt-1 h-5 w-5" />

                  <div>
                    <p className="font-medium">Uber One</p>
                    <p className="text-sm text-amber-700">
                      Prueba sin costo por 4 semanas
                    </p>
                  </div>
                </Link>

                <Link
                  to="/invite"
                  className="flex items-start gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <Gift className="mt-1 h-5 w-5" />

                  <div>
                    <p className="font-medium">Invita a tus amigos</p>
                    <p className="text-sm text-amber-700">
                      Recibe $2 de descuento
                    </p>
                  </div>
                </Link>

                <Link
                  to="/invoice"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100"
                >
                  <FileText className="h-5 w-5" />
                  <span>Invoice Information</span>
                </Link>

                <button
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100"
                  onClick={() => signOut({ redirectUrl: '/' })}
                >
                  <LogOut className="h-5 w-5" />
                  <span> Cerrar sesión</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className=" flex flex-col gap-2">
                <Link to="/auth/sign-up">
                  <Button className="h-14 w-full text-lg font-semibold">
                    Regístrate
                  </Button>
                </Link>

                <Link to="/auth/sign-in">
                  <Button
                    variant="secondary"
                    className="h-14 w-full text-lg font-medium"
                  >
                    Iniciar sesión
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-4 text-base">
                <Link to="/" className="transition-colors hover:text-primary">
                  Crear una cuenta de negocios
                </Link>

                <Link to="/" className="transition-colors hover:text-primary">
                  Agrega tu restaurante
                </Link>

                <Link to="/" className="transition-colors hover:text-primary">
                  Regístrate para realizar entregas
                </Link>

                <Link
                  to="/"
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  Solicitar un viaje
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </>
          )}

          <div className="mt-auto">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black text-white font-bold leading-4">
                <div>
                  Uber
                  <br />
                  <span className="text-green-500">Eats</span>
                </div>
              </div>

              <p className="text-xl font-medium leading-6">
                Hay mucho más que te encantará en la app.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="rounded-full px-6">
                &nbsp; iPhone
              </Button>

              <Button variant="secondary" className="rounded-full px-6">
                🤖 Android
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
