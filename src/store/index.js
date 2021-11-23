import { configureStore } from '@reduxjs/toolkit';

import accountSlice from './account-slice';
import studentSlice from './student-slice';
import companySlice from './company-slice';
import semesterSlice from './semester-slice';
import majorSlice from './major-slice';
import jobSlice from './job-silce';
import attachmentSlice from './attachment-slice';
import evaluationSlice from './evaluation-slice';
import applicationSlice from './application-slice';

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    students: studentSlice.reducer,
    companies: companySlice.reducer,
    semesters: semesterSlice.reducer,
    majors: majorSlice.reducer,
    jobs: jobSlice.reducer,
    attachment: attachmentSlice.reducer,
    evaluations: evaluationSlice.reducer,
    applications: applicationSlice.reducer
  }
});

export default store;
