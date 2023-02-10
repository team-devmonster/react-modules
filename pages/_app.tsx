import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppNextNativeProvider } from 'App.theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppNextNativeProvider>
        <Component {...pageProps} />
    </AppNextNativeProvider>
  )
}

export default MyApp
