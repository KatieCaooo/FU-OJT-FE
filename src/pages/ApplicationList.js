import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchApplicationData } from '../store/application-actions';
import ApplicationListResult from '../components/application/ApplicationListResult';

const ApplicationList = () => {
  const applicationsData = useSelector((state) => state.applications);
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApplicationData(token, 0, 10));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Majors | Material Kit </title>
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
            <ApplicationListResult
              applications={applicationsData.applications}
              totalElements={applicationsData.totalQuantity}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ApplicationList;
