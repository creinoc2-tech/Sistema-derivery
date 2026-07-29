import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import Header from '#/components/base/common/header'
import { ThemeProvider } from '#/components/provider/theme-provider'
import { Toaster } from 'sonner'
import Brand from '#/components/base/store/brand'
import Footer from '#/components/templat/store/footer'

import { useSyncClerkUser } from '#/hooks/useSyncClerkUser'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  useSyncClerkUser()

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Brand />
        <Footer />
      </div>
      <Toaster richColors closeButton position="bottom-right" />
    </ThemeProvider>
  )
}
