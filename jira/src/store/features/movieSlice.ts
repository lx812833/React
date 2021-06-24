import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
/**
 * createAsyncThunk：创建一个异步的action，次方法触发时会有三个回调状态：
 * pending(进行中) fulfilled(成功) rejected(失败)
 */
import { increment } from './counterSlice';

const moviesUrl = 'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48'
const loadMoviesAPI = () => fetch(moviesUrl).then(res => res.json())

export const getLoadData = createAsyncThunk('movie/loadData', async () => {
  const result = await loadMoviesAPI()
  // 此处的返回结果会在 .fulfilled中作为payload的值
  return result
})

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    list: [],
    totals: 0
  },
  reducers: {
    loadDataEnd: (state, { payload }) => {
      state.list = payload
      state.totals = payload?.length
    },
  },
  // extraReducers：可以额外触发其他slice中的数据关联改变
  extraReducers: {
    [increment.type](state, payload) {
      state.totals += 1
    },
    [getLoadData.fulfilled.type](state, { payload }) {
      state.list = payload.data.list;
    },
    [getLoadData.rejected.type](state, err) {
      console.log("reject", err)
    },
    [getLoadData.pending.type](state) {
      console.log("进行中", state)
    }
  }
})

export const { loadDataEnd } = movieSlice.actions
export default movieSlice.reducer