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
import { fetchMajorsData } from 'src/store/major-actions';
import getInitials from '../../utils/getInitials';
import MajorFormModal from './MajorFormModal';

const MajorListResult = ({ majors, totalElements, ...rest }) => {
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();
  const [selectedMajorIds, setSelectedMajorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [sortedBy, setSortedBy] = useState('id asc');
  const [search, setSearch] = useState('');

  const [account, setAccount] = useState({});

  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const handleUpdateFormOpen = (event, selectedAccount) => {
    setUpdateFormOpen(true);
    setAccount(selectedAccount);
  };

  const handleUpdateFormClose = (isUpdated) => {
    setUpdateFormOpen(false);
    if (isUpdated) {
      // dispatch(fetchMajorsData(token, page, limit, sortedBy, search));
    }
  };

  const handleCreateFormClose = (isUpdated) => {
    setCreateFormOpen(false);
    if (isUpdated) {
      dispatch(fetchMajorsData(token, page, limit, sortedBy, search));
    }
  };

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
  });

  const handleFilterChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onFilterHandler = () => {
    const nameFilter = `name=='*${values.name}*'`;
    const filter = [];
    if (values.name !== '') {
      filter.push(nameFilter);
    }
    setSearch(filter.join(';'));
    setPage(0);
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
    setLimit(event.target.value);
    setPage(0);
    dispatch(fetchMajorsData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(fetchMajorsData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Name',
      label: 'Name',
      search: 'name',
      sort: 'name',
      align: 'left'
    },
  ];

  return (
    <Card {...rest}>
      <MajorFormModal account={account} open={updateFormOpen} onClose={handleUpdateFormClose} type="UPDATE" />
      <MajorFormModal account={account} open={createFormOpen} onClose={handleCreateFormClose} type="CREATE" />
      <PerfectScrollbar>
        <Box sx={{ maxWidth: 700 }}>
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
                <TableCell sx={{ width: 250 }}>
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
                  <TableCell sx={{ maxWidth: 150 }}>
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

MajorListResult.propTypes = {
  majors: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default MajorListResult;
