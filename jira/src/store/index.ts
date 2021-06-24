import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { projectListSlice } from './features/projectListSlice';
import { activitySlice } from './features/activitySlice';

// 合并多个reducer
export const rootReducer = combineReducers({
  activity: activitySlice.reducer,
  projectList: projectListSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  // 可以添加自己的中间件，比如打印日志
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true
})

export type AppDispatch = typeof store.dispatch
// 获取全部store状态树类型
export type RootState = ReturnType<typeof store.getState>