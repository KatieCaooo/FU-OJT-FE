import { Box, Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMajor } from 'src/store/major-actions';
import MajorFormModal from './MajorFormModal';

const MajorlistToolbar = (props) => {
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, sortedBy, search
  } = useSelector((state) => state.majors.filter);
  const dispatch = useDispatch();
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [inputedMajor, setInputedMajor] = useState({ name: null });
  const handleCreateFormOpen = (event, major) => {
    setInputedMajor(major);
    setCreateFormOpen(true);
  };

  const handleCreateFormClose = (type, major) => {
    if (type === 'CREATE') {
      dispatch(createMajor(token, major, page, limit, sortedBy, search));
    }
    setCreateFormOpen(false);
  };
  return (
    <Box {...props}>
      <MajorFormModal major={inputedMajor} open={createFormOpen} onClose={handleCreateFormClose} type="CREATE" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '29px'
        }}
      >
        <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button>
        <Button color="primary" variant="contained" onClick={(e) => handleCreateFormOpen(e, inputedMajor)}>
          Add New Major
        </Button>
      </Box>
    </Box>
  );
};

export default MajorlistToolbar;
