import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompaniesData } from 'src/store/company-actions';
import { useEffect } from 'react';
import CompanyListToolbar from '../components/company/CompanyListToolbar';
import CompanyListResult from '../components/company/CompanyListResult';
import CompanyRepresentativeView from '../components/company/CompanyRepresentativeView';

const CompanyList = () => {
  const companyData = useSelector((state) => state.companies);
  const token = useSelector((state) => state.account.token);
  const role = useSelector((state) => state.account.role);
  const companyId = role === 'COMPANY_REPRESENTATIVE' ? useSelector((state) => state.account.account.company.id) : null;

  const studentId = role === 'STUDENT' ? useSelector((state) => state.account.account.student.id) : null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === 'STUDENT') {
      dispatch(
        fetchCompaniesData(token, 0, 10, null, `student.id==${studentId}`)
      );
    }
    if (role === 'COMPANY_REPRESENTATIVE') {
      dispatch(
        fetchCompaniesData(token, 0, 10, null, `id==${companyId}`)
      );
    }
    if (role === 'SYS_ADMIN') {
      dispatch(fetchCompaniesData(token, 0, 10));
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Companies | Material Kit </title>
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
            <CompanyListToolbar />
            {role === 'SYS_ADMIN' && (
              <CompanyListResult
                companies={companyData.companies}
                totalElements={companyData.totalQuantity}
              />
            )}
            {role === 'COMPANY_REPRESENTATIVE' && (
              <CompanyRepresentativeView
                companies={companyData.companies}
                totalElements={companyData.totalQuantity}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CompanyList;
