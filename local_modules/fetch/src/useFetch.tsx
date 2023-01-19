import { useCallback, useMemo, useRef, useState } from "react";
import { extentions } from "./fileTypes";

export interface UseFetchOptions {
  method: "POST"|"GET"|"PUT"|"DELETE",
  headers?: {[name:string]:string}
}

interface FetchRes extends Promise<Response> {
  cancel:(callback?:(error:any) => void) => void
}

interface UseFetchState<Result> {
  loading: boolean,
  data?:Result,
  error?:any
}

export interface UseFetchResult<Form = any, Result = any> extends UseFetchState<Result> {
  fetch:(form?:Form) => Promise<UseFetchState<Result>>,
  cancel:(callback?:(error:any) => void) => void,
  setError: (error:any) => void,
  watch:() => UseFetchState<Result>,
}

export function useFetch<Form = any, Result = any>(url:string, options:UseFetchOptions):UseFetchResult<Form, Result> {
  const {method, headers = { 'Content-type': "application/x-www-form-urlencoded" }} = options;

  const [state, setState] = useState<UseFetchState<Result>>({
    loading: false,
    data: undefined,
    error: undefined
  });
  const ref = useRef<UseFetchState<Result>>({ loading:false, data:undefined, error:undefined });

  let fetchCancel:((callback?:(error:any) => void) => void)|undefined;

  let cancel = (callback?:(error:any) => void) => {
    fetchCancel?.(callback);
  }

  const fetchFn = useCallback(async(form?:Form) => {
    const controller = new AbortController();
    const signal = controller.signal;

    const requestUrl = url;
    const params:any = form;

    ref.current = {...ref.current, loading: true};
    setState(prev => ({...prev, loading: true}));

    let fetchResponse:FetchRes;
    if(method === 'GET') {
      fetchResponse = fetch(requestUrl + (params ? '?' + new URLSearchParams(params as any) : ''), {
        method,
        headers,
        signal
      }) as any;
    }
    else {
      let body:any;
      if(headers['Content-type'] === 'application/x-www-form-urlencoded'
      || headers['Content-type'] === 'multipart/form-data') {
        body = objToForm(params);
      }
      else {
        body = params ? JSON.stringify(params)?.replace(',}', '}') : null;
      }
      
      const fetchData:any = fetch(requestUrl, {
        method,
        headers,
        body,
        signal
      })
      fetchResponse = fetchData as FetchRes;
    }
    
    const res = fetchResponse
    .then((res:any) => res.json())
    .then(async(data) => {

      ref.current = {data, error:undefined, loading: false};
      setState({data, error:undefined, loading: false})

      return {data, error:undefined, loading: false};
    })
    .catch(error => {
      if(signal.aborted) {
        const newState = {...state, error: { message: 'aborted' }, loading: false};
        ref.current = newState;
        setState(newState);
        throw newState;
      }

      ref.current = {data:undefined, error, loading: false};
      setState({data:undefined, error, loading: false})

      throw {data:undefined, error, loading: false};
    });

    fetchCancel = () => controller.abort();
    return res;
  }, [url]);

  const res = useMemo(() => {
    return {
      fetch: fetchFn,
      cancel: cancel,
      watch: () => ref.current,
      data: state.data,
      loading: state.loading,
      error: state.error,
      setError: (error:any) => {
        setState(prev => ({...prev, error}));
      }
    }
  }, [url, cancel, state])
  
  return res;
}



const objToForm = (json:any) => {
  let form = new FormData();
  for (let prompt in json) {

    if(json[prompt] === null || json[prompt] === undefined) {
      form.append(prompt, '');
      continue;
    }

    if(typeof json[prompt] !== 'object') {
      form.append(prompt, json[prompt]);
      continue;
    }

    // typeof json[prompt] === 'object'
    if (json[prompt].constructor.name === 'File') {
      form.append(prompt, json[prompt]);
      continue;
    }

    if (json[prompt].constructor.name === 'Blob') {
      const extension = extentions[json[prompt].type];
      form.append(prompt, json[prompt], 'attaches' + new Date().getTime() + `.${extension}`);
      continue;
    }

    // not file end blob
    if(!Array.isArray(json[prompt])) {
      form.append(prompt, JSON.stringify(json[prompt]));
      continue;
    }

    // array value part
    if(typeof json[prompt][0] !== 'object') {
      form.append(prompt, JSON.stringify(json[prompt]));
      continue;
    }

    // typeof json[prompt][0] === 'object'
    if (json[prompt][0].constructor.name === 'File') {
      for (let i = 0; i < json[prompt].length; i++) {
        form.append(prompt, json[prompt][i]);
      }
      continue;
    }
    
    if (json[prompt][0].constructor.name === 'Blob') {
      for (let i = 0; i < json[prompt].length; i++) {
        const extension = extentions[json[prompt][i].type];
        if(!extension) throw `extension not matched: ${json[prompt][i].type}`;
        form.append(prompt, json[prompt], 'attaches' + new Date().getTime() + `.${extension}`);
      }
      continue;
    }

    form.append(prompt, JSON.stringify(json[prompt]));
  }
  return form;
}
