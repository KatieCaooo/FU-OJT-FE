import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSemestersData } from 'src/store/semester-actions';
import { useEffect } from 'react';
import SemesterListResult from '../components/semester/SemesterListResult';

const SemesterList = () => {
  const semesterData = useSelector((state) => state.semesters);
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSemestersData(token, 0, 10));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Semesters | Material Kit </title>
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
            <SemesterListResult
              semesters={semesterData.semesters}
              totalElements={semesterData.totalQuantity}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SemesterList;
