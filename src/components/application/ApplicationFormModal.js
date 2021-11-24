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
import { useSelector } from 'react-redux';

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
  const { application, type } = props;
  const role = useSelector((state) => state.account.role);
  const [values, setValues] = useState({
    studentCode: '',
    major: '',
    experience: '',
    job: '',
    company: '',
    companyAccepted: '',
    studentConfirmed: '',
    schoolDenied: ''
  });
  useEffect(() => {
    if (application.name) {
      setValues({
        id: application.id,
        studentCode: application.student.studentCode,
        major: application.student.major.name,
        experience: application.experience,
        job: application.job.name,
        company: application.job.company.name,
        companyAccepted: application.companyAccepted,
        studentConfirmed: application.studentConfirmed,
        schoolDenied: application.schoolDenied
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                    fullWidth
                    label="Company"
                    name="company"
                    onChange={handleChange}
                    required
                    value={values.company}
                    variant="outlined"
                  />
                </Grid>
                {role === 'STUDENT' && (
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Student Confirmed
                    </InputLabel>
                    <Select
                      labelId="studentConfirm-label"
                      id="studentConfirm-dropdown"
                      value={values.studentConfirmed}
                      onChange={handleChange}
                      label="Status"
                      name="studentConfirmed"
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
                )}
                {role === 'SYS_ADMIN' && (
                  <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                    <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                      <InputLabel id="disabled-label" size="small">
                        School Denied
                      </InputLabel>
                      <Select
                        labelId="schoolDeny-label"
                        id="schoolDeny-dropdown"
                        value={values.schoolDenied}
                        onChange={handleChange}
                        label="Status"
                        name="schoolDenied"
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
                )}
                {role === 'COMPANY_REPRESENTATIVE' && (
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Company Accepted
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
                )}
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
