import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

const moviesUrl = 'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48'
const loadMoviesAPI = () => fetch(moviesUrl).then(res => res.json())
/**
 * createAsyncThunk：创建一个异步的action，该方法触发时会有三个回调状态：
 * pending(进行中) fulfilled(成功) rejected(失败)
 */
export const getMovieList = createAsyncThunk('movie/movieList', async () => {
  const result = await loadMoviesAPI()
  // 此处的返回结果会在 .fulfilled中作为payload的值
  return result
})

interface listState {
  tvId?: string;
  title?: string;
}
interface movieState {
  data: listState[];
  total: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  error: Error | null;
}

const initialState: movieState = {
  data: [],
  total: 0,
  pageNumber: 0,
  pageSize: 0,
  loading: false,
  error: null
}

// createSlice：创建一个slice，包含createReducer、createAction的所有功能
export const movieSlice = createSlice({
  name: 'movie', // 命名空间
  initialState, // 初始值
  // reducers中每一个方法都是action和reducer的结合，并集成了immer
  reducers: {

  },
  // 额外的reducer，处理异步action的reducer
  extraReducers: {
    [getMovieList.fulfilled.type]: (state) => {
      state.loading = true
    },
    [getMovieList.fulfilled.type]: (state, { payload }) => {
      const { data } = payload
      state.loading = false
      state.data = data?.list
      state.total = 48
      state.pageNumber = 1
      state.pageSize = 10
    },
    [getMovieList.rejected.type]: (state, action: PayloadAction<Error | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const movieActions = movieSlice.actions
export const selectMovieState = (state: RootState) => state.movie