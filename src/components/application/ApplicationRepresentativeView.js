import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Checkbox, Fab,
  // Fab,
  FormControl,
  // Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from '@material-ui/core';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import GradingIcon from '@mui/icons-material/Grading';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, getRequiredAuthenHeader } from 'src/api/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchApplicationData, updateApplication } from '../../store/application-actions';
import { applicationActions } from '../../store/application-slice';
import ApplicationFormModal from './ApplicationFormModal';
import GradingFormModal from './GradingFormModal';

const ApplicationRepresentativeView = ({ applications, totalElements, ...rest }) => {
  const navigate = useNavigate();
  const companyId = useSelector((state) => state.account.account.company.id);

  const token = useSelector((state) => state.account.token);
  const {
    limit, page, order, orderBy, sortedBy, search
  } = useSelector((state) => state.applications.filter);
  const dispatch = useDispatch();
  const [selectedApplicationIds, setSelectedApplicationIds] = useState([]);
  const [currentApplication, setCurrentApplication] = useState({});

  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const handleUpdateFormOpen = (event, selectedApplication) => {
    setUpdateFormOpen(true);
    setCurrentApplication(selectedApplication);
  };

  const handleUpdateFormClose = (type, application) => {
    if (type === 'UPDATE') {
      dispatch(updateApplication(token, application, page, limit, sortedBy, search));
    }
    setUpdateFormOpen(false);
  };

  const [gradingFormOpen, setGradingFormOpen] = useState(false);
  const handleGradingFormOpen = (event, selectedApplication) => {
    setGradingFormOpen(true);
    setCurrentApplication(selectedApplication);
  };

  const evaluateApplication = (payload) => async () => {
    const url = `${BASE_URL}/evaluations`;
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
        setGradingFormOpen(false);
        navigate('../evaluations', { replace: false });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGradingFormClose = (type, evaluation) => {
    if (type === 'EVALUATE') {
      const payload = {
        ...evaluation, pass: evaluation.pass === 'Passed', grade: parseInt(evaluation.grade, 10), applicationId: parseInt(evaluation.applicationId, 10)
      };
      dispatch(evaluateApplication(payload));
    } else {
      setGradingFormOpen(false);
    }
  };

  const handleRequestSort = (event, property, sortField) => {
    const isSameProperty = orderBy === property;
    const isOldAsc = order === 'asc';
    const isAsc = isSameProperty && isOldAsc;
    const isSetDefault = isSameProperty && !isOldAsc;
    const orderValue = isAsc ? 'desc' : 'asc';
    const orderByValue = !isSetDefault ? property : 'id';
    dispatch(applicationActions.setOrder(orderValue));
    dispatch(applicationActions.setOrderBy(orderByValue));
    dispatch(applicationActions.setSortedBy(`${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`));
    dispatch(
      fetchApplicationData(
        token,
        page,
        limit,
        `${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`,
        search
      )
    );
  };

  const onRequestSortHandler = (property, sortField) => (event) => {
    handleRequestSort(event, property, sortField);
  };

  const [values, setValues] = useState({
    studentCode: '',
    application: '',
    experience: '',
    job: '',
    company: '',
    companyAccepted: '',
    studentConfirmed: '',
    schoolDenied: '',
    major: ''
  });

  const handleFilterChange = (event, dateValues, fieldName) => {
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

  const onFilterHandler = () => {
    const studentCodeFilter = `student.studentCode=='*${values.studentCode}*'`;
    const majorFilter = `student.major.name=='*${values.major}*'`;
    const jobFilter = `job.name=='*${values.job}*'`;
    const companyFilter = `job.company.name=='*${values.company}*'`;
    const companyStatusFilter = `isCompanyAccepted==${values.companyAccepted === 'Accepted' ? 'True' : 'False'}`;
    const studentStatusFilter = `isStudentConfirmed==${values.studentConfirmed === 'Accepted' ? 'True' : 'False'}`;
    const schoolDeniedFilter = `isSchoolDenied==${values.schoolDenied === 'Denied' ? 'True' : 'False'}`;
    const filter = [];
    filter.push(`job.company.id==${companyId}`);
    if (values.studentCode !== '') {
      filter.push(studentCodeFilter);
    }
    if (values.major !== '') {
      filter.push(majorFilter);
    }
    if (values.job !== '') {
      filter.push(jobFilter);
    }
    if (values.company !== '') {
      filter.push(companyFilter);
    }
    if (values.companyAccepted !== '') {
      filter.push(companyStatusFilter);
    }
    if (values.studentConfirmed !== '') {
      filter.push(studentStatusFilter);
    }
    if (values.schoolDenied !== '') {
      filter.push(schoolDeniedFilter);
    }
    dispatch(applicationActions.setSearch(filter.join(';')));
    dispatch(applicationActions.setPage(0));
    dispatch(fetchApplicationData(token, 0, limit, sortedBy, filter.join(';')));
  };

  const handleSelectAll = (event) => {
    let newSelectedApplicationIds;

    if (event.target.checked) {
      newSelectedApplicationIds = applications.map((application) => application.id);
    } else {
      newSelectedApplicationIds = [];
    }

    setSelectedApplicationIds(newSelectedApplicationIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedApplicationIds.indexOf(id);
    let newSelectedApplicationIds = [];

    if (selectedIndex === -1) {
      newSelectedApplicationIds = newSelectedApplicationIds.concat(
        selectedApplicationIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedApplicationIds = newSelectedApplicationIds.concat(
        selectedApplicationIds.slice(1)
      );
    } else if (selectedIndex === selectedApplicationIds.length - 1) {
      newSelectedApplicationIds = newSelectedApplicationIds.concat(
        selectedApplicationIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedApplicationIds = newSelectedApplicationIds.concat(
        selectedApplicationIds.slice(0, selectedIndex),
        selectedApplicationIds.slice(selectedIndex + 1)
      );
    }
    setSelectedApplicationIds(newSelectedApplicationIds);
  };

  const handleLimitChange = (event) => {
    dispatch(applicationActions.setLimit(event.target.value));
    dispatch(applicationActions.setPage(0));
    dispatch(fetchApplicationData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(applicationActions.setPage(newPage));
    dispatch(fetchApplicationData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Student Code',
      label: 'Student Code',
      search: 'studentCode',
      sort: 'studentCode',
      align: 'center'
    },
    {
      name: 'Major',
      label: 'Major',
      search: 'major',
      sort: 'major',
      align: 'center'
    },
    {
      name: 'Job',
      label: 'Job',
      search: 'job',
      sort: 'job',
      align: 'left'
    },
    {
      name: 'Company',
      label: 'Attachments',
      search: 'company',
      sort: 'company',
      align: 'center'
    },
    {
      name: 'Student Confirmed',
      label: 'Student Confirmed',
      search: 'isStudentConfirmed',
      sort: 'isStudentConfirmed',
      align: 'center'
    },
    {
      name: 'Company Accepted',
      label: 'Company Accepted',
      search: 'companyAccepted',
      sort: 'companyAccepted',
      align: 'center'
    },
    {
      name: 'School Denied',
      label: 'School Denied',
      search: 'schoolDenied',
      sort: 'schoolDenied',
      align: 'center'
    }
  ];

  const isAccepted = (time, status) => {
    if (!time) {
      return 'Not yet';
    }
    return status ? 'Accepted' : 'Denied';
  };

  const textColor = (time, status) => {
    if (!time) {
      return 'primary.main';
    }
    return status ? 'success.main' : 'error.main';
  };

  return (
    <Card {...rest}>
      <ApplicationFormModal
        application={currentApplication}
        open={updateFormOpen}
        onClose={handleUpdateFormClose}
        type="UPDATE"
      />
      <GradingFormModal
        application={currentApplication}
        open={gradingFormOpen}
        onClose={handleGradingFormClose}
        type="EVALUATE"
      />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                {headerCells.map((headerCell) => (
                  <TableCell key={headerCell.name} align={headerCell.align} margin="inherit">
                    <TableSortLabel
                      active={orderBy === headerCell.name}
                      direction={orderBy === headerCell.name ? order : 'asc'}
                      onClick={onRequestSortHandler(
                        headerCell.name,
                        headerCell.sort
                      )}
                    >
                      {headerCell.label}
                      {orderBy === headerCell.name ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedApplicationIds.length === applications.length}
                    color="primary"
                    indeterminate={
                      selectedApplicationIds.length > 0
                      && selectedApplicationIds.length < applications.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ width: 170 }}>
                  <TextField
                    fullWidth
                    label="Student Code"
                    name="studentCode"
                    onChange={handleFilterChange}
                    value={values.studentCode}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ width: 300 }}>
                  <TextField
                    fullWidth
                    label="Major"
                    name="major"
                    onChange={handleFilterChange}
                    value={values.major}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ width: 300 }}>
                  <TextField
                    fullWidth
                    label="Job"
                    name="job"
                    onChange={handleFilterChange}
                    value={values.job}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ width: 300 }}>
                  {/* <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    onChange={handleFilterChange}
                    value={values.company}
                    variant="outlined"
                    size="small"
                  /> */}
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }} align="center">
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Status
                    </InputLabel>
                    <Select
                      labelId="studentConfirm-label"
                      id="studentConfirm-dropdown"
                      value={values.studentConfirmed}
                      onChange={handleFilterChange}
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
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }} align="center">
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Status
                    </InputLabel>
                    <Select
                      labelId="schoolDeny-label"
                      id="schoolDeny-dropdown"
                      value={values.schoolDenied}
                      onChange={handleFilterChange}
                      label="Status"
                      name="schoolDeny"
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
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Status
                    </InputLabel>
                    <Select
                      labelId="companyAccepted-label"
                      id="companyAccepted-dropdown"
                      value={values.companyAccepted}
                      onChange={handleFilterChange}
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
                </TableCell>
                <TableCell colSpan={2} align="center">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={onFilterHandler}
                  >
                    Apply Filter
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.slice(0, limit).map((application) => (
                <TableRow
                  hover
                  key={application.id}
                  selected={selectedApplicationIds.indexOf(application.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedApplicationIds.indexOf(application.id) !== -1}
                      onChange={(event) => handleSelectOne(event, application.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 170 }}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography color="textPrimary">
                        {application.studentCode}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color="textPrimary">
                      {application.major}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color='"textPrimary'>
                      {application.job}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <List>
                      {application.attachments.map((attachment) => (<ListItem><a href={`${BASE_URL}/storage/${attachment.key}`}>{attachment.name}</a></ListItem>))}
                    </List>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color={textColor(application.confirmedAt, application.studentConfirmed)} variant="button">
                      {isAccepted(application.confirmedAt, application.studentConfirmed)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color={textColor(application.acceptedAt, application.companyAccepted)} variant="button">
                      {isAccepted(application.acceptedAt, application.companyAccepted)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color={application.schoolDenied ? 'error.main' : 'success.main'} variant="button">
                      {application.schoolDenied ? 'Denied' : 'Accepted'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleUpdateFormOpen(e, application)}
                    >
                      <EditIcon />
                    </Fab>
                  </TableCell>
                  <TableCell align="left">
                    <Fab
                      color="error"
                      sx={{
                        color: 'white',
                        backgroundColor: 'success.main',
                        '&:hover': {
                          cursor: 'pointer',
                          backgroundColor: 'success.dark'
                        }
                      }}
                      arial-label="remove"
                      size="small"
                      onClick={(e) => handleGradingFormOpen(e, application)}
                    >
                      <GradingIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalElements}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 30]}
      />
    </Card>
  );
};

ApplicationRepresentativeView.propTypes = {
  applications: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default ApplicationRepresentativeView;
