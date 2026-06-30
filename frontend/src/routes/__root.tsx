import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../styles.css?url'
import type { QueryClient } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/react'
const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  'pk_test_ZG9taW5hbnQtc2hlcGhlcmQtMi5jbGVyay5hY2NvdW50cy5kZXYk'

const THEME_INIT_SCRIPT = `(function(){try{var stored=localStorage.getItem('vite-ui-theme');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=stored==='dark'||(!stored&&prefersDark)?'dark':'light';document.documentElement.classList.add(resolved);}catch(e){}})();`

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Delivery App' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          {children}
        </ClerkProvider>

        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
