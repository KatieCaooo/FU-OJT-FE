/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceStudentList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.students = action.payload.students;
    }
  }
});

export const studentActions = studentSlice.actions;

export default studentSlice;
