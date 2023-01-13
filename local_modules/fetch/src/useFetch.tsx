import { useCallback, useMemo, useRef, useState } from "react";

interface UseFetchOptions {
  method: "POST"|"GET"|"PUT"|"DELETE",
  contentType?: "application/json"|"application/x-www-form-urlencoded"|'multipart/form-data'
}

interface FetchRes extends Promise<Response> {
  cancel:(callback?:(error:any) => void) => void
}

interface UseFetchState<Response> {
  loading: boolean,
  data?: Response,
  error?: any
}

export interface UseFetchResult<Form, Response> extends UseFetchState<Response> {
  fetch:(form?:Form) => Promise<UseFetchState<Response>>,
  cancel:(callback?:(error:any) => void) => void,
  setError: (error:any) => void,
  watch:() => UseFetchState<Response>,
}

export const useFetch = <Form, Response>(url:string, options:UseFetchOptions):UseFetchResult<Form, Response> => {
  const {method, contentType = "application/x-www-form-urlencoded"} = options;

  const [state, setState] = useState<UseFetchState<Response>>({
    loading: false,
    data: undefined,
    error: undefined
  });
  const ref = useRef<UseFetchState<Response>>({ loading:false, data:undefined, error:undefined });

  let fetchCancel:((callback?:(error:any) => void) => void)|undefined;

  let cancel = useCallback((callback?:(error:any) => void) => {
    fetchCancel?.(callback);
  }, [fetchCancel]);

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
      return {data, error:undefined, loading: false};
    })
    .catch(error => {
      console.log("❌ Error Data", JSON.stringify(error));
      if(error?.message === 'The user aborted a request.') return state;
      if(error.respInfo) {
        const state = {data:undefined, error:{message:`status: ${error.respInfo.status} / state: ${error.respInfo.state}`}, loading: false};
        ref.current = state;
        setState(state);
        throw state;
      } else {
        ref.current = {data:undefined, error, loading: false};
        setState({data:undefined, error, loading: false})
        throw {data:undefined, error, loading: false};
      }
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
    if (typeof json[prompt] == 'object') {
      if (!json[prompt]) {
        form.append(prompt, json[prompt]);
      } else if (json[prompt].constructor.name == 'Array') {
        if (typeof json[prompt][0] == 'object') {
          if (json[prompt][0].constructor.name == 'File') {
            for (let i = 0; i < json[prompt].length; i++) {
              form.append(prompt, json[prompt][i]);
            }
          } else if (json[prompt][0].constructor.name == 'Blob') {
            for (let i = 0; i < json[prompt].length; i++) {
              switch(json[prompt][i].type) {
                case 'audio/mpeg':
                  form.append(prompt, json[prompt][i], 'attaches' + new Date().getTime() + '.mp3');
                  break;
                case 'audio/wav':
                  form.append(prompt, json[prompt][i], 'attaches' + new Date().getTime() + '.wav');
                  break;
                default:
                  form.append(prompt, json[prompt][i], 'attaches' + new Date().getTime() + '.jpeg');
                  break;
              }
            }
          } else {
            form.append(prompt, JSON.stringify(json[prompt]));
          }
        } else {
          form.append(prompt, JSON.stringify(json[prompt]));
        }
      } else {
        if (json[prompt].constructor.name == 'File') {
          form.append(prompt, json[prompt]);
        } else if (json[prompt].constructor.name == 'Blob') {
          switch(json[prompt].type) {
            case 'audio/mpeg':
              form.append(prompt, json[prompt], 'attaches' + new Date().getTime() + '.mp3');
              break;
            case 'audio/wav':
              form.append(prompt, json[prompt], 'attaches' + new Date().getTime() + '.wav');
              break;
            default:
              form.append(prompt, json[prompt], 'attaches' + new Date().getTime() + '.jpeg');
              break;
          }
        } else {
          form.append(prompt, JSON.stringify(json[prompt]));
        }
      }
    } else {
      if (json[prompt] == 'true') json[prompt] = true;
      if (json[prompt] == 'false') json[prompt] = false;
      form.append(prompt, json[prompt]);
    }
  }
  return form;
}
