import stylesUrl from './styles/global.css'
import tailwindcssStyles from './styles/tailwind.css'

import { Meta, Links, Scripts } from '@remix-run/react'
import { Outlet } from 'react-router-dom'
import { MetaFunction, LinksFunction, LiveReload } from 'remix'

import { NonFlashOfWrongThemeEls, ThemeProvider } from '~/utils/theme-provider'

import Navbar from './components/Navbar'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/roboto-v27-latin-regular.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/roboto-v27-latin-regular.woff',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/roboto-v27-latin-500.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/roboto-v27-latin-500.woff',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
    { rel: 'stylesheet', href: stylesUrl },
    { rel: 'stylesheet', href: tailwindcssStyles },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    { rel: 'manifest', href: '/favicon/site.webmanifest' },
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: `Muthu's apps status`,
    description: 'Muthukumar is a frontend developer, who loves to code.',
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
    charSet: 'utf-8',
  }
}

function App() {
  // const { theme } = useTheme()

  return (
    <html lang="en" className={'light' ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls />
      </head>
      <body className="bg-primary text-primary">
        <div className="container max-w-4xl mx-auto">
          <Navbar />
          <Outlet />
        </div>

        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function AppWithProvider() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Oops!</title>
      </head>
      <body>
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
          <p>
            Replace this UI with what you want users to see when your app throws uncaught errors.
          </p>
        </div>

        <Scripts />
      </body>
    </html>
  )
}
