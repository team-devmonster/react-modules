# @team-devmonster/react-theme

`react-theme` was created to easily create a theme in the `react` environment.<br>
`Darkmode` compatibility is also easy.<br>
You can use it in the `nextjs` environment.

## This is under devmonster's react & react-native union project.

This project is part of the `react-module & react-native-module` projects, that integrate `react & react-native` by the devmonster team.<br><br>

It is created to respond to [`software-mansion/react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/) in react.
<br>
General `react-modules` load map => [here](https://github.com/team-devmonster/react-modules);<br>
General `react-native-modules` load map => [here](https://github.com/team-devmonster/react-native-modules);

### Other `react` modules

- [o] [react-tags](https://www.npmjs.com/package/@team-devmonster/react-tags)
- [o] [react-router](https://www.npmjs.com/package/@team-devmonster/react-router)

#### author: devmonster 

We are always looking for investment or assistance.<br>
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

## Getting started

`$ npm install @team-devmonster/react-theme@latest`


## Examples

Easy. Too Easy.

### step1. Make Color & Theme

Set Colors & Themes whatever anything you want to use.

```javascript
// App.theme.tsx => You can use any file name :)
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
    backgroundColor: '#191919',
    // color steps
    white: '#111111',
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
    xs: 12,
    sm: 13,
    base: 15,
    lg: 16,
    xl: 17,
    x2l: 19,
    x3l: 21
  }
  const { width } = useWindowSize();
  if(width >= container.mobile) {
    fontSize.base = 15;
    fontSize.lg = 16;
    fontSize.xl = 22;
    fontSize.x2l = 28;
    fontSize.x3l = 36;
  }

  const input = {
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
  }
  const inputError = {
    borderColor: color.warning
  }
  const inputDisabled = {
    backgroundColor: color.step100,
    borderColor: color.step200
  }

  const button = {
    cursor: 'pointer',
    position: 'relative',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSize.base,
    minHeight: 42,
    borderRadius: 5
  }

  return {
    // basic theme
    color, fontSize, 
    // components theme
    input, inputError, inputDisabled,
    button
  }
}

export type Color = typeof color.light;
export type ColorKeys = keyof Color;
export type Theme = ReturnType<typeof theme>;
```


### step2. Set Provider

```javascript
// App.theme.tsx => You can use any file name :)
import { ThemeProvider } from '@team-devmonster/react-theme';

export const AppThemeProvider = ({children}: {children:React.ReactNode}) => {
  return (
    <ThemeProvider color={color} theme={theme}>
      {children}
    </ThemeProvider>
  )
}
```

```javascript
import { AppThemeProvider } from './App.theme';

export default function App() {

  return (
    <AppThemeProvider>
      <Component></Component>
    </AppThemeProvider>
  )
}
```

### step3. Use

```javascript
import React from "react";
import { useTheme } from '@team-devmonster/react-theme';
import { Theme } from './App.theme';

const ThemeEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <div 
      style={{ 
        backgroundColor: color.white, 
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 18, 
        paddingBottom: 18 
      }}>
      <div style={{ backgroundColor: color.primary, ...style.boxStyle }}>
        <div style={{ color: color.black, fontSize: fontSize.sm }}>primary</div>
      </div>
      <div style={{ backgroundColor: color.danger, ...style.boxStyle }}>
        <div style={{ color: color.black, fontSize: fontSize.sm }}>danger</div>
      </div>
    </div>
  )
}

const style = {
  boxStyle: {
    width: 80, 
    height: 80, 
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default ThemeEx;
```

### extra1. colorScheme

Also you can use `colorScheme`. It is `light` or `dark`.

```javascript
import { useTheme } from '@team-devmonster/react-theme';
import { Theme } from './App.theme';

import ImgWhite from '@Img/imgWhite.png';
import ImgDark from '@Img/imgDark.png';

const ThemeEx = () => {

  const { colorScheme } = useTheme<Theme>();

  return (
    <div>
      <img src={colorScheme === 'light' ? ImgWhite : ImgDark}>
    </div>
  )
}
export default ThemeEx;
```

### extra2. => CSS property

You can use style in user css property.
Property name's rule is `--${ColorKey}`.

```css
::placeholder {
  color: var(--placeholder);
}
```

```css
html,
body {
  background-color: var(--backgroundColor);
}
```

### extra3. => color utils

Sometimes we should use lighter, darker, or invert colors.
So this library offers some utils.

```javascript
import { useTheme, darken, lighten, hexToRgb, contrast } from "@local_modules/theme";
import { Theme } from "App.theme";

const ThemeEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <div>
      <div style={{ backgroundColor: lighten(color.primary, 50), ...shadow.base, ...style.boxStyle }}>
        <div style={{ color: contrast(color.primary), fontSize: fontSize.sm }}>primary lighter 50</div>
      </div>
      <div style={{ backgroundColor: darken(color.danger, 50), ...shadow.lg, ...style.boxStyle }}>
        <div style={{ color: contrast(color.danger), fontSize: fontSize.sm }}>danger darken 50</div>
      </div>
      <div style={{ backgroundColor: darken(color.step200, 50), ...style.boxStyle }}>
        <div style={{ color: contrast(color.step200), fontSize: fontSize.sm }}>step200 hex:{color.step200} <br></br> rgb: {hexToRgb(color.step200)}</div>
      </div>
    </div>
  )
}
const style = {
  boxStyle: {
    width: 80,
    height: 80, 
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
}
```