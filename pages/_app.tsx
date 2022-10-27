import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@local_modules/theme/src'
import { color, theme } from 'App.theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider color={color} theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
