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
import { fetchJobsData } from 'src/store/job-actions';
import getInitials from '../../utils/getInitials';
import JobFormModal from './JobFormModal';

const JobListResult = ({ jobs, totalElements, ...rest }) => {
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [sortedBy, setSortedBy] = useState('id asc');
  const [search, setSearch] = useState('');

  const [account, setAccount] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = (event, selectedAccount) => {
    setOpen(true);
    setAccount(selectedAccount);
  };

  const handleClose = () => setOpen(false);

  const handleRequestSort = (event, property, sortField) => {
    const isSameProperty = orderBy === property;
    const isOldAsc = order === 'asc';
    const isAsc = isSameProperty && isOldAsc;
    const isSetDefault = isSameProperty && !isOldAsc;
    const orderValue = isAsc ? 'desc' : 'asc';
    const orderByValue = !isSetDefault ? property : 'id';
    setOrder(orderValue);
    setOrderBy(orderByValue);
    setSortedBy(`${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`);
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
    description: '',
    skills: '',
    benefits: '',
  });

  const handleFilterChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onFilterHandler = () => {
    const nameFilter = `name=='*${values.name}*'`;
    const titleFilter = `title=='*${values.title}*'`;
    const descriptionFilter = `description=='*${values.description}*'`;
    const skillFilter = `skills=='*${values.skills}*'`;
    const benefitFilter = `phone=='*${values.benefits}*'`;
    const filter = [];
    if (values.name !== '') {
      filter.push(nameFilter);
    }
    if (values.title !== '') {
      filter.push(titleFilter);
    }
    if (values.description !== '') {
      filter.push(descriptionFilter);
    }
    if (values.skills !== '') {
      filter.push(skillFilter);
    }
    if (values.benefits !== '') {
      filter.push(benefitFilter);
    }
    setSearch(filter.join(';'));
    setPage(0);
    dispatch(fetchJobsData(token, 0, limit, sortedBy, filter.join(';')));
  };

  const handleSelectAll = (event) => {
    let newSelectedStudentIds;

    if (event.target.checked) {
      newSelectedStudentIds = jobs.map((job) => job.id);
    } else {
      newSelectedStudentIds = [];
    }

    setSelectedJobIds(newSelectedStudentIds);
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
    setLimit(event.target.value);
    setPage(0);
    dispatch(fetchJobsData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(fetchJobsData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Name',
      label: 'Name',
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
      name: 'Description',
      label: 'Description',
      search: 'description',
      sort: 'description',
      align: 'center'
    },
    {
      name: 'Skills',
      label: 'Skills',
      search: 'skills',
      sort: 'skills',
      align: 'left'
    },
    {
      name: 'Benefits',
      label: 'Benefits',
      search: 'benefits',
      sort: 'benefits',
      align: 'center'
    },
  ];

  return (
    <Card {...rest}>
      <JobFormModal account={account} open={open} onClose={handleClose} />
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
                    checked={setSelectedJobIds.length === jobs.length}
                    color="primary"
                    indeterminate={
                      setSelectedJobIds.length > 0
                      && setSelectedJobIds.length < jobs.length
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
                <TableCell sx={{ maxWidth: 300 }}>
                  <TextField
                    fullWidth
                    label="Skills"
                    name="skills"
                    onChange={handleFilterChange}
                    value={values.skills}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 120 }}>
                  <TextField
                    fullWidth
                    label="Benefits"
                    name="benefits"
                    onChange={handleFilterChange}
                    value={values.benefits}
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
                  <TableCell sx={{ maxWidth: 150 }} align="center">
                    {job.description}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {job.skills}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {job.benefits}
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleOpen(e, job)}
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
