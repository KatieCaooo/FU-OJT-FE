/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceJobList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.jobs = action.payload.jobs;
    }
  }
});

export const jobActions = jobSlice.actions;

export default jobSlice;
