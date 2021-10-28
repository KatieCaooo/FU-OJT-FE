/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const majorSlice = createSlice({
  name: 'majors',
  initialState: {
    majors: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceMajorList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.majors = action.payload.majors;
    }
  }
});

export const majorActions = majorSlice.actions;

export default majorSlice;
