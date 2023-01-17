import { useCallback, useMemo, useRef, useState } from "react";
import { extentions } from "./fileTypes";

export interface UseFetchOptions {
  method: "POST"|"GET"|"PUT"|"DELETE",
  contentType?: "application/json"|"application/x-www-form-urlencoded"|'multipart/form-data'
}

interface FetchRes extends Promise<Response> {
  cancel:(callback?:(error:any) => void) => void
}

interface UseFetchState<Hash, ListHash> {
  loading: boolean,
  data?:{ 
    resultCode:number,
    resultReference:string,
    resultHash:Hash,
    resultListHash:ListHash[],
    [name:string]:any, 
    exception:string
  }
  error?:any
}

export interface UseFetchResult<Form = any, Hash = any, ListHash = any> extends UseFetchState<Hash, ListHash> {
  fetch:(form?:Form) => Promise<UseFetchState<Hash, ListHash>>,
  cancel:(callback?:(error:any) => void) => void,
  setError: (error:any) => void,
  watch:() => UseFetchState<Hash,ListHash>,
}

export const useFetch = <Form = any, Hash = any, ListHash = any>(url:string, options:UseFetchOptions):UseFetchResult<Form, Hash, ListHash> => {
  const {method, contentType = "application/x-www-form-urlencoded"} = options;

  const [state, setState] = useState<UseFetchState<Hash,ListHash>>({
    loading: false,
    data: undefined,
    error: undefined
  });
  const ref = useRef<UseFetchState<Hash,ListHash>>({ loading:false, data:undefined, error:undefined });

  let fetchCancel:((callback?:(error:any) => void) => void)|undefined;

  let cancel = (callback?:(error:any) => void) => {
    fetchCancel?.(callback);
  }

  const fetchFn = useCallback(async(form?:Form) => {
    const controller = new AbortController();
    const signal = controller.signal;

    const requestUrl = env.API_URL + url;
    const { admin_id, admin_session } = await getUser() || {};
    const params:any = {
      platform_type: PlatformType.WEB,
      admin_id,
      admin_session,
      ...form
    }
    console.log("🚀 " + requestUrl + ' ' +  method + ' ' + contentType + '\n', JSON.stringify(params));
    ref.current = {...ref.current, loading: true};
    setState(prev => ({...prev, loading: true}));

    let fetchResponse:FetchRes;
    if(method === 'GET') {
      fetchResponse = fetch(requestUrl + (params ? '?' + new URLSearchParams(params as any) : ''), {
        method,
        headers: {
          'Content-type': contentType
        },
        signal
      }) as any;
    }
    else {
      const headers = new Headers();
      let body:any;
      if(contentType === 'application/x-www-form-urlencoded'
      || contentType === 'multipart/form-data') {
        body = objToForm(params);
      }
      else {
        body = params ? JSON.stringify(params)?.replace(',}', '}') : null;
      }
      // console.log(body);
      const fetchData:any = fetch(requestUrl, {
        method,
        headers,
        body,
        signal
      })
      fetchResponse = fetchData as FetchRes;
    }
    const res = fetchResponse
    .then((res:any) => {
      try {
        if(res.status !== 200 && res.respInfo?.status !== 200) {
          //console.log("❌ Status Not 200", res);
          throw res.json();
        }
        else {
          return res.json();
        }
      }
      catch(e) {
        throw res;
      }
    })
    .then(async(data) => {
      console.log("👌 " + requestUrl + ' ' + method + ' ' + contentType + '\n', JSON.stringify(data));
      if(data.resultCode == 1002)
      {
        await Promise.all([
          removeUser(),
          removeAutoLogin()
        ]);
        if(router.pathname !== 'login') {
          router.reset('/login');
        }
        ref.current = {...ref.current, loading: false};
        setState(prev => ({...prev, loading: false}))
      }
      else
      {
        ref.current = {data, error:undefined, loading: false};
        setState({data, error:undefined, loading: false})
      }

      return {data, error:undefined, loading: false};
    })
    .catch(error => {
      console.log("❌ Error Data", error);
      if(signal.aborted) throw { ...state, error:{ message: 'aborted' } };
      
      if(error.respInfo) {
        const state = {data:undefined, error:{message:`status: ${error.respInfo.status} / state: ${error.respInfo.state}`}, loading: false};
        ref.current = state;
        setState(state);
        throw state;
      }

      ref.current = {data:undefined, error, loading: false};
      setState({data:undefined, error, loading: false})
      throw {data:undefined, error, loading: false};
    });

    fetchCancel = () => {
      controller.abort();
    }
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
