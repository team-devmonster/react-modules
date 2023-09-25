import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null) as any;

type Color = {
  light: {[name:string]:string},
  dark?: {[name:string]:string}
}

export function ThemeProvider<S extends Color,T extends Function>({children, color, theme, darkModeEnabled = true, useCssProperty = false}:{children:React.ReactNode, color:S, theme:T, darkModeEnabled?:boolean, useCssProperty?:string[] | boolean}) {

  const [colorScheme, setColorScheme] = useState<'light'|'dark'>();

  useEffect(() => {
    const colorScheme = darkModeEnabled ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'light';
    setColorScheme(colorScheme);

    if(useCssProperty) {
      makeCSSProperties(useCssProperty, color, colorScheme);
    }

    const fn = (event:MediaQueryListEvent) => {
      const colorScheme = darkModeEnabled ? event.matches ? 'dark' : 'light' : 'light';

      if(useCssProperty) {
        makeCSSProperties(useCssProperty, color, colorScheme);
      }

      setColorScheme(colorScheme);
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', fn);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', fn);
    }
  }, [])

  const themeValue = useMemo(() => ({
    ...theme(color[colorScheme || 'light']),
    colorScheme,
    darkModeEnabled
  }), [colorScheme]);

  return (
    <div style={{ visibility: colorScheme ? 'visible' : 'hidden' }}>
      <ThemeContext.Provider
        value={themeValue}>
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

const makeCSSProperties = (useCssProperty:string[] | boolean, color:any, colorScheme:any) => {
  const root = document.documentElement;
  if(Array.isArray(useCssProperty)) {
    useCssProperty.forEach(key => {
      root.style.setProperty(`--${key}`, color[colorScheme]![key]);
    });
  }
  else {
    for(let key in color[colorScheme]) {
      root.style.setProperty(`--${key}`, color[colorScheme]![key]);
    }
  }
}