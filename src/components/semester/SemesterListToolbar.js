import { Box, Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSemester } from 'src/store/semester-actions';
import SemesterFormModal from './SemesterFormModal';

const SemesterListToolbar = (props) => {
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, sortedBy, search
  } = useSelector((state) => state.semesters.filter);
  const dispatch = useDispatch();
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [inputedSemester, setInputedSemester] = useState({ name: null });
  const handleCreateFormOpen = (event, semester) => {
    setInputedSemester(semester);
    setCreateFormOpen(true);
  };

  const handleCreateFormClose = (type, semester) => {
    if (type === 'CREATE') {
      dispatch(createSemester(token, semester, page, limit, sortedBy, search));
    }
    setCreateFormOpen(false);
  };
  return (
    <Box {...props}>
      <SemesterFormModal semester={inputedSemester} open={createFormOpen} onClose={handleCreateFormClose} type="CREATE" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button>
        <Button color="primary" variant="contained" onClick={(e) => handleCreateFormOpen(e, inputedSemester)}>
          Add New Semester
        </Button>
      </Box>
    </Box>
  );
};

export default SemesterListToolbar;
