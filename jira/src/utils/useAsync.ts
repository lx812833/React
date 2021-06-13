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

export const useAsync = <D>(initState?: State<D>) => {
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
      .catch(error => {
        setError(error)
        return error
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