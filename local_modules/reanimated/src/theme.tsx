import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null) as any;

type Color = {
  light: {[name:string]:string},
  dark?: {[name:string]:string}
}

export function ThemeProvider<S extends Color,T extends Function>({children, color, theme, darkModeEnabled = true, useCssProperty = false}:{children:React.ReactNode, color:S, theme:T, darkModeEnabled?:boolean, useCssProperty?:boolean}) {

  const [colorScheme, setColorScheme] = useState<'light'|'dark'>();

  useEffect(() => {
    const colorScheme = darkModeEnabled ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'light';
    setColorScheme(colorScheme);

    if(useCssProperty) {
      const root = document.documentElement;
      for(let key in color[colorScheme]) {
        root.style.setProperty(`--${key}`, color[colorScheme]![key]);
      }
    }

    const fn = (event:MediaQueryListEvent) => {
      const colorScheme = darkModeEnabled ? event.matches ? 'dark' : 'light' : 'light';

      if(useCssProperty) {
        const root = document.documentElement;
        for(let key in color[colorScheme]) {
          root.style.setProperty(`--${key}`, color[colorScheme]![key]);
        }
      }

      setColorScheme(colorScheme);
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', fn);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', fn);
    }
  }, [])

  return (
    <div style={{ visibility: colorScheme ? 'visible' : 'hidden' }}>
      <ThemeContext.Provider
        value={{
          ...theme(color[colorScheme || 'light']),
          colorScheme,
          darkModeEnabled
        }}>
        {children}
      </ThemeContext.Provider>
    </div>
  )
}

type Merge<A,B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K]
} & B;
type ThemeProps<T> = Merge<T, {
  colorScheme:'light'|'dark',
  darkModeEnabled:boolean
}>

export function useTheme<T>() {
  return useContext<ThemeProps<T>>(ThemeContext);
}