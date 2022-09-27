import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import movieSlice from "./features/movieSlice";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    counter: counterSlice,
    movie: movieSlice,
  }
})

// export type RootStore = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;