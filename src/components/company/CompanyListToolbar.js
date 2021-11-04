import { Box, Button } from '@material-ui/core';

const CompanyListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '29px'
      }}
    >
      <Button>Import</Button>
      <Button sx={{ mx: 1 }}>Export</Button>
      <Button color="primary" variant="contained">
        Add New Company
      </Button>
    </Box>
  </Box>
);

export default CompanyListToolbar;
