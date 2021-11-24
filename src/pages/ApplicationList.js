import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ApplicationRepresentativeView from 'src/components/application/ApplicationRepresentativeView';
import { fetchApplicationData } from '../store/application-actions';
import ApplicationListResult from '../components/application/ApplicationListResult';

const ApplicationList = () => {
  const applicationsData = useSelector((state) => state.applications);
  const token = useSelector((state) => state.account.token);
  const role = useSelector((state) => state.account.role);
  const companyId = role === 'COMPANY_REPRESENTATIVE' ? useSelector((state) => state.account.account.company.id) : null;
  const studentId = role === 'STUDENT' ? useSelector((state) => state.account.account.student.id) : null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === 'STUDENT') {
      dispatch(fetchApplicationData(token, 0, 10, null, `student.id==${studentId}`));
    }
    if (role === 'COMPANY_REPRESENTATIVE') {
      dispatch(fetchApplicationData(token, 0, 10, null, `job.company.id==${companyId}`));
    }
    if (role === 'SYS_ADMIN') {
      dispatch(fetchApplicationData(token, 0, 10));
    }
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
            {role !== 'COMPANY_REPRESENTATIVE' && (
            <ApplicationListResult
              applications={applicationsData.applications}
              totalElements={applicationsData.totalQuantity}
            />
            )}
            {role === 'COMPANY_REPRESENTATIVE' && (
              <ApplicationRepresentativeView
                applications={applicationsData.applications}
                totalElements={applicationsData.totalQuantity}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ApplicationList;
