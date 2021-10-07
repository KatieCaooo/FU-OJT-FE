import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';

const Account = () => {
  const account = useSelector((state) => state.account);

  const getRole = (role) => {
    switch (role) {
      case 'SYS_ADMIN':
        return 'Admin';
      case 'STUDENT':
        return 'Student';
      case 'COMPANY_REPRESENTATIVE':
        return 'Company Representative';
      default:
        return 'None';
    }
  };

  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    phone: account.account.phone,
    jobTitle: getRole(account.role),
    name: account.account.name,
  };

  return (
    <>
      <Helmet>
        <title>Account | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile user={user} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails user={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
