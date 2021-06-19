import { useState, useCallback, useReducer } from 'react';
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

const useSafeDispatch = <T>(dispash: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()

  return useCallback((...args: T[]) => (mountedRef.current ? dispash(...args) : void 0), [dispash, mountedRef])
}

export const useAsync = <D>(initState?: State<D>, initConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initConfig }
  // const [state, setState] = useState<State<D>>({
  //   ...defaultInitState,
  //   ...initState
  // })

  // 使用useReducer改造
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => (
    { ...state, ...action }),
    { ...defaultInitState, ...initState }
  )

  const safeDispatch = useSafeDispatch(dispatch)

  // useState直接传入函数的含义是：惰性初始化
  // 所以，要用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => { })

  const setSuccess = useCallback((data: D) => {
    safeDispatch({
      data,
      status: 'success',
      error: null
    })
  }, [safeDispatch])
  const setError = useCallback((error: Error) => {
    safeDispatch({
      data: null,
      status: 'error',
      error
    })
  }, [safeDispatch])
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
    safeDispatch({ status: "loading" })
    return promise
      .then(res => {
        setSuccess(res)
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
  }, [config.throwOnError, setSuccess, setError, safeDispatch])

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