/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    filter: {
      limit: 10, page: 0, order: 'asc', orderBy: 'id', sortedBy: 'id asc', search: ''
    },
    students: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceStudentList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.students = action.payload.students;
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

export const studentActions = studentSlice.actions;

export default studentSlice;
