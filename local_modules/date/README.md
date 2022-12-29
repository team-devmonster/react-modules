# @team-devmonster/date

This is for Simple date module.

### Other `devmonsters` modules

- [o] [`react-theme`](https://www.npmjs.com/package/@team-devmonster/react-theme)
- [o] [`react-tags`](https://www.npmjs.com/package/@team-devmonster/react-tags)

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

  toMonth();
  // return this Month as YYYY-MM

  toString(date:Date);
  // return date as YYYY-MM-DD

  compareTime(date:Date);
  // return compare time with now.
  // ex) 1일전, 어제, 1시간 전, 1분 전, 방금전
  compareTime(date:Date, date3:Date, 'time');
  // return compare time with now.
  // ex) -3284343434, 3483489
```