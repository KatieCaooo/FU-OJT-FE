/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  role: null,
  token: null,
  account: null,
  isLoggedIn: false
};

const readAccountFromLocalStorage = () => {
  const account = localStorage.getItem('account');
  if (account) {
    return JSON.parse(account);
  }
  return initialState;
};

const accountSlice = createSlice({
  name: 'account',
  initialState: readAccountFromLocalStorage(),
  reducers: {
    login(state, action) {
      const {
        account, id, token, roles
      } = action.payload;
      const [role] = roles;
      state.id = id;
      state.role = role;
      state.token = token;
      state.isLoggedIn = true;
      state.account = account;
      localStorage.setItem('account', JSON.stringify(state));
    },
    logout(state) {
      localStorage.removeItem('account');
      state.id = null;
      state.role = null;
      state.token = null;
      state.account = null;
      state.isLoggedIn = false;
    }
  }
});

export const accountActions = accountSlice.actions;

export default accountSlice;
