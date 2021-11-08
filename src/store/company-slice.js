/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceCompanyList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.companies = action.payload.companies;
    }
  }
});

export const companyActions = companySlice.actions;

export default companySlice;
