import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  title: "redux toolkit pre"
}

// 创建一个Slice（切片）
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // 定义reducers并生成相关联操作
  reducers: {
    increment: (state, { payload }) => {
      // action 里面有 type 和 payload 两个属性，所有的传参都在payload里面
      state.value += Number(payload.value) || 1;
    },
    decrement: (state, action) => {
      state.value -= 1;
    }
  }
})

// 导出actions定义的方法
export const { increment, decrement } = counterSlice.actions;

// 导出reducer，创建store
export default counterSlice.reducer;