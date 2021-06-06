import React, { useState, ReactNode } from 'react';
import * as auth from 'utils/authProvider';
import { User } from 'screens/projectList/searchPanel';

interface AuthForm {
  username: string,
  password: string
}

const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(res => setUser(res))
  const register = (form: AuthForm) => auth.register(form).then(res => setUser(res))
  const logout = () => auth.logout().then(() => setUser(null))

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

// 自定义Hook useAuth
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  console.log("context", context)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}