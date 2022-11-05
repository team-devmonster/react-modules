# @team-devmonster/react-form

This is devmonster's react module for make app easily. This is compatible with devmonster's react-native module.<br>
[@team-devmonster/react-native-form](https://www.npmjs.com/package/@team-devmonster/react-native-tags)

This use [`react-hook-form`](https://github.com/react-hook-form/react-hook-form).


##### author: devmonster 
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)


### Road Map

General [react-modules] load map => [here](https://github.com/team-devmonster/react-native-modules);

- [ ] [input]
- [ ] [input[type=radio]]
- [ ] [input[type=time]]
- [ ] [checkbox]
- [ ] [radio]
- [ ] [errorText]
- [ ] [select]
- [ ] [option]


## Getting started

`$ npm install react-hook-form @team-devmonster/react-form@latest`


## Usage


### 1. Set Provider

This is a way for specifying the default style. You can skip it if you don't want to.

```javascript
// App.theme.tsx => You can use any file name :)
import { TagProvider, TagStyle, ButtonProps } from '@team-devmonster/react-tags';

export const AppFormProvider = ({children}: {children:React.ReactNode}) => {

  const color = { black: '#000000', white: '#ffffff' };

  //const { div, button } = useTheme<Theme>();

  const div:TagStyle = {
    color: color.black,
    fontSize: fontSize.base
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
    }
  }
  return (
    <TagProvider tagConfig={{ div, button }}>
      {children}
    </TagProvider>
  )
}
```

```javascript
import { AppTagProvider } from './App.theme';

export default function App() {

  return (
    <AppTagProvider>
      <Component></Component>
    </AppTagProvider>
  )
}
```

#### 1-1. If you use with `react-native-theme`

```javascript
// App.theme.tsx => You can use any file name :)
import { useTheme } from '@team-devmonster/react-native-theme';
import { TagProvider, TagStyle } from '@team-devmonster/react-tags';

export const AppTagProvider = ({children}: {children:React.ReactNode}) => {

  const { div, button } = useTheme<Theme>();
  
  return (
    <TagProvider tagConfig={{ div, button }}>
      {children}
    </TagProvider>
  )
}
```

```javascript
import { AppThemeProvider, AppTagProvider } from './App.theme';

export default function App() {

  return (
    <AppThemeProvider>
      <AppTagProvider>
        <Component></Component>
      </AppTagProvider>
    </AppThemeProvider>
  )
}
```


### 2. Use Tags

Just use Tags. It's so simple.

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@team-devmonster/react-native-theme';

import { Theme } from './App.theme';

const TagsEx = () => {

  // if you use with `react-native-theme`
  const { color, fontSize } = useTheme<Theme>();

  return (
    <Div
      style={{
        backgroundColor: color.white, 
        flex: 1, 
        padding: 18 
      }}>
      <Div style={{ fontSize: fontSize.xl }}>
        {`1. div => <Div></Div>`}
      </Div>
      <Div>
        <Button color={color.primary} onClick={() => Alert.alert('pressed')}>
          {`2. button => <Button></Button>`}
        </Button>
      </Div>
      <Div>
        <Img 
          style={{
            width: '100%',
            aspectRatio: 1.774, 
            backgroundColor: color.step500
          }} 
          src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img>
      </Div>
      <P style={{  
        marginBottom: 24, 
        height: 80
        }}>
        hello button~
        <Span>hello</Span>
        <Button 
          color={color.primary} 
          style={{ display: 'inline-flex' }}>inline button</Button>
        hello~!
        <P>hello next line!</P>
      </P>
      <P style={{ marginBottom: 20, color: color.primary }}>
        hello?
        <Button color={color.step500}>not inline button. normal button.</Button>
      </P>
      <Button 
        color={color.primary}
        fill="outline"
        style={{ 
          alignSelf: 'stretch', 
          alignItems: 'center',
          fontSize: fontSize.sm,
          ...shadow.base,
          marginBottom: 18
        }}>
          hellohellohello omg~
          <Img 
          style={{
            width: 20,
            aspectRatio: 1.774, 
            backgroundColor: color.step500
          }} 
          src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img>
      </Button>

      <Button color={color.primary} fill="outline" style={{ marginBottom: 8 }}>
        outline
      </Button>

      <Button color={color.primary} fill="translucent">
        translucent
      </Button>
    </Div>
  )
}

export default TagsEx;
```


### 3. Tags Info

#### <a name="Button"></a>Button

| props | values | description |
| :---:   | :---: | :---: |
| `color` | `HEX` | |
| `fill` | `base` `outline` `translucent` | default: `base` |
| `onClick` | `onPress` | same as `onPress` |
| `style` | `style` | `style` |
| `chilren` | `chilren` | `chilren` |

#### <a name="Img"></a>Button

| props | values | description |
| :---:   | :---: | :---: |
| `objectFit` | `contain` `cover` | default: `contain` |
| `style` | `style` | `style` |