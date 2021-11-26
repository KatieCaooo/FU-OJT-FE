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
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const SemesterFormModal = (props) => {
  const { semester, type } = props;
  const [values, setValues] = useState({
    name: '',
    startDate: [null, null],
    endDate: [null, null]
  });
  useEffect(() => {
    if (semester.name) {
      setValues({
        id: semester.id,
        name: semester.name,
        startDate: semester.startDate,
        endDate: semester.endDate
      });
    }
  }, [semester]);

  const handleChange = (event, dateValues, fieldName) => {
    if (!event) {
      setValues({
        ...values,
        [fieldName]: dateValues
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  const onSaveHandler = () => {
    props.onClose(type, values);
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
              subheader={
                type === 'UPDATE'
                  ? 'The information can be edited'
                  : 'Information of Semester to be Created'
              }
              title="Semester Information"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {type === 'UPDATE' && (
                  <Grid item md={3} xs={3}>
                    <TextField
                      disabled
                      fullWidth
                      label="Id"
                      name="id"
                      onChange={handleChange}
                      required
                      value={values.id}
                      variant="outlined"
                    />
                  </Grid>
                )}
                <Grid
                  item
                  md={type === 'UPDATE' ? 9 : 12}
                  xs={type === 'UPDATE' ? 9 : 12}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateRangePicker
                    name="startDate"
                    value={values.startDate}
                    minDate={new Date()}
                    inputFormat="dd-MM-yyyy"
                    onChange={(newValue) => {
                      handleChange(null, newValue, 'startDate');
                    }}
                    renderInput={(startProps, endProps) => (
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                      >
                        <TextField
                          sx={{ maxWidth: 125 }}
                          variant="outlined"
                          size="small"
                          {...startProps}
                        />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField
                          sx={{ maxWidth: 125 }}
                          variant="outlined"
                          size="small"
                          {...endProps}
                        />
                      </Grid>
                    )}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateRangePicker
                    name="endDate"
                    value={values.endDate}
                    minDate={new Date()}
                    inputFormat="dd-MM-yyyy"
                    onChange={(newValue) => {
                      handleChange(null, newValue, 'endDate');
                    }}
                    renderInput={(startProps, endProps) => (
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                      >
                        <TextField
                          sx={{ maxWidth: 125 }}
                          variant="outlined"
                          size="small"
                          {...startProps}
                        />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField
                          sx={{ maxWidth: 125 }}
                          variant="outlined"
                          size="small"
                          {...endProps}
                        />
                      </Grid>
                    )}
                  />
                </LocalizationProvider>
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
              <Button
                color="primary"
                variant="contained"
                onClick={onSaveHandler}
              >
                {type === 'UPDATE' ? 'Save details' : 'Create'}
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
  semester: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string
};
