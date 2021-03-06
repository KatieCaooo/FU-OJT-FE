import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox, Fab,
  // Fab,
  FormControl,
  // Grid,
  InputLabel,
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
// import { BASE_URL, getRequiredAuthenHeader } from 'src/api/config';
// import axios from 'axios';
import { fetchApplicationData, updateApplication, deleteApplication } from '../../store/application-actions';
import { applicationActions } from '../../store/application-slice';
import ApplicationFormModal from './ApplicationFormModal';
import getInitials from '../../utils/getInitials';
import ApplicationDeletionConfirmModal from './ApplicationDeletionConfirmModal';
// import { evaluationActions } from '../../store/evaluation-slice';

const applicationListResult = ({ applications, totalElements, ...rest }) => {
  const role = useSelector((state) => state.account.role);
  const studentId = role === 'STUDENT' ? useSelector((state) => state.account.account.student.id) : null;
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, order, orderBy, sortedBy, search
  } = useSelector((state) => state.applications.filter);
  const dispatch = useDispatch();
  const [selectedApplicationIds, setSelectedApplicationIds] = useState([]);
  const [currentApplication, setCurrentApplication] = useState({});
  // const [evaluationFormOpen, setEvaluationFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const handleUpdateFormOpen = (event, selectedApplication) => {
    setUpdateFormOpen(true);
    setCurrentApplication(selectedApplication);
  };

  const handleUpdateFormClose = (type, application) => {
    const tmpSearch = role === 'STUDENT' ? `${search}student.id==${studentId}` : search;
    if (type === 'UPDATE') {
      dispatch(updateApplication(token, application, page, limit, sortedBy, tmpSearch));
    }
    setUpdateFormOpen(false);
  };

  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const handleDeleteFormOpen = (event, selectedApplication) => {
    setDeleteFormOpen(true);
    setCurrentApplication(selectedApplication);
  };

  const handleDeleteFormClose = (type, application) => {
    const tmpSearch = role === 'STUDENT' ? `${search}student.id==${studentId}` : search;
    if (type === 'DELETE') {
      dispatch(deleteApplication(token, application, page, limit, sortedBy, tmpSearch));
    }
    setDeleteFormOpen(false);
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
    major: '',
    application: '',
    experience: '',
    job: '',
    company: '',
    companyAccepted: '',
    studentConfirmed: '',
    schoolDenied: '',
    acceptedAt: ''
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

  // const createEvaluation = (payload) => async () => {
  //   const url = `${BASE_URL}/evaluations`;
  //   const postData = async () => {
  //     const response = await axios.post(
  //       url,
  //       payload,
  //       {
  //         headers: getRequiredAuthenHeader(token)
  //       }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error('Could not create evaluation');
  //     }

  //     return response.data;
  //   };

  //   try {
  //     await postData().then(async (evaluationRes) => {
  //       console.log(evaluationRes);
  //       dispatch(evaluationActions.replaceEvaluationList({ evaluation: '', page: 'evaluation' }));
  //       setEvaluationFormOpen(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleEvaluationFormClose = (type, formValues) => {
  //   if (type == 'Create') {
  //     const payload = {
  //       comment: formValues.comment,
  //       grade: formValues.grade,
  //       applicationId: formValues.applicationId,
  //       pass: formValues.pass === 'Passed'
  //     };
  //   } else {
  //     setEvaluationFormOpen(false);
  //     dispatch(evaluationActions.replaceEvaluationList({ evaluation: '', page: 'evaluation' }));
  //   }
  // };

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
      label: 'Company',
      search: 'company',
      sort: 'company',
      align: 'center'
    },
    {
      name: 'Student Confirmed',
      label: 'Student Confirmed',
      search: 'studentConfirmed',
      sort: 'studentConfirmed',
      align: 'center'
    },
    {
      name: 'School Denied',
      label: 'School Denied',
      search: 'schoolDenied',
      sort: 'schoolDenied',
      align: 'center'
    },
    {
      name: 'Company Accepted',
      label: 'Company Accepted',
      search: 'companyAccepted',
      sort: 'companyAccepted',
      align: 'center'
    }
  ];

  return (
    <Card {...rest}>
      <ApplicationFormModal
        application={currentApplication}
        open={updateFormOpen}
        onClose={handleUpdateFormClose}
        type="UPDATE"
      />
      <ApplicationDeletionConfirmModal
        application={currentApplication}
        open={deleteFormOpen}
        onClose={handleDeleteFormClose}
        operation="DELETE"
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
                <TableCell sx={{ width: 300 }}>
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
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    onChange={handleFilterChange}
                    value={values.company}
                    variant="outlined"
                    size="small"
                  />
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
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
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
                      name="schoolDenied"
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
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
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
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
                  <TableCell sx={{ maxWidth: 405 }}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar src={application.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(application.major)}
                      </Avatar>
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
                    <Typography color="textPrimary">
                      {application.company}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography
                      color={textColor(application.confirmedAt, application.studentConfirmed)}
                      variant="button"
                    >
                      {isAccepted(application.confirmedAt, application.studentConfirmed)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color={application.schoolDenied ? 'error.main' : 'success.main'} variant="button">
                      {application.schoolDenied ? 'Denied' : 'Accepted'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color={textColor(application.acceptedAt, application.companyAccepted)} variant="button">
                      {isAccepted(application.acceptedAt, application.companyAccepted)}
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
                        backgroundColor: 'error.main',
                        '&:hover': {
                          cursor: 'pointer',
                          backgroundColor: 'error.dark'
                        }
                      }}
                      arial-label="remove"
                      size="small"
                      onClick={(e) => handleDeleteFormOpen(e, application)}
                    >
                      <DeleteForeverIcon />
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

applicationListResult.propTypes = {
  applications: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default applicationListResult;
