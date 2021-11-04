import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompaniesData } from 'src/store/company-actions';
import { useEffect } from 'react';
import CompanyListToolbar from '../components/company/CompanyListToolbar';
import CompanyListResult from '../components/company/CompanyListResult';

const CompanyList = () => {
  const companyData = useSelector((state) => state.companies);
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompaniesData(token, 0, 10));
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
            <CompanyListResult
              companies={companyData.companies}
              totalElements={companyData.totalQuantity}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CompanyList;
