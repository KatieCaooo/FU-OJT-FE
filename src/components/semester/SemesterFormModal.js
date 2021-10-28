import {
  Modal,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent
  //   FormControl,
  //   InputLabel,
  //   Select,
  //   MenuItem
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const SemesterFormModal = (props) => {
  const { account } = props;
  console.log(account);
  const [values, setValues] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });
  useEffect(() => {
    if (account.name) {
      setValues({
        name: account.name,
        startDate: account.startDate,
        endDate: account.endDate,
      });
    }
  }, [account]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  return (
    <Modal
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form autoComplete="off" noValidate {...props}>
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Semester Information"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="Semester Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    name="startDate"
                    onChange={handleChange}
                    required
                    value={values.startDate}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="End Date"
                    name="endDate"
                    onChange={handleChange}
                    required
                    value={values.endDate}
                    variant="outlined"
                  />
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
              <Button color="primary" variant="contained">
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default SemesterFormModal;

SemesterFormModal.propTypes = {
  account: PropTypes.object
};
