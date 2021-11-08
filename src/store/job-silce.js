/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    filter: {
      limit: 10,
      page: 0,
      order: 'asc',
      orderBy: 'id',
      sortedBy: 'id asc',
      search: ''
    },
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
