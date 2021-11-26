import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Fab,
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
import { fetchJobsData, updateJob, deleteJob } from 'src/store/job-actions';
import { jobActions } from '../../store/job-silce';
import getInitials from '../../utils/getInitials';
import JobFormModal from './JobFormModal';
import JobDeletionConfirmModal from './JobDeletionConfirmModal';

const JobListResult = ({ jobs, totalElements, ...rest }) => {
  const companyId = useSelector((state) => state.account.account.company.id);
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, order, orderBy, sortedBy, search
  } = useSelector((state) => state.jobs.filter);
  const dispatch = useDispatch();
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [currentJob, setCurrentJob] = useState({});
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const handleUpdateFormOpen = (event, selectedJob) => {
    setUpdateFormOpen(true);
    setCurrentJob(selectedJob);
  };

  const handleUpdateFormClose = (type, job) => {
    if (type === 'UPDATE') {
      dispatch(updateJob(token, job, page, limit, sortedBy, search));
    }
    setUpdateFormOpen(false);
  };
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const handleDeleteFormOpen = (event, selectedJob) => {
    setDeleteFormOpen(true);
    setCurrentJob(selectedJob);
  };

  const handleDeleteFormClose = (type, job) => {
    if (type === 'DELETE') {
      dispatch(deleteJob(token, job, page, limit, sortedBy, search));
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
    dispatch(jobActions.setOrder(orderValue));
    dispatch(jobActions.setOrderBy(orderByValue));
    dispatch(jobActions.setSortedBy(`${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`));
    dispatch(
      fetchJobsData(
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
    name: '',
    title: '',
    salary: '',
    description: '',
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
    const nameFilter = `name=='*${values.name}*'`;
    const titleFilter = `title=='*${values.title}*'`;
    const salaryFilter = `salary=='*${values.salary}*'`;
    const descriptionFilter = `description=='*${values.description}*'`;
    const filter = [];
    filter.push(`company.id==${companyId}`);
    if (values.name !== '') {
      filter.push(nameFilter);
    }
    if (values.title !== '') {
      filter.push(titleFilter);
    }
    if (values.salary !== '') {
      filter.push(salaryFilter);
    }
    if (values.description !== '') {
      filter.push(descriptionFilter);
    }
    dispatch(jobActions.setSearch(filter.join(';')));
    dispatch(jobActions.setPage(0));
    dispatch(fetchJobsData(token, 0, limit, sortedBy, filter.join(';')));
  };

  const handleSelectAll = (event) => {
    let newSelectedJobIds;

    if (event.target.checked) {
      newSelectedJobIds = jobs.map((job) => job.id);
    } else {
      newSelectedJobIds = [];
    }

    setSelectedJobIds(newSelectedJobIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedJobIds.indexOf(id);
    let newSelectedJobIds = [];

    if (selectedIndex === -1) {
      newSelectedJobIds = newSelectedJobIds.concat(
        selectedJobIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedJobIds = newSelectedJobIds.concat(
        selectedJobIds.slice(1)
      );
    } else if (selectedIndex === selectedJobIds.length - 1) {
      newSelectedJobIds = newSelectedJobIds.concat(
        selectedJobIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedJobIds = newSelectedJobIds.concat(
        selectedJobIds.slice(0, selectedIndex),
        selectedJobIds.slice(selectedIndex + 1)
      );
    }
    setSelectedJobIds(newSelectedJobIds);
  };

  const handleLimitChange = (event) => {
    dispatch(jobActions.setLimit(event.target.value));
    dispatch(jobActions.setPage(0));
    dispatch(fetchJobsData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(jobActions.setPage(newPage));
    dispatch(fetchJobsData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Job Name',
      label: 'Job Name',
      search: 'name',
      sort: 'name',
      align: 'left'
    },
    {
      name: 'Title',
      label: 'Title',
      search: 'title',
      sort: 'title',
      align: 'center'
    },
    {
      name: 'Salary',
      label: 'Salary',
      search: 'salary',
      sort: 'salary',
      align: 'center'
    },
    {
      name: 'Description',
      label: 'Description',
      search: 'description',
      sort: 'description',
      align: 'center'
    },
  ];

  return (
    <Card {...rest}>
      <JobFormModal job={currentJob} open={updateFormOpen} onClose={handleUpdateFormClose} type="UPDATE" />
      <JobDeletionConfirmModal job={currentJob} open={deleteFormOpen} onClose={handleDeleteFormClose} operation="DELETE" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                {headerCells.map((headerCell) => (
                  <TableCell key={headerCell.name} align={headerCell.align}>
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
                    checked={selectedJobIds.length === jobs.length}
                    color="primary"
                    indeterminate={
                      selectedJobIds.length > 0
                      && selectedJobIds.length < jobs.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <TextField
                    fullWidth
                    label="Job Name"
                    name="name"
                    onChange={handleFilterChange}
                    value={values.name}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 100 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    onChange={handleFilterChange}
                    value={values.title}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 100 }}>
                  <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    onChange={handleFilterChange}
                    value={values.salary}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 150 }}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onChange={handleFilterChange}
                    value={values.description}
                    variant="outlined"
                    size="small"
                  />
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
              {jobs.slice(0, limit).map((job) => (
                <TableRow
                  hover
                  key={job.id}
                  selected={selectedJobIds.indexOf(job.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedJobIds.indexOf(job.id) !== -1}
                      onChange={(event) => handleSelectOne(event, job.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar src={job.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(job.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {job.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {job.title}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {job.salary}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 150 }} align="center">
                    {job.description}
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleUpdateFormOpen(e, job)}
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
                      onClick={(e) => handleDeleteFormOpen(e, job)}
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
        rowsPerPageOptions={[10, 20, 50]}
      />
    </Card>
  );
};

JobListResult.propTypes = {
  jobs: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default JobListResult;
