import { useState } from 'react';

interface State<D> {
  data: D | null,
  status: 'idle' | 'loading' | 'error' | 'success',
  error: Error | null
}

const defaultInitState: State<null> = {
  data: null,
  status: 'idle',
  error: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initState?: State<D>, initConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initConfig }
  const [data, setData] = useState<State<D>>({
    ...defaultInitState,
    ...initState
  })

  const setSuccess = (data: D) => {
    setData({
      data,
      status: 'success',
      error: null
    })
  }
  const setError = (error: Error) => {
    setData({
      data: null,
      status: 'error',
      error
    })
  }
  // run：用于触发异步请求
  const handleRunPromise = (promise: Promise<D>) => {
    if (!promise || !promise.then()) {
      throw new Error
    }
    setData({ ...data, status: 'loading' })
    return promise
      .then(res => {
        setSuccess(res)
        return res
      })
      // catch会消耗异常，如果不主动Promise.reject抛出，后续无法catch异常
      .catch(error => {
        setError(error)
        console.log("报错的", config)
        if(config.throwOnError) {
          return Promise.reject(error)
        } else {
          return error
        }
      })
  }

  return {
    isIdle: data.status === "idle",
    isLoading: data.status === "loading",
    isError: data.status === "error",
    isSuccess: data.status === "success",
    handleRunPromise,
    setSuccess,
    setError,
    ...data
  }
}