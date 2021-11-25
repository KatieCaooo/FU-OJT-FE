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
  FormControl,
  Grid,
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
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { useDispatch, useSelector } from 'react-redux';
import { addWeeks, addDays } from 'date-fns';
import {
  deleteMajor, fetchMajorsData, recoverMajor, updateMajor
} from 'src/store/major-actions';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import getInitials from '../../utils/getInitials';
import MajorFormModal from './MajorFormModal';

import { majorActions } from '../../store/major-slice';
import MajorDeletionConfirmModal from './MajorDeletionConfirmModal';

const MajorListResult = ({ majors, totalElements, ...rest }) => {
  const getWeeksAfter = (date, amount) => (date ? addWeeks(date, amount) : undefined);

  const token = useSelector((state) => state.account.token);
  const {
    limit, page, order, orderBy, sortedBy, search
  } = useSelector((state) => state.majors.filter);
  const dispatch = useDispatch();
  const [selectedMajorIds, setSelectedMajorIds] = useState([]);
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(0);
  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('id');
  // const [sortedBy, setSortedBy] = useState('id asc');
  // const [search, setSearch] = useState('');

  const [currentMajor, setCurrentMajor] = useState({});

  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const handleUpdateFormOpen = (event, selectedMajor) => {
    setUpdateFormOpen(true);
    setCurrentMajor(selectedMajor);
  };

  const handleUpdateFormClose = (type, major) => {
    if (type === 'UPDATE') {
      dispatch(updateMajor(token, major, page, limit, sortedBy, search));
    }
    setUpdateFormOpen(false);
  };

  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const handleDeleteFormOpen = (event, selectedMajor) => {
    setDeleteFormOpen(true);
    setCurrentMajor(selectedMajor);
  };

  const handleDeleteFormClose = (type, major) => {
    if (type === 'DELETE') {
      dispatch(deleteMajor(token, major, page, limit, sortedBy, search));
    }
    setDeleteFormOpen(false);
  };

  const [recoverFormOpen, setRecoverFormOpen] = useState(false);
  const handleRecoverFormOpen = (event, selectedMajor) => {
    setRecoverFormOpen(true);
    setCurrentMajor(selectedMajor);
  };

  const handleRecoverFormClose = (type, major) => {
    if (type === 'RECOVER') {
      dispatch(recoverMajor(token, major, page, limit, sortedBy, search));
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
    dispatch(majorActions.setOrder(orderValue));
    dispatch(majorActions.setOrderBy(orderByValue));
    dispatch(majorActions.setSortedBy(`${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`));
    dispatch(
      fetchMajorsData(
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
    createdAt: [null, null],
    updatedAt: [null, null],
    disabled: ''
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
    const createdAtStartFilter = `createdAt>=${values.createdAt[0] ? values.createdAt[0].toISOString() : ''}`;
    const createdAtEndFilter = `createdAt<${values.createdAt[1] ? addDays(values.createdAt[1], 1).toISOString() : ''}`;
    const updatedAtStartFilter = `updatedAt>=${values.updatedAt[0] ? values.updatedAt[0].toISOString() : ''}`;
    const updatedAtEndFilter = `updatedAt<${values.updatedAt[1] ? addDays(values.updatedAt[1], 1).toISOString() : ''}`;
    const statusFilter = `disabled==${values.disabled === 'Archived' ? 'True' : 'False'}`;
    const filter = [];
    if (values.name !== '') {
      filter.push(nameFilter);
    }
    if (values.createdAt[0]) {
      filter.push(createdAtStartFilter);
    }
    if (values.createdAt[1]) {
      filter.push(createdAtEndFilter);
    }
    if (values.updatedAt[0]) {
      filter.push(updatedAtStartFilter);
    }
    if (values.updatedAt[1]) {
      filter.push(updatedAtEndFilter);
    }
    if (values.disabled !== '') {
      filter.push(statusFilter);
    }
    dispatch(majorActions.setSearch(filter.join(';')));
    dispatch(majorActions.setPage(0));
    dispatch(fetchMajorsData(token, 0, limit, sortedBy, filter.join(';')));
  };

  const handleSelectAll = (event) => {
    let newSelectedMajorIds;

    if (event.target.checked) {
      newSelectedMajorIds = majors.map((major) => major.id);
    } else {
      newSelectedMajorIds = [];
    }

    setSelectedMajorIds(newSelectedMajorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMajorIds.indexOf(id);
    let newSelectedMajorIds = [];

    if (selectedIndex === -1) {
      newSelectedMajorIds = newSelectedMajorIds.concat(
        selectedMajorIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedMajorIds = newSelectedMajorIds.concat(
        selectedMajorIds.slice(1)
      );
    } else if (selectedIndex === selectedMajorIds.length - 1) {
      newSelectedMajorIds = newSelectedMajorIds.concat(
        selectedMajorIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedMajorIds = newSelectedMajorIds.concat(
        selectedMajorIds.slice(0, selectedIndex),
        selectedMajorIds.slice(selectedIndex + 1)
      );
    }
    setSelectedMajorIds(newSelectedMajorIds);
  };

  const handleLimitChange = (event) => {
    dispatch(majorActions.setLimit(event.target.value));
    dispatch(majorActions.setPage(0));
    dispatch(fetchMajorsData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(majorActions.setPage(newPage));
    dispatch(fetchMajorsData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Major Name',
      label: 'Major Name',
      search: 'name',
      sort: 'name',
      align: 'left'
    },
    {
      name: 'CreatedAt',
      label: 'Created At',
      search: 'createdAt',
      sort: 'createdAt',
      align: 'center'
    },
    {
      name: 'UpdatedAt',
      label: 'Updated At',
      search: 'updatedAt',
      sort: 'updatedAt',
      align: 'center'
    },
    {
      name: 'disabled',
      label: 'Status',
      search: 'disabled',
      sort: 'disabled',
      align: 'center'
    },
  ];

  return (
    <Card {...rest}>
      <MajorFormModal major={currentMajor} open={updateFormOpen} onClose={handleUpdateFormClose} type="UPDATE" />
      <MajorDeletionConfirmModal major={currentMajor} open={deleteFormOpen} onClose={handleDeleteFormClose} operation="DELETE" />
      <MajorDeletionConfirmModal major={currentMajor} open={recoverFormOpen} onClose={handleRecoverFormClose} operation="RECOVER" />
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
                    checked={selectedMajorIds.length === majors.length}
                    color="primary"
                    indeterminate={
                      selectedMajorIds.length > 0
                      && selectedMajorIds.length < majors.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ width: 300 }}>
                  <TextField
                    fullWidth
                    label="Major Name"
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
                      name="createdAt"
                      value={values.createdAt}
                      maxDate={getWeeksAfter(values.createdAt[0], 4)}
                      inputFormat="dd-MM-yyyy"
                      onChange={(newValue) => { handleFilterChange(null, newValue, 'createdAt'); }}
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
                      name="updatedAt"
                      value={values.updatedAt}
                      maxDate={getWeeksAfter(values.updatedAt[0], 4)}
                      inputFormat="dd-MM-yyyy"
                      onChange={(newValue) => { handleFilterChange(null, newValue, 'updatedAt'); }}
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
                <TableCell sx={{ maxWidth: 200 }} align="center">
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Status
                    </InputLabel>
                    <Select
                      labelId="disabled-label"
                      id="disabled-dropdown"
                      value={values.disabled}
                      onChange={handleFilterChange}
                      label="Status"
                      name="disabled"
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Archived">
                        Archived
                      </MenuItem>
                      <MenuItem value="Active">
                        Active
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
              {majors.slice(0, limit).map((major) => (
                <TableRow
                  hover
                  key={major.id}
                  selected={selectedMajorIds.indexOf(major.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMajorIds.indexOf(major.id) !== -1}
                      onChange={(event) => handleSelectOne(event, major.id)}
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
                      <Avatar src={major.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(major.name)}
                      </Avatar>
                      <Typography color="textPrimary">
                        {major.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color="textPrimary">
                      {major.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color="textPrimary">
                      {major.updatedAt}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color={major.disabled ? 'error.main' : 'success.main'} variant="button">
                      {major.disabled ? 'Archived' : 'Active'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleUpdateFormOpen(e, major)}
                    >
                      <EditIcon />
                    </Fab>
                  </TableCell>
                  <TableCell align="left">
                    {!major.disabled && (
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
                      onClick={(e) => handleDeleteFormOpen(e, major)}
                    >
                      <DeleteForeverIcon />
                    </Fab>
                    )}
                    {major.disabled && (
                    <Fab
                      color="success"
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
                      onClick={(e) => handleRecoverFormOpen(e, major)}
                    >
                      <RestorePageIcon />
                    </Fab>
                    )}
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

MajorListResult.propTypes = {
  majors: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default MajorListResult;
