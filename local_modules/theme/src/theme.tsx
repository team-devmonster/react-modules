import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null) as any;

type Color = {
  light: {[name:string]:string},
  dark?: {[name:string]:string}
}

export function ThemeProvider<S extends Color,T extends Function>({children, color, theme, darkModeEnabled = true}:{children:React.ReactNode, color:S, theme:T, darkModeEnabled?:boolean}) {

  const [colorScheme, setColorScheme] = useState<'light'|'dark'>();

  useEffect(() => {
    normalize();
    const colorScheme = darkModeEnabled ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'light';
    setColorScheme(colorScheme);

    const root = document.documentElement;
    for(let key in color[colorScheme]) {
      root.style.setProperty(`--${key}`, color[colorScheme]![key]);
    }

    const fn = (event:MediaQueryListEvent) => {
      const colorScheme = darkModeEnabled ? event.matches ? 'dark' : 'light' : 'light';

      const root = document.documentElement;
      for(let key in color[colorScheme]) {
        root.style.setProperty(`--${key}`, color[colorScheme]![key]);
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

function normalize() {
  // set default styles
  const style = document.getElementById('team-devmonster-react-theme');
  if(style) return;
  document.head.insertAdjacentHTML("beforeend", `
    <style id="team-devmonster-react-theme">
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        border-style: solid;
        border-width: 0;
        outline: none;
      }
      button {
        padding: 0;
      }
      ::placeholder {
        color: var(--placeholder, #a8a8a8);
      }
      a {
        color: inherit;
        text-decoration: none;
      }

      @media (prefers-color-scheme: dark) {
        html {
          color-scheme: dark;
        }
      }


      /** entering & exiting animation group */
      .devmonster-fade-enter {
        opacity: 0.01;
      }
      .devmonster-fade-enter.devmonster-fade-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
      }
      
      .devmonster-fade-leave {
        opacity: 1;
      }
      .devmonster-fade-leave.devmonster-fade-leave-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
      }
    </style>
  `)
}