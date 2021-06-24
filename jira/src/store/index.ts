import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { activitySlice } from './features/activitySlice';

// 合并多个reducer
const rootReducer = combineReducers({
  activity: activitySlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  // 可以添加自己的中间件，比如打印日志
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true
})

// 获取全部store数据类型
export type RootState = ReturnType<typeof store.getState>

export default store
