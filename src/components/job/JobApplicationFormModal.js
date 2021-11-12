/* eslint-disable jsx-a11y/label-has-associated-control */
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
  ListItem,
  List,
  //   FormControl,
  //   InputLabel,
  //   Select,
  //   MenuItem
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { uploadAttachment } from 'src/store/attachment-actions';
import { attachmentActions } from 'src/store/attachment-slice';

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

const Input = styled('input')({
  display: 'none',
});

const JobApplicationFormModal = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.account.token);
  const { job, open } = props;
  const account = useSelector((state) => state.account);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [values, setValues] = useState({
    jobId: null,
    experience: '',
    attachments: {}
  });

  useEffect(() => {
    setValues({
      ...values, jobId: job.id, accountId: account.id, name: account.account.name
    });
  }, []);

  useEffect(() => {
    setSelectedFiles({});
  }, [open]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSaveHandler = () => {
    props.onClose('Apply', values, job);
  };

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    dispatch(uploadAttachment(token, { page: 'jobApplication', attachments: event.target.files }));
    dispatch(attachmentActions.setIsLoading({ page: 'jobApplication', isLoading: true }));
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
              subheader={`${job.name} at ${job.company.name}`}
              title="Apply for Job"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid item xs={6}>
                  <TextField
                    disabled
                    fullWidth
                    label="Your name"
                    name="name"
                    required
                    value={account.account.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Major"
                    name="name"
                    required
                    value={account.account.student.major.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={8}
                    minRows={4}
                    label="Experience"
                    name="experience"
                    onChange={handleChange}
                    required
                    value={values.experience}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="contained-button-file">
                    <Input accept="image/*,.doc,.docx,.pdf" id="contained-button-file" multiple type="file" onChange={selectFile} />
                    <Button variant="contained" component="span">
                      Upload related files
                    </Button>
                  </label>
                </Grid>
                <Grid
                  item
                  xs={8}
                >
                  <Box sx={{
                    width: '100%',
                    minHeight: 40,
                    maxHeight: 100,
                    overflow: 'auto',
                    overflowX: 'hidden',
                    backgroundColor: '#fdfdfd',
                    borderRadius: '6px',
                    boxShadow: '0 4px 28px rgba(123,151,158,.25)',
                    border: '1px solid #d6dee1',
                    '&::-webkit-scrollbar': {
                      width: 10,
                    },
                    '&::-webkit-scrollbar-track': {
                      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                      borderRadius: '5px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'darkgrey',
                      outline: '1px solid slategrey',
                      borderRadius: '5px'
                    },
                    '& ul': {
                      padding: 0
                    }
                  }}
                  >
                    <List>
                      {Object.keys(selectedFiles).length === 0 && (<ListItem>No files selected yet.</ListItem>)}
                      {Object.keys(selectedFiles).map((key) => (<ListItem>{selectedFiles[key].name}</ListItem>))}
                    </List>
                  </Box>
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
              <Button color="primary" variant="contained" onClick={() => { onSaveHandler(job); }}>
                Apply
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default JobApplicationFormModal;

JobApplicationFormModal.propTypes = {
  job: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string,
  open: PropTypes.bool,
};
