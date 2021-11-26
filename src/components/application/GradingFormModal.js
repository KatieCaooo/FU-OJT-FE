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
  MenuItem,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

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

const GradingFormModal = (props) => {
  const { application, type } = props;
  //   const role = useSelector((state) => state.account.role);
  const [values, setValues] = useState({
    applicationId: '',
    comment: '',
    grade: '',
    pass: '',
  });

  useEffect(() => {
    if (application.id) {
      const newValues = {
        ...values,
        applicationId: application.id,
      };
      if (parseInt(newValues.grade, 10) > 10) {
        newValues.grade = 10;
      }
      if (parseInt(newValues.grade, 10) < 0) {
        newValues.grade = 0;
      }
      newValues.grade = parseInt(newValues.grade, 10).toString();
      setValues(newValues);
    }
  }, [application]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };
    if (parseInt(newValues.grade, 10) > 10) {
      newValues.grade = 10;
    }
    if (parseInt(newValues.grade, 10) < 0) {
      newValues.grade = 0;
    }
    newValues.grade = parseInt(newValues.grade, 10).toString();
    setValues(newValues);
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
              subheader="Information of application evaluation to be created."
              title="Application Evaluation"
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
                <Grid item md={3} xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Application ID"
                    name="applicationId"
                    onChange={handleChange}
                    required
                    value={values.applicationId}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={9} xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Job"
                    name="job"
                    onChange={handleChange}
                    required
                    value={application.job}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Student Code"
                    name="studentCode"
                    onChange={handleChange}
                    required
                    value={application.studentCode}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Student Name"
                    name="studentName"
                    onChange={handleChange}
                    required
                    value={application.account ? application.account.name : ''}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Major"
                    name="major"
                    onChange={handleChange}
                    required
                    value={application.major}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Student Email"
                    name="studentEmail"
                    onChange={handleChange}
                    required
                    value={application.account ? application.account.email : ''}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    label="Grade"
                    name="grade"
                    onChange={handleChange}
                    required
                    value={values.grade}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <InputLabel id="disabled-label" size="small" sx={{ width: '100%' }}>
                      Is Passed?
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="outlined"
                      labelId="schoolDeny-label"
                      id="schoolDeny-dropdown"
                      value={values.schoolDenied}
                      onChange={handleChange}
                      label="Status"
                      name="pass"
                      size="medium"
                    >
                      <MenuItem value="Passed">
                        Passed
                      </MenuItem>
                      <MenuItem value="Not Passed">
                        Not Passed
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={8}
                    minRows={4}
                    label="Comments"
                    name="comment"
                    onChange={handleChange}
                    required
                    value={values.comment}
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

export default GradingFormModal;

GradingFormModal.propTypes = {
  application: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string
};
