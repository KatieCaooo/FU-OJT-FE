import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentListResults from '../components/customer/StudentListResults';
import StudentListToolbar from '../components/customer/StudentListToolbar';
import customers from '../__mocks__/customers';

const StudentList = () => (
  <>
    <Helmet>
      <title>Students | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <StudentListToolbar />
        <Box sx={{ pt: 3 }}>
          <StudentListResults students={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default StudentList;
