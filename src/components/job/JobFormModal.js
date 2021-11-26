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
  boxShadow: 24,
  p: 4
};

const JobFormModal = (props) => {
  const { job, type } = props;
  const [values, setValues] = useState({
    name: '',
    title: '',
    salary: '',
    topReasons: [],
    description: '',
    descriptionItems: [],
    aboutOurTeam: '',
    responsibilities: [],
    mustHaveSkills: [],
    niceToHaveSkills: [],
    whyYouWillLove: '',
    benefits: [],
    semesterIds: [],
    major: [],
  });
  useEffect(() => {
    if (job.name) {
      setValues({
        id: job.id,
        name: job.name,
        title: job.title,
        salary: job.salary,
        topReasons: job.topReasons,
        description: job.description,
        descriptionItems: job.descriptionItems,
        aboutOurTeam: job.aboutOurTeam,
        responsibilities: job.responsibilities,
        mustHaveSkills: job.mustHaveSkills,
        niceToHaveSkills: job.niceToHaveSkills,
        whyYouWillLove: job.whyYouWillLove,
        benefits: job.benefits,
        semesterIds: job.semesterIds,
        major: job.major,
      });
    }
  }, [job]);

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
                  : 'Information of job to be created.'
              }
              title="Job Information"
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
                    label="Job Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    onChange={handleChange}
                    required
                    value={values.title}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    onChange={handleChange}
                    required
                    value={values.salary}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="TopReasons"
                    name="topReasons"
                    onChange={handleChange}
                    required
                    value={values.topReasons}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    required
                    value={values.description}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="DescriptionItems"
                    name="descriptionItems"
                    onChange={handleChange}
                    required
                    value={values.descriptionItems}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="About Our Team"
                    name="aboutOurTeam"
                    onChange={handleChange}
                    required
                    value={values.aboutOurTeam}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Responsibilities"
                    name="responsibilities"
                    onChange={handleChange}
                    required
                    value={values.responsibilities}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Must Have Skills"
                    name="mustHaveSkills"
                    onChange={handleChange}
                    required
                    value={values.mustHaveSkills}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Nice to Have Skills"
                    name="niceToHaveSkills"
                    onChange={handleChange}
                    required
                    value={values.niceToHaveSkills}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Why you will love"
                    name="whyYouWillLove"
                    onChange={handleChange}
                    required
                    value={values.whyYouWillLove}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Benefits"
                    name="benefits"
                    onChange={handleChange}
                    required
                    value={values.benefits}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="SemesterId"
                    name="semesterIds"
                    onChange={handleChange}
                    required
                    value={values.semesterIds}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="MajorId"
                    name="majorId"
                    onChange={handleChange}
                    required
                    value={values.major}
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

export default JobFormModal;

JobFormModal.propTypes = {
  job: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string
};
