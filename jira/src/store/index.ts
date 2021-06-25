import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { projectListSlice } from './features/projectListSlice';
import { movieSlice } from './features/movieSlice';

// 合并多个reducer
export const rootReducer = combineReducers({
  movie: movieSlice.reducer,
  projectList: projectListSlice.reducer
})

// 包裹createStore
export const store = configureStore({
  reducer: rootReducer,
  // 可以添加自己的中间件，比如打印日志
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true
})

export type AppDispatch = typeof store.dispatch
// 获取全部store状态树类型
export type RootState = ReturnType<typeof store.getState>