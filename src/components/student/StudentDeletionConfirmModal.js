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
  Typography
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
  boxShadow: 24
};

const StudentDeletionConfirmModal = (props) => {
  const { student, operation } = props;
  const [values, setValues] = useState({
    name: ''
  });
  useEffect(() => {
    if (student.name) {
      setValues({
        id: student.id,
        name: student.name,
        studentCode: student.studentCode,
        email: student.email,
        address: student.address,
        phone: student.phone,
        major: student.major,
      });
    }
  }, [student]);

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
          sx={{
            backgroundColor:
              operation === 'DELETE' ? 'error.light' : 'success.main',
            color: 'white'
          }}
          title={
            operation === 'DELETE'
              ? 'Archive confirmation'
              : 'Recovery confirmation'
          }
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
                color={operation === 'DELETE' ? 'error' : 'success'}
                sx={{
                  color: 'white',
                  backgroundColor:
                    operation === 'DELETE' ? 'error.main' : 'success.main',
                  '&:hover': {
                    cursor: 'default',
                    backgroundColor:
                      operation === 'DELETE' ? 'error.main' : 'success.main'
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
                {operation === 'DELETE' && 'Are you sure you want to archive this major?'}
                {operation === 'RECOVER' && 'Are you sure you want to recover this major?'}
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
          <Grid container spacing={2} justifyContent="right">
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => onSaveHandler(e, 'CANCEL')}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                color={operation === 'DELETE' ? 'error' : 'success'}
                variant="contained"
                onClick={(e) => onSaveHandler(e, operation)}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Modal>
  );
};

export default StudentDeletionConfirmModal;

StudentDeletionConfirmModal.propTypes = {
  student: PropTypes.object,
  onClose: PropTypes.func,
  operation: PropTypes.string
};
