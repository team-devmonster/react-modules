export type TodayProps = {
  year?:number,
  month?:number,
  date?:number,
  type?:'YYYY-MM-DD'|'YYYY-MM-DD hh:mm:ss'
}
export const today = (opts?:TodayProps) => {
  const { year, month, date, type } = opts || {};
  const now = new Date();
  if (year) now.setFullYear(now.getFullYear() + year);
  if (month) now.setMonth(now.getMonth() + month);
  if (date) now.setDate(now.getDate() + date);

  switch(type) {
    case 'YYYY-MM-DD hh:mm:ss':
      return `${now.getFullYear()}-${toXX(now.getMonth() + 1)}-${toXX(now.getDate())} ${toXX(now.getHours())}:${toXX(now.getMinutes())}:${toXX(now.getSeconds())}`;
    default: // 'YYYY-MM-DD'
      return `${now.getFullYear()}-${toXX(now.getMonth() + 1)}-${toXX(now.getDate())}`;
  }
}
export const toMonth = () => {
  const date = new Date();
  return `${date.getFullYear()}-${toXX(date.getMonth()+1)}`;
}
export const toString = (date:Date) => {
  return date.getFullYear() + '-' + toXX(date.getMonth() + 1) + '-' + toXX(date.getDate());
}
export type CompareTimeProps = {
  date:string|Date,
  date2?:string|Date,
  type?:'ko'|'time'
}
export const compareTime = ({ date, date2 = new Date(), type = 'ko' }:CompareTimeProps) => {
  const end = typeof date === 'string' ? new Date(date) : date;
  const now = typeof date2 === 'string' ? new Date(date2) : date2;

  const def_time = now.getTime() - end.getTime();
  const def_days = def_time / (1000 * 3600 * 24);
  const def_hours = def_time / (1000 * 3600);
  const def_minutes = def_time / (1000 * 60);
  // const def_seconds = def_time / 1000;
  if(type === 'ko') {
    if(def_days > 7) {
      if(end.getFullYear() !== now.getFullYear()) {
        return  `${end.getFullYear()} ${end.getMonth()+1}월 ${end.getDate()}일`;  
      }
      else {
        return  `${end.getMonth()+1}월 ${end.getDate()}일`;
      }
    }
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
  else {
    return def_time;
  }
}
export const toXX = (num:number) => {
  return num < 10 ? `0${num}` : num;
}