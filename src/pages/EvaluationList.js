import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvaluationData } from 'src/store/evaluation-actions';
import { useEffect } from 'react';
import EvaluationListToolbar from '../components/evaluation/EvaluationListToolbar';
import EvaluationListResult from '../components/evaluation/EvaluationListResult';

const EvaluationsList = () => {
  const evaluationsData = useSelector((state) => state.evaluations);
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvaluationData(token, 0, 10));
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
            <EvaluationListToolbar />
            <EvaluationListResult
              evaluations={evaluationsData.evaluations}
              totalElements={evaluationsData.totalQuantity}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EvaluationsList;
