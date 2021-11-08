import {
  Modal,
  Box,
  Button,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Fab,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const MajorDeletionConfirmModal = (props) => {
  const { major, operation } = props;
  const [values, setValues] = useState({
    name: ''
  });
  useEffect(() => {
    if (major.name) {
      setValues({
        id: major.id,
        name: major.name
      });
    }
  }, [major]);

  const onSaveHandler = (event, type) => {
    props.onClose(type, values);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <CardHeader
          sx={{ backgroundColor: 'error.light', color: 'white' }}
          title="Archive confirmation"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sx={2}>
              <Fab
                color="error"
                sx={{
                  color: 'white',
                  backgroundColor: 'error.main',
                  '&:hover': {
                    cursor: 'default',
                    backgroundColor: 'error.main'
                  }
                }}
                arial-label="remove"
                size="large"
              >
                <WarningAmberIcon fontSize="large" />
              </Fab>
            </Grid>
            <Grid item sx={10}>
              <Typography>
                Are you sure you want to archive this major?
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="right"
          >
            <Grid item>
              <Button color="primary" variant="contained" onClick={(e) => onSaveHandler(e, 'CANCEL')}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button color="error" variant="contained" onClick={(e) => onSaveHandler(e, operation)}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Modal>
  );
};

export default MajorDeletionConfirmModal;

MajorDeletionConfirmModal.propTypes = {
  major: PropTypes.object,
  onClose: PropTypes.func,
  operation: PropTypes.string,
};
