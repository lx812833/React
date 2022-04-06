// 方案1：使用 Context

import React, { ReactNode } from 'react';
import * as auth from 'utils/authProvider';
import { User } from 'screens/projectList/searchPanel';
import { http } from 'utils/http';
import { useMount } from 'utils/index';
import { useAsync } from 'utils/useAsync';
import { FullPageLoading, FullPageError } from 'components/fullPage';

export interface AuthForm {
  username: string,
  password: string
}

// 初始化（根据token）user
export const initUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token: token })
    user = data.user
  }
  return user
}

// 实现组件跨层级传值功能（泛型类型）
const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

// context 对象接受一个名为 displayName 的 property，类型为字符串。
// React DevTools 使用该字符串来确定 context 要显示的内容。
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { handleRunPromise, isIdle, isLoading, isError, error, data: user, setSuccess: setUser } = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then(res => setUser(res))
  const register = (form: AuthForm) => auth.register(form).then(res => setUser(res))
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    handleRunPromise(initUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageError error={error} />
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

// 自定义Hook useAuth
export const useAuth = () => {
  // useContext：接收一个Context对象（React.CreateContext的返回值），并返回该 Context 的当前值。
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}


// 方案2： 使用 react-redux

// import { ReactNode, useCallback } from 'react';
// import * as auth from 'utils/authProvider';
// import { User } from 'screens/projectList/searchPanel';
// import { http } from 'utils/http';
// import { useMount } from 'utils/index';
// import { useAsync } from 'utils/useAsync';
// import { FullPageLoading, FullPageError } from 'components/fullPage';
// import * as authStore from 'store/features/authSlice';
// import { selectAuthState, initUserThunk } from 'store/features/authSlice';
// import { useDispatch, useSelector } from 'react-redux';

// export interface AuthForm {
//   username: string,
//   password: string
// }

// // 初始化（根据token）user
// export const initUser = async () => {
//   let user = null
//   const token = auth.getToken()
//   if (token) {
//     const data = await http('me', { token: token })
//     user = data.user
//   }
//   return user
// }

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const { handleRunPromise, isIdle, isLoading, isError, error } = useAsync<User | null>()
//   const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

//   useMount(() => {
//     handleRunPromise(dispatch(initUserThunk()))
//   })

//   if (isIdle || isLoading) {
//     return <FullPageLoading />
//   }
//   if (isError) {
//     return <FullPageError error={error} />
//   }

//   return <div>{children}</div>
// }

// export const useAuth = () => {
//   // 对dispatch类型进行显示声明
//   const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
//   const { user } = useSelector(selectAuthState)
//   const login = useCallback((form: AuthForm) => dispatch(authStore.loginThunk(form)), [dispatch])
//   const register = useCallback((form: AuthForm) => dispatch(authStore.registerThunk(form)), [dispatch])
//   const logout = useCallback(() => dispatch(authStore.logoutThunk()), [dispatch])
//   return {
//     user, login, register, logout
//   }
// }