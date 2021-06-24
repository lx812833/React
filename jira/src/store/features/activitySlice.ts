import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActivityState {
  data: any;
  total: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  error: Error | null;
}

const initialState: ActivityState = {
  data: [],
  total: 0,
  pageNumber: 0,
  pageSize: 0,
  loading: false,
  error: null
}

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    fetchStart: (state) => {
      console.log("state", state)
      state.loading = true
    },
    fetchSuccess: (state, { payload }) => {
      console.log("fetchSuccess", payload)
      state.loading = false
      state.data = payload.data
      state.total = payload.total
      state.pageNumber = payload.pageNumber
      state.pageSize = payload.pageSize
    },
    fetchFail: (state, action: PayloadAction<Error | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})