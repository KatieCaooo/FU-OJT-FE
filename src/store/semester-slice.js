/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const semesterSlice = createSlice({
  name: 'semesters',
  initialState: {
    semesters: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceSemesterList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.semesters = action.payload.semesters;
    }
  }
});

export const semesterActions = semesterSlice.actions;

export default semesterSlice;
