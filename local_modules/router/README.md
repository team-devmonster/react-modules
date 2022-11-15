# @team-devmonster/react-router

> :warning: **It's under development**<br>
> :warning: **It's using nextjs**

## This is under devmonster's react & react-native union project.

This project is part of the `react-module & react-native-module` projects, that integrate `react & react-native` by the devmonster team.<br><br>
`react-native` => [@team-devmonster/react-native-router](https://www.npmjs.com/package/@team-devmonster/react-native-router)<br>
General `react-modules` load map => [here](https://github.com/team-devmonster/react-modules);<br>
General `react-native-modules` load map => [here](https://github.com/team-devmonster/react-native-modules);

### Other `react` modules

- [o] [`react-theme`](https://www.npmjs.com/package/@team-devmonster/react-theme)
- [o] [`react-tags`](https://www.npmjs.com/package/@team-devmonster/react-tags)

#### author: devmonster

We are always looking for investment or assistance.
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

## items

- [o] [A] => Just tag `a`
- [ ] [Header]

## Getting started

`$ npm install @team-devmonster/react-router@latest`


## Examples

Easy. Too Easy.

```javascript
import React from "react";
import { useTheme } from '@team-devmonster/react-theme';
import { Theme } from './App.theme';
import { Div, Button } from "@team-devmonster/react-tags";
import { A } from "@team-devmonster/react-router";

const RouterEx = () => {

  const { color } = useTheme<Theme>();

  return (
    <Div
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <A href='/themeEx'>
        <Button color={color.primary} style={{ marginBottom: 8 }}>themeEx</Button>
      </A>
      <A href={{
        pathname: '/routerEx/paramEx',
        query: {
          name: 'soohong kim',
          nickname: 'aldegad',
          company: 'devmonster'
        }
      }}>
        <Button color={color.danger} style={{ marginBottom: 8 }}>paramEx</Button>
      </A>
      <A href='https://www.google.co.kr'>
        <Button color={color.warning}>google</Button>
      </A>
    </Div>
  )
}

export default RouterEx;
```

```javascript
import React from "react";
import { useTheme } from '@team-devmonster/react-theme';
import { Theme } from "./App.theme";
import { Div, Button, P } from "@team-devmonster/react-tags";
import { A } from "@team-devmonster/react-router";
import { useRouter } from "next/router";

const ParamEx = () => {

  const { color, fontSize, shadow, colorScheme } = useTheme<Theme>();
  const { query } = useRouter();

  return (
    <Div
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <P style={{ padding: 8, backgroundColor: color.step300 }}>
        { query.name } / { query.nickname } / { query.company }
      </P>
      <A back={true}>
        <Button color={color.primary}>Back</Button>
      </A>
    </Div>
  )
}

export default ParamEx;
```