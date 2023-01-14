import { useRouter as useNextRouter } from "next/router";
import { Url, UrlObject } from "url";

type ParamListBase = {
  [x: string]: object | undefined;
}
type Keyof<T extends {}> = Extract<keyof T, string>;
export type RouterProps<T extends ParamListBase, K extends keyof T = Keyof<T>> = T[K];

export function useRouter<Query extends RouterProps<ParamListBase>>() {
  const { pathname, query:_query, push:_push, replace:_replace, back:_back, isReady } = useNextRouter();
  const query = _query as Query;
  const push = (href:string | UrlObject, as?: Url) => {
    _push(href, as);
  }
  const reset = (href:string | UrlObject, as?: Url) => {
    _replace(href, as);
  }
  const replace = (href:string | UrlObject, as?: Url) => {
    _replace(href, as);
  }
  const back = () => {
    _back();
  }
  return { query, push, reset, replace, back, pathname, isReady };
}