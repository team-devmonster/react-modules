import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppTagProvider, AppThemeProvider } from 'App.theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeProvider>
      <AppTagProvider>
        <Component {...pageProps} />
      </AppTagProvider>
    </AppThemeProvider>
  )
}

export default MyApp
