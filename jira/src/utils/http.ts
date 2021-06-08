import qs from 'qs';
import * as auth from 'utils/authProvider';
import { useAuth } from 'context/authContext';
const apiUrl = process.env.REACT_APP_API_URL;

interface RequestConfig extends RequestInit {
  data?: object,
  token?: string
}

export const http = async (encode: string, { data, token, headers, ...customConfig }: RequestConfig = {}) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === "GET") {
    encode += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${encode}`, config).then(async res => {
    if (res.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: "请重新登录" })
    }
    const result = await res.json()
    if (res.ok) {
      return result
    } else {
      return Promise.reject(result)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  // 联合类型 Utility Types
  // (...[encode, config]: [string, RequestConfig])
  return (...[encode, config]: Parameters<typeof http>) => http(encode, { ...config, token: user?.token })
}

type Person = {
  name: string,
  age: number
}
// Partial：定义type中局部属性 Partial: type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
const student: Partial<Person> = { name: 'test' }
// Omit: 忽略type中某个属性（删除多个 <Person, 'name' | 'age>）
const person: Omit<Person, 'name'> = {age: 8}