import { User } from 'screens/projectList/searchPanel'

const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    }
    return Promise.reject(data)
  })
}

export const register = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    }
    return Promise.reject(data)
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)