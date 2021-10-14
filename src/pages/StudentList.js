import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchStudentsData } from 'src/store/student-actions';
import StudentListResults from '../components/student/StudentListResults';
// import StudentListToolbar from '../components/customer/StudentListToolbar';
// import { useEffect } from 'react';
// import customers from '../__mocks__/customers';

const StudentList = () => {
  const studentData = useSelector((state) => state.students);
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentsData(token, 0, 10));
  }, [dispatch]);
  return (
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
          {/* <StudentListToolbar /> */}
          <Box sx={{ pt: 3 }}>
            <StudentListResults students={studentData.students} totalElements={studentData.totalQuantity} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default StudentList;
