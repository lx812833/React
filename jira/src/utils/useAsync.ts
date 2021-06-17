import { useState, useCallback } from 'react';
import { useMountedRef } from 'utils/index';

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
  const [state, setState] = useState<State<D>>({
    ...defaultInitState,
    ...initState
  })

  const mountedRef = useMountedRef()

  // useState直接传入函数的含义是：惰性初始化
  // 所以，要用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => { })

  const setSuccess = (data: D) => {
    setState({
      data,
      status: 'success',
      error: null
    })
  }
  const setError = (error: Error) => {
    setState({
      data: null,
      status: 'error',
      error
    })
  }
  // handleRunPromise：用于触发异步请求
  const handleRunPromise = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then()) {
      throw new Error
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        // 缓存当前handleRunPromise执行环境，用于之后重新调用handleRunPromise函数
        console.log("retry")
        handleRunPromise(runConfig?.retry(), runConfig)
      }
    })
    setState({ ...state, status: 'loading' })
    return promise
      .then(res => {
        if (mountedRef.current) {
          setSuccess(res)
        }
        return res
      })
      // catch会消耗异常，如果不主动Promise.reject抛出，后续无法catch异常
      .catch(error => {
        setError(error)
        if (config.throwOnError) {
          return Promise.reject(error)
        } else {
          return error
        }
      })
      // 只有当依赖项数据变化时，才会重新定义 handleRunPromise
  }, [])

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    handleRunPromise,
    setSuccess,
    setError,
    retry, // 重新执行handleRunPromise，刷新state
    ...state
  }
}