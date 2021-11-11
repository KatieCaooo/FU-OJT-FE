/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    filter: {
      limit: 10, page: 0, order: 'asc', orderBy: 'id', sortedBy: 'id asc', search: ''
    },
    jobs: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceJobList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.jobs = action.payload.jobs;
    },
    setLimit(state, action) {
      state.filter.limit = action.payload;
    },
    setPage(state, action) {
      state.filter.page = action.payload;
    },
    setOrder(state, action) {
      state.filter.order = action.payload;
    },
    setOrderBy(state, action) {
      state.filter.orderBy = action.payload;
    },
    setSortedBy(state, action) {
      state.filter.sortedBy = action.payload;
    },
    setSearch(state, action) {
      state.filter.search = action.payload;
    },
  }
});

export const jobActions = jobSlice.actions;

export default jobSlice;
