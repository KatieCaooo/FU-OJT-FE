import { Box, Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvaluation } from 'src/store/evaluation-actions';
import EvaluationFormModal from './EvaluationFormModal';

const EvaluationListToolbar = (props) => {
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, sortedBy, search
  } = useSelector((state) => state.evaluations.filter);
  const dispatch = useDispatch();
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [inputedEvaluation, setInputedEvaluation] = useState({ name: null });
  const handleCreateFormOpen = (event, evaluation) => {
    setInputedEvaluation(evaluation);
    setCreateFormOpen(true);
  };

  const handleCreateFormClose = (type, evaluation) => {
    if (type === 'CREATE') {
      dispatch(createEvaluation(token, evaluation, page, limit, sortedBy, search));
    }
    setCreateFormOpen(false);
  };
  return (
    <Box {...props}>
      <EvaluationFormModal evaluation={inputedEvaluation} open={createFormOpen} onClose={handleCreateFormClose} type="CREATE" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '29px'
        }}
      >
        <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button>
        <Button color="primary" variant="contained" onClick={(e) => handleCreateFormOpen(e, inputedEvaluation)}>
          Add New Evaluation
        </Button>
      </Box>
    </Box>
  );
};

export default EvaluationListToolbar;
