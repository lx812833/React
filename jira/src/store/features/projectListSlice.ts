import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface projectState {
  projectModalOpen: boolean;
}

const initialState: projectState = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {
    openProjectModal: (state) => {
      state.projectModalOpen = true
    },
    closeProjectModal: (state) => {
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions
export const selectProjectState = (state: RootState) => state.projectList