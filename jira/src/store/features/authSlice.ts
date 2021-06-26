import { User } from 'screens/projectList/searchPanel';
import { createSlice } from '@reduxjs/toolkit';
import * as auth from 'utils/authProvider';
import { AuthForm, initUser } from 'context/authContext';
import { AppDispatch, RootState } from 'store/index';

interface authState {
  user: User | null
}

const initialState: authState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    }
  }
})

export const authActions = authSlice.actions
export const selectAuthState = (state: RootState) => state.auth

// 登录
export const loginThunk = (form: AuthForm) => (dispatch: AppDispatch) => auth.login(form).then(user => dispatch(authActions.setUser(user)))
// 注册
export const registerThunk = (form: AuthForm) => (dispatch: AppDispatch) => auth.register(form).then(user => dispatch(authActions.setUser(user)))
// 登出
export const logoutThunk = () => (dispatch: AppDispatch) => auth.logout().then(user => dispatch(authActions.setUser(null)))
// 初始化user
export const initUserThunk = () => (dispatch: AppDispatch) => initUser().then(user => dispatch(authActions.setUser(user)))