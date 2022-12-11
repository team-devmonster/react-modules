# @team-devmonster/react-form

This is devmonster's react module for make app easily. This is compatible with devmonster's react-native module.<br>
[@team-devmonster/react-native-form](https://www.npmjs.com/package/@team-devmonster/react-native-tags)

This use [`react-hook-form`](https://github.com/react-hook-form/react-hook-form).


##### author: devmonster 
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

#### author: devmonster

We are always looking for investment or assistance.
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)
## items

- [o] [Input]
- [o] [Input\[type=radio\]]
- [o] [Input\[type=checkbox\]]
- [o] [Input\[type=number\]]
- [o] [Input\[type=date\]]
- [o] [Input\[type=time\]]
- [o] [Input\[type=file\]]
- [o] [Select]
- [o] [Textarea]


## Getting started

`$ npm install react-hook-form @hookform/error-message`

`$ npm install @team-devmonster/react-theme@latest @team-devmonster/react-tags@latest @team-devmonster/react-form@latest`


## Usage


### 1. Set Provider

This is a way for specifying the default style. You can skip it if you don't want to.

```javascript
// App.theme.tsx => You can use any file name :)
import { TagProvider, TagStyle, ButtonProps } from '@team-devmonster/react-tags';

export const AppFormProvider = ({children}: {children:React.ReactNode}) => {

  //const { div, button } = useTheme<Theme>();
  const color = { step300: '#cccccc', white: '#ffffff', black: '#111111' };

  const input:TagStyle = {
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
  return (
    <FormProvider formConfig={{ div, button }}>
      {children}
    </FormProvider>
  )
}
```

```javascript
import { AppFormProvider } from './App.theme';

export default function App() {

  return (
    <AppFormProvider>
      <Component></Component>
    </AppFormProvider>
  )
}
```

#### 1-1. If you use with `react-theme`

```javascript
// App.theme.tsx => You can use any file name :)
import { useTheme } from '@team-devmonster/react-theme';
import { TagProvider, TagStyle } from '@team-devmonster/react-tags';

export const AppTagProvider = ({children}: {children:React.ReactNode}) => {

  const { input, checkbox } = useTheme<Theme>();
  
  return (
    <TagProvider formConfig={{ input, checkbox }}>
      {children}
    </TagProvider>
  )
}
```

```javascript
import { AppThemeProvider, AppTagProvider, AppFormProvider } from './App.theme';

export default function App() {

  return (
    <AppThemeProvider>
      <AppTagProvider>
        <AppFormProvider>
          <Component></Component>
        </AppFormProvider>
      </AppTagProvider>
    </AppThemeProvider>
  )
}
```


### 2. Usage

It's so simple.

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@team-devmonster/react-theme';

import { Theme } from './App.theme';

const TagsEx = () => {

  // if you use with `react-theme`
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