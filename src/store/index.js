import { configureStore } from '@reduxjs/toolkit';

import accountSlice from './account-slice';
import studentSlice from './student-slice';

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    students: studentSlice.reducer
  }
});

export default store;
