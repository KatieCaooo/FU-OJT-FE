/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    filter: {
      limit: 10, page: 0, order: 'asc', orderBy: 'id', sortedBy: 'id asc', search: ''
    },
    applications: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceApplicationList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.applications = action.payload.applications;
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

export const applicationActions = applicationSlice.actions;

export default applicationSlice;
