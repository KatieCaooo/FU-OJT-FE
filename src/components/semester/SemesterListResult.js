import { useState } from 'react';
import moment from 'moment';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSemestersData } from 'src/store/semester-actions';
import getInitials from '../../utils/getInitials';
import SemesterFormModal from './SemesterFormModal';

const SemesterListResult = ({ semesters, totalElements, ...rest }) => {
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();
  const [selectedSemesterIds, setSelectedSemesterIds] = useState([]);
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
      fetchSemestersData(
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
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onFilterHandler = () => {
    const nameFilter = `name=='*${values.name}*'`;
    const startDateFilter = `startDate=='*${values.startDate}*'`;
    const endDateFilter = `endDate=='*${values.endDate}*'`;
    const filter = [];
    if (values.name !== '') {
      filter.push(nameFilter);
    }
    if (values.startDate !== '') {
      filter.push(startDateFilter);
    }
    if (values.endDate !== '') {
      filter.push(endDateFilter);
    }
    setSearch(filter.join(';'));
    setPage(0);
    dispatch(fetchSemestersData(token, 0, limit, sortedBy, filter.join(';')));
  };

  const handleSelectAll = (event) => {
    let newSelectedSemesterIds;

    if (event.target.checked) {
      newSelectedSemesterIds = semesters.map((semester) => semester.id);
    } else {
      newSelectedSemesterIds = [];
    }

    setSelectedSemesterIds(newSelectedSemesterIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSemesterIds.indexOf(id);
    let newSelectedSemesterIds = [];

    if (selectedIndex === -1) {
      newSelectedSemesterIds = newSelectedSemesterIds.concat(
        selectedSemesterIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedSemesterIds = newSelectedSemesterIds.concat(
        selectedSemesterIds.slice(1)
      );
    } else if (selectedIndex === selectedSemesterIds.length - 1) {
      newSelectedSemesterIds = newSelectedSemesterIds.concat(
        selectedSemesterIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedSemesterIds = newSelectedSemesterIds.concat(
        selectedSemesterIds.slice(0, selectedIndex),
        selectedSemesterIds.slice(selectedIndex + 1)
      );
    }
    setSelectedSemesterIds(newSelectedSemesterIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
    dispatch(fetchSemestersData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(fetchSemestersData(token, newPage, limit, sortedBy, search));
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
      name: 'Start Date',
      label: 'Start Date',
      search: 'startDate',
      sort: 'startDate',
      align: 'left'
    },
    {
      name: 'End Date',
      label: 'End Date',
      search: 'endDate',
      sort: 'endDate',
      align: 'left'
    }
  ];

  return (
    <Card {...rest}>
      <SemesterFormModal account={account} open={open} onClose={handleClose} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 700 }}>
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
                    checked={selectedSemesterIds.length === semesters.length}
                    color="primary"
                    indeterminate={
                      selectedSemesterIds.length > 0
                      && selectedSemesterIds.length < semesters.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ width: 250 }}>
                  <TextField
                    fullWidth
                    label="Semester Name"
                    name="name"
                    onChange={handleFilterChange}
                    value={values.name}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={values.startDate}
                      onChange={handleFilterChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  {/* <TextField */}
                  {/*  fullWidth */}
                  {/*  label="Start Date" */}
                  {/*  name="startDate" */}
                  {/*  onChange={handleFilterChange} */}
                  {/*  value={values.startDate} */}
                  {/*  variant="outlined" */}
                  {/*  size="small" */}
                  {/* /> */}
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={values.endDate}
                      onChange={handleFilterChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  {/* <TextField */}
                  {/*  fullWidth */}
                  {/*  label="End Date" */}
                  {/*  name="endDate" */}
                  {/*  onChange={handleFilterChange} */}
                  {/*  value={values.endDate} */}
                  {/*  variant="outlined" */}
                  {/*  size="small" */}
                  {/* /> */}
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
              {semesters.slice(0, limit).map((semester) => (
                <TableRow
                  hover
                  key={semester.id}
                  selected={selectedSemesterIds.indexOf(semester.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSemesterIds.indexOf(semester.id) !== -1}
                      onChange={(event) => handleSelectOne(event, semester.id)}
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
                      <Avatar src={semester.avatarUrl} sx={{ mr: 3 }}>
                        {getInitials(semester.name)}
                      </Avatar>
                      <Typography color="textPrimary">
                        {semester.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {moment(semester.startDate).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {moment(semester.endDate).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleOpen(e, semester)}
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
        rowsPerPageOptions={[5, 10, 30]}
      />
    </Card>
  );
};

SemesterListResult.propTypes = {
  semesters: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default SemesterListResult;
