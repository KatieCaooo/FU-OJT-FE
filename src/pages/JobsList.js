import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobsData } from 'src/store/job-actions';
import { useEffect } from 'react';

import JobListResult from '../components/job/JobListResult';

const JobsList = () => {
  const jobData = useSelector((state) => state.jobs);
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobsData(token, 0, 10));
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
            {/* <MajorListToolbar /> */}
            <JobListResult
              jobs={jobData.jobs}
              totalElements={jobData.totalQuantity}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default JobsList;
