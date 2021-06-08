import React, { useState, ReactNode } from 'react';
import * as auth from 'utils/authProvider';
import { User } from 'screens/projectList/searchPanel';
import { http } from 'utils/http';
import { useMount } from 'utils/index';

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

// 设置全局共享数据
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
  const [user, setUser] = useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(res => setUser(res))
  const register = (form: AuthForm) => auth.register(form).then(res => setUser(res))
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    initUser().then(res => setUser(res))
  })

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

// 自定义Hook useAuth
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}