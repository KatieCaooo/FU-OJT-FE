import {
  Modal,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent, Typography, InputLabel, Select, MenuItem, FormControl
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
  boxShadow: 24,
  p: 4
};

const ApplicationFormModal = (props) => {
  const { application, type} = props;
  const [values, setValues] = useState({
    studentCode: '',
    major: '',
    experience: '',
    job: '',
    company: '',
    companyAccepted: '',
    studentConfirmed: ''
  });
  useEffect(() => {
    if (application.name) {
      setValues({
        id: application.id,
        studentCode: application.studentCode,
        major: application.major,
        experience: application.experience,
        job: application.job,
        company: application.company,
        companyAccepted: application.companyAccepted,
        studentConfirmed: application.studentConfirmed
      });
    }
  }, [application]);

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

  return(
    <Modal
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form autoComplete="off" noValidate {...props}>
          <Card>
            <CardHeader
              subheader={type === 'UPDATE' ? 'The information can be edited' : 'Information of application to be created.'}
              title="Application Information"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {type === 'UPDATE'
                && (
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
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <TextField
                    fullWidth
                    label="Student Code"
                    name="studentCode"
                    onChange={handleChange}
                    required
                    value={values.studentCode}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <TextField
                    fullWidth
                    label="Major"
                    name="major"
                    onChange={handleChange}
                    required
                    value={values.major}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <TextField
                    fullWidth
                    label="Experience"
                    name="experience"
                    onChange={handleChange}
                    required
                    value={values.experience}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <TextField
                    fullWidth
                    label="Job"
                    name="job"
                    onChange={handleChange}
                    required
                    value={values.job}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    onChange={handleChange}
                    required
                    value={values.company}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Status
                    </InputLabel>
                    <Select
                      labelId="studentConfirm-label"
                      id="studentConfirm-dropdown"
                      value={values.studentConfirmed}
                      onChange={handleChange}
                      label="Status"
                      name="studentConfirm"
                      size="small"
                    >
                      <MenuItem value="Accepted">
                        Accepted
                      </MenuItem>
                      <MenuItem value="Denied">
                        Denied
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Status
                    </InputLabel>
                    <Select
                      labelId="companyAccepted-label"
                      id="companyAccepted-dropdown"
                      value={values.companyAccepted}
                      onChange={handleChange}
                      label="Status"
                      name="companyAccepted"
                      size="small"
                    >
                      <MenuItem value="Accepted">
                        Accepted
                      </MenuItem>
                      <MenuItem value="Denied">
                        Denied
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
              <Button color="primary" variant="contained" onClick={onSaveHandler}>
                {type === 'UPDATE' ? 'Save details' : 'Create'}
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default ApplicationFormModal;

ApplicationFormModal.propTypes = {
  application: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string
};
