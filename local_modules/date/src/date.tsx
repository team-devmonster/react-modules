export const today = (opts = {year: 0, month: 0, date: 0}) => {
  const now = new Date();
  if (opts.year) now.setFullYear(now.getFullYear() + opts.year);
  if (opts.month) now.setMonth(now.getMonth() + opts.month);
  if (opts.date) now.setDate(now.getDate() + opts.date);

  return now.getFullYear() + '-' + toXX(now.getMonth() + 1) + '-' + toXX(now.getDate());
}
export const toMonth = () => {
  const date = new Date();
  return `${date.getFullYear()}-${toXX(date.getMonth()+1)}`;
}
export const toString = (date:Date) => {
  return date.getFullYear() + '-' + toXX(date.getMonth() + 1) + '-' + toXX(date.getDate());
}
export const compareTime = (time:string | Date) => {
  const now = new Date();

  const end = typeof time === 'string' ? new Date(time) : time;

  const def_time = now.getTime() - end.getTime();
  const def_days = def_time / (1000 * 3600 * 24);
  const def_hours = def_time / (1000 * 3600);
  const def_minutes = def_time / (1000 * 60);
  // const def_seconds = def_time / 1000;
  if(def_days > 1) {
    return  Math.floor(def_days) + '일 전';
  }
  else if(def_days >= 1) {
    return  '어제';
  }
  else if(def_hours >= 1) {
    return  Math.floor(def_hours) + '시간 전';
  } else if(def_minutes >= 1) {
    return Math.floor(def_minutes) + '분 전';
  } else {
    return '방금 전';
  }
}
export const toXX = (num:number) => {
  return num < 10 ? `0${num}` : num;
}