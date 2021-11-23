/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const attachmentSlice = createSlice({
  name: 'attachment',
  initialState: {
    jobApplication: {
      attachments: [],
      isLoading: false
    }
  },
  reducers: {
    replaceAttachmentList(state, action) {
      state[action.payload.page].attachments = action.payload.attachments;
      state[action.payload.page].isLoading = false;
    },
    setIsLoading(state, action) {
      state[action.payload.page].isLoading = action.payload.isLoading;
    }
  }
});

export const attachmentActions = attachmentSlice.actions;

export default attachmentSlice;
