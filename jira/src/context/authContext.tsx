import React, { ReactNode } from 'react';
import * as auth from 'utils/authProvider';
import { User } from 'screens/projectList/searchPanel';
import { http } from 'utils/http';
import { useMount } from 'utils/index';
import { useAsync } from 'utils/useAsync';
import { FullPageLoading, FullPageError } from 'components/fullPage';

interface AuthForm {
  username: string,
  password: string
}

// 初始化（根据token）user
const initUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token: token })
    user = data.user
  }
  return user
}

// 实现组件跨层级传值功能
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