import { configureStore } from '@reduxjs/toolkit';

import accountSlice from './account-slice';

const store = configureStore({
  reducer: {
    account: accountSlice.reducer
  }
});

export default store;
