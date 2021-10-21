import { configureStore } from '@reduxjs/toolkit';

import accountSlice from './account-slice';
import studentSlice from './student-slice';
import companySlice from './company-slice';

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    students: studentSlice.reducer,
    companies: companySlice.reducer
  }
});

export default store;
