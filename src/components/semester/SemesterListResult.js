import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
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
import { format, addWeeks, addDays } from 'date-fns';
import {
  fetchSemestersData, deleteSemester, updateSemester, recoverSemester
} from 'src/store/semester-actions';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import getInitials from '../../utils/getInitials';
import { semesterActions } from '../../store/semester-slice';
import SemesterFormModal from './SemesterFormModal';
import SemesterDeletionConfirmModal from './SemesterDeletionConfirmModal';

const SemesterListResult = ({ semesters, totalElements, ...rest }) => {
  const getWeeksAfter = (date, amount) => (date ? addWeeks(date, amount) : undefined);
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, order, orderBy, sortedBy, search
  } = useSelector((state) => state.majors.filter);
  const dispatch = useDispatch();
  const [selectedSemesterIds, setSelectedSemesterIds] = useState([]);
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(0);
  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('id');
  // const [sortedBy, setSortedBy] = useState('id asc');
  // const [search, setSearch] = useState('');

  const [currentSemester, setCurrentSemester] = useState({});

  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const handleUpdateFormOpen = (event, selectedSemester) => {
    setUpdateFormOpen(true);
    setCurrentSemester(selectedSemester);
  };

  const handleUpdateFormClose = (type, semester) => {
    if (type === 'UPDATE') {
      dispatch(updateSemester(token, semester, page, limit, sortedBy, search));
    }
    setUpdateFormOpen(false);
  };

  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const handleDeleteFormOpen = (event, selectedSemester) => {
    setDeleteFormOpen(true);
    setCurrentSemester(selectedSemester);
  };

  const handleDeleteFormClose = (type, semester) => {
    if (type === 'DELETE') {
      dispatch(deleteSemester(token, semester, page, limit, sortedBy, search));
    }
    setDeleteFormOpen(false);
  };

  const [recoverFormOpen, setRecoverFormOpen] = useState(false);
  // const handleRecoverFormOpen = (event, selectedSemester) => {
  //   setRecoverFormOpen(true);
  //   setCurrentSemester(selectedSemester);
  // };

  const handleRecoverFormClose = (type, semester) => {
    if (type === 'RECOVER') {
      dispatch(recoverSemester(token, semester, page, limit, sortedBy, search));
    }
    setRecoverFormOpen(false);
  };

  const handleRequestSort = (event, property, sortField) => {
    const isSameProperty = orderBy === property;
    const isOldAsc = order === 'asc';
    const isAsc = isSameProperty && isOldAsc;
    const isSetDefault = isSameProperty && !isOldAsc;
    const orderValue = isAsc ? 'desc' : 'asc';
    const orderByValue = !isSetDefault ? property : 'id';
    dispatch(semesterActions.setOrder(orderValue));
    dispatch(semesterActions.setOrderBy(orderByValue));
    dispatch(semesterActions.setSortedBy(`${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`));
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
    startDate: [null, null],
    endDate: [null, null],
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
    const startDateStartFilter = `startDate>=${values.startDate[0] ? values.startDate[0].toISOString() : ''}`;
    const startDateEndFilter = `startDate<${values.startDate[1] ? addDays(values.startDate[1], 1).toISOString() : ''}`;
    const endDateStartFilter = `endDate>=${values.endDate[0] ? values.endDate[0].toISOString() : ''}`;
    const endDateEndFilter = `endDate<${values.endDate[1] ? addDays(values.endDate[1], 1).toISOString() : ''}`;
    const filter = [];
    if (values.name !== '') {
      filter.push(nameFilter);
    }
    if (values.startDate[0]) {
      filter.push(startDateStartFilter);
    }
    if (values.startDate[1]) {
      filter.push(startDateEndFilter);
    }
    if (values.endDate[0]) {
      filter.push(endDateStartFilter);
    }
    if (values.endDate[1]) {
      filter.push(endDateEndFilter);
    }
    dispatch(semesterActions.setSearch(filter.join(';')));
    dispatch(semesterActions.setPage(0));
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
    dispatch(semesterActions.setLimit(event.target.value));
    dispatch(semesterActions.setPage(0));
    dispatch(fetchSemestersData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(semesterActions.setPage(newPage));
    dispatch(fetchSemestersData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Semester Name',
      label: 'Semester Name',
      search: 'name',
      sort: 'name',
      align: 'left'
    },
    {
      name: 'Start Date',
      label: 'Start Date',
      search: 'startDate',
      sort: 'startDate',
      align: 'center'
    },
    {
      name: 'End Date',
      label: 'End Date',
      search: 'endDate',
      sort: 'endDate',
      align: 'center'
    }
  ];

  return (
    <Card {...rest}>
      <SemesterFormModal semester={currentSemester} open={updateFormOpen} onClose={handleUpdateFormClose} type="UPDATE" />
      <SemesterDeletionConfirmModal semester={currentSemester} open={deleteFormOpen} onClose={handleDeleteFormClose} operation="DELETE" />
      <SemesterDeletionConfirmModal semester={currentSemester} open={recoverFormOpen} onClose={handleRecoverFormClose} operation="RECOVER" />
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
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      name="startDate"
                      value={values.startDate}
                      maxDate={getWeeksAfter(values.startDate[0], 4)}
                      inputFormat="dd-MM-yyyy"
                      onChange={(newValue) => { handleFilterChange(null, newValue, 'startDate'); }}
                      renderInput={(startProps, endProps) => (
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                        >
                          <TextField
                            sx={{ maxWidth: 125 }}
                            variant="outlined"
                            size="small"
                            {...startProps}
                          />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField
                            sx={{ maxWidth: 125 }}
                            variant="outlined"
                            size="small"
                            {...endProps}
                          />
                        </Grid>
                      )}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      name="endDate"
                      value={values.endDate}
                      maxDate={getWeeksAfter(values.endDate[0], 4)}
                      inputFormat="dd-MM-yyyy"
                      onChange={(newValue) => { handleFilterChange(null, newValue, 'endDate'); }}
                      renderInput={(startProps, endProps) => (
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                        >
                          <TextField
                            sx={{ maxWidth: 125 }}
                            variant="outlined"
                            size="small"
                            {...startProps}
                          />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField
                            sx={{ maxWidth: 125 }}
                            variant="outlined"
                            size="small"
                            {...endProps}
                          />
                        </Grid>
                      )}
                    />
                  </LocalizationProvider>
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
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color="textPrimary">
                      {format(semester.startDate, 'dd-MM-yyyy HH:mm:ss.SSS')}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color="textPrimary">
                      {format(semester.endDate, 'dd-MM-yyyy HH:mm:ss.SSS')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleUpdateFormOpen(e, semester)}
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
                      onClick={(e) => handleDeleteFormOpen(e, semester)}
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
