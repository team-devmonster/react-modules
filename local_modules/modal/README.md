# @team-devmonster/react-modal

This is simple react modal. This can use like react-native modal.
#### author: devmonster 

We are always looking for investment or assistance.<br>
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

## items
- [o] [modal]

## Getting started

`$ npm install @team-devmonster/react-modal@latest`


## Examples

<img src="https://github.com/team-devmonster/react-modules/blob/master/local_modules/modal/screenshots/modal01.png" width="120">

Easy. Too Easy.

### usage

```javascript
import React, { useState } from "react";
import { Modal } from "@team-devmonster/react-modal";

export const AnyComponent = ({ visible, onRequestClose }) => {

  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button 
        onClick={() => setVisible(true)}
        fill="outline">
        react-modal
      </Button>
      <Modal visible={visible} onRequestClose={() => console.log('on request close')}>
        <Div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
          devmonster's react-modal
          <Button onClick={() => { setVisible(false) }}>close</Button>
        </Div>
      </Modal>
    </>
  )
}
```

### `devmonsters` modules

for javascript
- [`date`](https://www.npmjs.com/package/@team-devmonster/date)

for react
- [`react-theme`](https://www.npmjs.com/package/@team-devmonster/react-theme)
- [`react-tags`](https://www.npmjs.com/package/@team-devmonster/react-theme)
- [`react-router`](https://www.npmjs.com/package/@team-devmonster/react-router)
- [`react-form`](https://www.npmjs.com/package/@team-devmonster/react-form)
- [`react-modal`](https://www.npmjs.com/package/@team-devmonster/react-modal)

for react-native
- [`react-native-theme`](https://www.npmjs.com/package/@team-devmonster/react-native-theme)
- [`react-native-tags`](https://www.npmjs.com/package/@team-devmonster/react-native-tags)
- [`react-native-router`](https://www.npmjs.com/package/@team-devmonster/react-native-router)
- [`react-native-form`](https://www.npmjs.com/package/@team-devmonster/react-native-form)
- [`react-native-skeleton`](https://www.npmjs.com/package/@team-devmonster/react-native-skeleton)