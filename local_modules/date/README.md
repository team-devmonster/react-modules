# @team-devmonster/date

This is simple date module.

#### author: devmonster

We are always looking for investment or assistance.
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

## items

- [o] [today]
- [o] [toMonth]
- [o] [toString]
- [o] [compareTime]

## Getting started

`$ npm install @team-devmonster/date@latest`


## Examples

Easy. Too Easy.

```javascript
  today();
  // return today as YYYY-MM-DD
  today({ year: -1 });
  // return last year as YYYY-MM-DD
  today({ month: -1 });
  // return last month as YYYY-MM-DD
  today({ date: -1 });
  // return last date as YYYY-MM-DD
  today({ type: 'YYYY-MM-DD hh:mm:ss' });
  // return last date as YYYY-MM-DD hh:mm:ss

  toMonth();
  // return this Month as YYYY-MM
  toMonth({ year: -1 });
  // return last year as YYYY-MM
  toMonth({ month: -1 });
  // return last month as YYYY-MM
  toMonth({ date: -1 });
  // return last date as YYYY-MM

  toString(date:Date);
  // return date as YYYY-MM-DD

  compareTime({ date: '2022-12-31' });
  compareTime({ date: new Date() });
  // return compared time with now.
  // ex) 12월 31일, 1일전, 어제, 1시간 전, 1분 전, 방금전

  compareTime({ date: '2022-12-31', date2: '2023-01-01' });
  // return compared time date & date2.
  // ex) 12월 31일, 1일전, 어제, 1시간 전, 1분 전, 방금전

  compareTime({ date: '2022-12-31', date2: '2023-01-01', type: 'time' });
  // return compared time. as milliseconds.
  // ex) -3284343434, 3483489
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
- [`react-native-img-viewer`](https://www.npmjs.com/package/@team-devmonster/react-native-skeleton)