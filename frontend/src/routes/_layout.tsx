import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from '#/components/base/common/header'
import Footer from '#/components/Footer'
import { ThemeProvider } from '#/components/provider/theme-provider'
import { Toaster } from 'sonner'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Toaster richColors closeButton position="bottom-right" />
    </ThemeProvider>
  )
}
