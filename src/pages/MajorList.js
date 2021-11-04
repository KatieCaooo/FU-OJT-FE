import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMajorsData } from 'src/store/major-actions';
import { useEffect } from 'react';
import MajorListToolbar from '../components/major/MajorListToolbar';
import MajorListResult from '../components/major/MajorListResult';

const SemesterList = () => {
  const majorData = useSelector((state) => state.majors);
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMajorsData(token, 0, 10));
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
            <MajorListToolbar />
            <MajorListResult
              majors={majorData.majors}
              totalElements={majorData.totalQuantity}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SemesterList;
