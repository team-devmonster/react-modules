import { hexToRgb, ThemeProvider, useTheme } from "@local_modules/theme";
//import { ButtonProps, TagConfig, TagProvider } from "@team-devmonster/react-tags";
import { ButtonProps, TagConfig, TagProvider, InputConfig } from "@tags";

const color = {
  light: {
    // key colors
    primary: '#4a93cf',
    warning: '#ec670b',
    success: '#9cca5a',
    danger: '#eb445a',
    placeholder: '#4d4d4d',
    backgroundColor: '#f2f2f2',
    // color steps
    white: '#ffffff',
    step50: '#f2f2f2',
    step100: '#e6e6e6',
    step200: '#cccccc',
    step300: '#b3b3b3',
    step400: '#999999',
    step500: '#808080',
    step600: '#666666',
    step700: '#4d4d4d',
    step800: '#333333',
    step900: '#191919',
    black: '#111111'
  },
  dark: {
    // key colors
    primary: '#4a93cf',
    warning: '#ec670b',
    success: '#9cca5a',
    danger: '#eb445a',
    placeholder: '#4d4d4d',
    backgroundColor: '#121212',
    // color steps
    white: '#000000',
    step50: '#191919',
    step100: '#333333',
    step200: '#4d4d4d',
    step300: '#666666',
    step400: '#808080',
    step500: '#999999',
    step600: '#b3b3b3',
    step700: '#cccccc',
    step800: '#e6e6e6',
    step900: '#f2f2f2',
    black: '#ffffff'
  }
}

const theme = (color:Color) => {
  const fontSize = {
    xs: 12 as const,
    sm: 14 as const,
    base: 16 as const,
    lg: 18 as const,
    xl: 20 as const,
    x2l: 24 as const,
    x3l: 30 as const,
    x4l: 36 as const,
    x5l: 48 as const,
    x6l: 60 as const,
    x7l: 72 as const,
    x8l: 96 as const,
    x9l: 128 as const
  }

  const input:InputConfig = {
    style: {
      position: 'relative',
      backgroundColor: color.white,
      borderColor: color.step300,
      color: color.black,
      borderRadius: 5,
      borderWidth: 1,
      fontSize: fontSize.base,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      minHeight: 42,
      flex: 1
    },
    disabledStyle: {
      backgroundColor: color.step100,
      borderColor: color.step200
    },
    errorStyle: {
      borderColor: color.warning
    }
  }

  const div:TagConfig = {
    style: {
      color: color.black,
      fontSize: fontSize.base,
      lineHeight: fontSize.base*1.28
    }
  }
  
  const button:ButtonProps = {
    color: color.white,
    style: {
      cursor: 'pointer',
      position: 'relative',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fontSize.base,
      minHeight: 42,
      borderRadius: 5
    },
    disabledStyle: {
      opacity: 0.5
    },
    hoverStyle: {
      opacity: 0.5
    }
  }

  const shadow = {
    base: { 
      boxShadow: `0 2px 10px 2px rgb(${hexToRgb(color.black)} / 0.1), 0 1px 4px -8px rgb(${hexToRgb(color.black)} / 0.1)` 
    },
    lg: {
      boxShadow: `0 10px 15px -3px rgb(${hexToRgb(color.black)} / 0.1), 0 4px 6px -4px rgb(${hexToRgb(color.black)} / 0.1)`
    },
    card: {
      boxShadow: `0 5px 15px -5px rgb(${hexToRgb(color.black)} / 0.1), 0 5px 10px -5px rgb(${hexToRgb(color.black)} / 0.1)`
    }
  }

  return {
    // basic theme
    color, 
    fontSize, 
    shadow,
    // components theme
    input,
    div, 
    button
  }
}

// example of Color & ColorKeys type
export type Color = typeof color.light;
export type ColorKeys = keyof Color;
export type Theme = ReturnType<typeof theme>;

export const AppThemeProvider = ({children}: {children:React.ReactNode}) => {
  return (
    <ThemeProvider color={color} theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export const AppTagProvider = ({children}: {children:React.ReactNode}) => {
  const theme = useTheme<Theme>();
  return (
    <TagProvider tagConfig={theme}>
      {children}
    </TagProvider>
  )
}

export const AppNextNativeProvider = ({children}: {children:React.ReactNode}) => {
  return (
    <AppThemeProvider>
      <AppTagProvider>
        {children}
      </AppTagProvider>
    </AppThemeProvider>
  )
}