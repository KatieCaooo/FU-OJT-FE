import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobsData } from 'src/store/job-actions';
import { useEffect } from 'react';

import JobStudentView from 'src/components/job/JobStudentView';
import JobListResult from '../components/job/JobListResult';
import JobRepresentativeView from '../components/job/JobRepresentativeView';

const JobsList = () => {
  const jobData = useSelector((state) => state.jobs);
  const token = useSelector((state) => state.account.token);
  const role = useSelector((state) => state.account.role);
  const companyId = role === 'COMPANY_REPRESENTATIVE' ? useSelector((state) => state.account.account.company.id) : null;
  const studentId = role === 'STUDENT' ? useSelector((state) => state.account.account.student.id) : null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === 'STUDENT') {
      dispatch(fetchJobsData(token, 0, 10, null, `student.id==${studentId}`));
    }
    if (role === 'COMPANY_REPRESENTATIVE') {
      dispatch(
        fetchJobsData(token, 0, 10, null, `company.id==${companyId}`)
      );
    }
    if (role === 'SYS_ADMIN') {
      dispatch(fetchJobsData(token, 0, 10));
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Jobs | Material Kit </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            {role === 'COMPANY_REPRESENTATIVE' && (
              <JobRepresentativeView
                jobs={jobData.jobs}
                totalElements={jobData.totalQuantity}
              />
            )}
            {role === 'SYS_ADMIN' && (
              <JobListResult
                jobs={jobData.jobs}
                totalElements={jobData.totalQuantity}
              />
            )}
            {role === 'STUDENT' && <JobStudentView />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default JobsList;
