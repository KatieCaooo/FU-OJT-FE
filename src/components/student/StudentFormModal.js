import {
  Modal,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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

const StudentFormModal = (props) => {
  const { student, type } = props;
  const [values, setValues] = useState({
    name: '',
    studentCode: '',
    semesterId: '',
    email: '',
    address: '',
    phone: '',
    major: ''
  });
  useEffect(() => {
    if (student.name) {
      setValues({
        id: student.id,
        name: student.name,
        studentCode: student.student.studentCode,
        semesterId: student.student.semesterId,
        email: student.email,
        address: student.student.address,
        phone: student.phone,
        major: student.student.major
      });
    }
  }, [student]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
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
                  : 'Information of company to be created.'
              }
              title="Student Information"
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
                    label="Full name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Student code"
                    name="studentCode"
                    onChange={handleChange}
                    value={values.studentCode}
                    disabled
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="SemesterID"
                    name="semesterId"
                    onChange={handleChange}
                    value={values.semesterId}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    required
                    disabled
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <InputLabel id="major-label" sx={{ width: '100%' }}>
                      Major
                    </InputLabel>
                    <Select
                      labelId="major-label"
                      id="major-dropdown"
                      value={values.major}
                      onChange={handleChange}
                      label="major"
                      name="major"
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value="1">
                        Software Engineering
                      </MenuItem>
                      <MenuItem value="2">
                        Business Administration
                      </MenuItem>
                    </Select>
                  </FormControl>
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

export default StudentFormModal;

StudentFormModal.propTypes = {
  student: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string
};
