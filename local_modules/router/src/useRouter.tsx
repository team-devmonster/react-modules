import { useRouter as useNextRouter } from "next/router";
import { Url, UrlObject } from "url";

type ParamListBase = {
  [x: string]: object | undefined;
}
type Keyof<T extends {}> = Extract<keyof T, string>;
type Href = string | UrlObject & { target?:string };

export type RouterProps<T extends ParamListBase, K extends keyof T = Keyof<T>> = T[K];

export function useRouter<Query extends RouterProps<ParamListBase>>() {
  const { pathname, query:_query, push:_push, replace:_replace, back:_back, isReady } = useNextRouter();
  const query = _query as Query;
  const push = (href:Href, as?: Url) => {
    const newWindow = openWindow(href);
    if(newWindow) return newWindow;
    _push(href, as);
  }
  const reset = (href:Href, as?: Url) => {
    const newWindow = openWindow(href);
    if(newWindow) return newWindow;
    _replace(href, as);
  }
  const replace = (href:Href, as?: Url) => {
    const newWindow = openWindow(href);
    if(newWindow) return newWindow;
    _replace(href, as);
  }
  const back = () => {
    _back();
  }
  return { query, push, reset, replace, back, pathname, isReady };
}

function openWindow(href:Href) {
  if(typeof href === 'string') return null;
  if(!href.target) return null;

  let url = href.pathname || '/';
  if(href.query) {
    const entries = Object.entries(href.query);
    url += '?' + entries.map(([key, value]) => `${key}=${value}`).join('&');
  }
  return window.open(url, href.target);
}