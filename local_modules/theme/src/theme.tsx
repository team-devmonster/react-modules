import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName } from "./utils";

const ThemeContext = createContext(null) as any;

type Color = {
  light: {[name:string]:string},
  dark: {[name:string]:string}
}

export function ThemeProvider<S extends Color,T extends Function>({children, color, theme}:{children:React.ReactNode, color:S, theme:T}) {

  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(null);

  useEffect(() => {
    normalize();

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
    <div style={{ visibility: colorScheme ? 'visible' : 'hidden' }}>
      <ThemeContext.Provider 
        value={{
          ...theme(color[colorScheme || 'light']),
          colorScheme
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
  colorScheme:'light'|'dark'
}>

export function useTheme<T>() {
  return useContext<ThemeProps<T>>(ThemeContext);
}

function normalize() {
  // set default styles
  document.head.insertAdjacentHTML("beforeend", `
    <style>
      button {
        outline: none;
        border-style: solid;
        border-width: 0;
        padding: 0;
      }
      ::placeholder {
        color: var(--placeholder, #a8a8a8);
      }
    </style>
  `)
}