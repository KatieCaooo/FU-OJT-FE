import {
  Grid, List, ListItem, ListItemAvatar, Typography, Box, TablePagination, ListSubheader, Button, Divider, Backdrop, CircularProgress
} from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsData } from 'src/store/job-actions';
import { BASE_URL, getRequiredAuthenHeader } from 'src/api/config';
import axios from 'axios';
import { attachmentActions } from 'src/store/attachment-slice';
import JobApplicationFormModal from './JobApplicationFormModal';

const selectedStyle = { direction: 'ltr', backgroundColor: '#f5dbbc', border: '0.1px solid red' };
const notSelectedStyle = { direction: 'ltr' };

const JobStudentView = () => {
  const attachments = useSelector((state) => state.attachment.jobApplication.attachments);

  const isLoading = useSelector((state) => state.attachment.jobApplication.isLoading);
  // console.log(products[0]);
  const dispatch = useDispatch();
  const jobStore = useSelector((state) => state.jobs);
  const token = useSelector((state) => state.account.token);
  const [jobSelectedPos, setJobSelectedPos] = useState(0);

  const currentJob = jobStore.jobs[jobSelectedPos];
  const totalElements = jobStore.totalQuantity;

  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const [applicationFormOpen, setApplicationFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobsData(token, 0, 6));
    setSearch('');
  }, [dispatch]);

  const onJobSlected = (pos) => {
    console.log(pos);
    setJobSelectedPos(pos);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(fetchJobsData(token, newPage, limit, null, search));
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
    dispatch(fetchJobsData(token, 0, event.target.value, null, search));
  };

  const applyJob = (payload) => async () => {
    const url = `${BASE_URL}/applications`;
    const postData = async () => {
      const response = await axios.post(
        url,
        payload,
        {
          headers: getRequiredAuthenHeader(token)
        }
      );

      if (response.status !== 200) {
        throw new Error('Could not post application');
      }

      return response.data;
    };

    try {
      await postData().then(async (applicationRes) => {
        console.log(applicationRes);
        dispatch(attachmentActions.replaceAttachmentList({ attachments: [], page: 'jobApplication' }));
        setApplicationFormOpen(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplicationFormClose = (type, formValues) => {
    if (type === 'Apply') {
      const payload = { jobId: formValues.jobId, attachments, experience: formValues.experience };
      dispatch(applyJob(payload));
    } else {
      setApplicationFormOpen(false);
      dispatch(attachmentActions.replaceAttachmentList({ attachments: [], page: 'jobApplication' }));
    }
  };

  const handleApplicationFormOpen = () => {
    setApplicationFormOpen(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box>
          <List sx={{
            padding: 0,
            direction: 'rtl',
            width: '100%',
            height: 750,
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
          }}
          >
            {jobStore.jobs.map((job, i) => (
              <ListItem
                divider={i < jobStore.jobs.length - 1}
                key={job.id}
                sx={i === jobSelectedPos ? selectedStyle : notSelectedStyle}
                onClick={() => { onJobSlected(i); }}
              >
                <ListItemAvatar>
                  <img
                    alt={job.name}
                    src={job.imageUrl ? job.imageUrl : '/static/images/products/product_1.png'}
                    style={{
                      height: 48,
                      width: 48
                    }}
                  />
                </ListItemAvatar>
                <Box>
                  <Typography variant="h4">
                    {job.name}
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'primary.main' }}>
                    <MonetizationOnOutlinedIcon style={{ verticalAlign: 'middle' }} />
                    {job.salary}
                  </Typography>
                  <List>
                    {job.topReasons.map((reason) => (
                      <ListItem key={uuid()}>
                        <Typography>{reason}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </ListItem>
            ))}
          </List>
          <TablePagination
            component="div"
            count={totalElements}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[6]}
          />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <List sx={{
          padding: 0,
          width: '100%',
          height: 750,
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
        }}
        >
          {currentJob && (
            <>
              <JobApplicationFormModal job={currentJob} open={applicationFormOpen} onClose={handleApplicationFormClose} />
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10000 }}
                open={isLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <ListSubheader sx={{
                borderRadius: '6px 0 0 0',
                boxShadow: '0 4px 28px rgba(123,151,158,.25)',
                border: '1px solid #d6dee1',
              }}
              >
                <Box sx={{ padding: 2 }}>
                  <Typography variant="h2" sx={{ color: 'black' }}>{currentJob.name}</Typography>
                  <Typography variant="h4">{currentJob.company.name}</Typography>
                </Box>
                <Divider />
                <Box sx={{ textAlign: 'center' }}>
                  <Button variant="contained" sx={{ width: '80%' }} onClick={handleApplicationFormOpen}>Apply Now</Button>
                </Box>
              </ListSubheader>
              <Box sx={{ paddingLeft: 4, paddingRight: 4 }}>
                <Box sx={{ paddingTop: 2 }}>
                  <Typography variant="h5" sx={{ color: 'primary.main' }}>
                    <MonetizationOnOutlinedIcon style={{ verticalAlign: 'middle' }} />
                    {currentJob.salary}
                  </Typography>
                  <Typography>
                    <LocationOnIcon style={{ verticalAlign: 'middle' }} />
                    {currentJob.company.address}
                  </Typography>
                </Box>
                <Divider />
                {(currentJob.topReasons && currentJob.topReasons.length > 0) && (
                <>
                  <Box sx={{ paddingTop: 2 }}>
                    <Typography variant="h4">Top 3 Reasons To Join Us</Typography>
                    <List>
                      {currentJob.topReasons.map((reason) => (
                        <ListItem key={uuid()}>
                          <Typography>{reason}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Divider />
                </>
                )}
                {currentJob.description && (
                <>
                  <Box sx={{ paddingTop: 2 }}>
                    <Typography variant="h4">Job Description</Typography>
                    <Typography>{currentJob.description}</Typography>
                  </Box>
                  <Divider />
                </>
                )}
                {currentJob.aboutOurTeam && (
                <>
                  <Box sx={{ paddingTop: 2 }}>
                    <Typography variant="h4">About our team</Typography>
                    <Typography>{currentJob.aboutOurTeam}</Typography>
                  </Box>
                  <Divider />
                </>
                )}
                {(currentJob.responsibilities && currentJob.responsibilities.length > 0) && (
                <>
                  <Box sx={{ paddingTop: 2 }}>
                    <Typography variant="h4">Responsibilities</Typography>
                    <List>
                      {currentJob.responsibilities.map((responsibility) => (
                        <ListItem key={uuid()}>
                          <Typography>{responsibility}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Divider />
                </>
                )}
                {((currentJob.mustHaveSkills && currentJob.mustHaveSkills.length > 0) || (currentJob.niceToHaveSkills && currentJob.niceToHaveSkills > 0)) && (
                <>
                  <Box sx={{ paddingTop: 2 }}>
                    <Typography variant="h4">Your Skills and Experience</Typography>
                    {(currentJob.mustHaveSkills && currentJob.mustHaveSkills.length > 0) && (
                    <Box sx={{ paddingTop: 2 }}>
                      <Typography variant="h5">Must have:</Typography>
                      <List>
                        {currentJob.mustHaveSkills.map((skill) => (
                          <ListItem key={uuid()}>
                            <Typography>{skill}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    )}
                    {(currentJob.niceToHaveSkills && currentJob.niceToHaveSkills.length > 0) && (
                    <Box sx={{ paddingTop: 2 }}>
                      <Typography variant="h5">Nice to have:</Typography>
                      <List>
                        {currentJob.niceToHaveSkills.map((skill) => (
                          <ListItem key={uuid()}>
                            <Typography>{skill}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    )}
                  </Box>
                  <Divider />
                </>
                )}
                {(currentJob.whyYouWillLove || (currentJob.benefits && currentJob.benefits.length > 0)) && (
                <>
                  <Box sx={{ paddingTop: 2 }}>
                    <Typography variant="h4">Why You&apos;ll Love Working Here</Typography>
                    <Typography>{currentJob.whyYouWillLove}</Typography>
                  </Box>
                  {(currentJob.benefits && currentJob.benefits.length > 0) && (
                  <Box sx={{ paddingTop: 2 }}>
                    <Typography variant="h5">Some of our benefits:</Typography>
                    <List>
                      {currentJob.benefits.map((benefit) => (
                        <ListItem key={uuid()}>
                          <Typography>{benefit}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  )}
                </>
                )}
              </Box>
            </>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default JobStudentView;
