import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null) as any;

export type Color = {
  light: {[name:string]:string},
  dark: {[name:string]:string}
}

export function ThemeProvider<S extends Color,T extends Function>({children, color, theme}:{children:React.ReactNode, color:S, theme:T}) {

  const [colorScheme, setColorScheme] = useState<'light'|'dark'|null>(null);

  useEffect(() => {
    const colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setColorScheme(colorScheme);
    const root = document.documentElement;
    for(let key in color[colorScheme]) {
      root.style.setProperty(`--${key}`, color[colorScheme][key]);
    }

    const fn = (event:MediaQueryListEvent) => {
      const newScheme = event.matches ? 'dark' : 'light';
      setColorScheme(newScheme);
      const root = document.documentElement;
      for(let key in color[newScheme]) {
        root.style.setProperty(`--${key}`, color[newScheme][key]);
      }
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', fn);
    
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', fn);
    }
  }, [])

  return (
    colorScheme &&
    <ThemeContext.Provider value={theme(color[colorScheme])}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme<T>() {
  return useContext<T>(ThemeContext);
}