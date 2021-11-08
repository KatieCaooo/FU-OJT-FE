import { Box, Button } from '@material-ui/core';

const SemesterListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Button>Import</Button>
      <Button sx={{ mx: 1 }}>Export</Button>
      <Button color="primary" variant="contained">
        Add New Semester
      </Button>
    </Box>
  </Box>
);

export default SemesterListToolbar;
