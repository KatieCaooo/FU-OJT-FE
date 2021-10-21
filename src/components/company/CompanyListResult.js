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
import { fetchCompaniesData } from 'src/store/company-actions';
import getInitials from '../../utils/getInitials';
import CompanyFormModal from './CompanyFormModal';

const CompanyListResult = ({ companies, totalElements, ...rest }) => {
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
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
      fetchCompaniesData(
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
    studentCode: '',
    email: '',
    address: '',
    phone: '',
    major: ''
  });

  const handleFilterChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onFilterHandler = () => {
    const nameFilter = `name=='*${values.name}*'`;
    const studentCodeFilter = `student.studentCode=='*${values.studentCode}*'`;
    const emailFilter = `email=='*${values.email}*'`;
    const addressFilter = `student.address=='*${values.address}*'`;
    const phoneFilter = `phone=='*${values.phone}*'`;
    const majorFilter = `student.major.name=='${values.major}'`;
    const filter = [];
    if (values.name !== '') {
      filter.push(nameFilter);
    }
    if (values.studentCode !== '') {
      filter.push(studentCodeFilter);
    }
    if (values.email !== '') {
      filter.push(emailFilter);
    }
    if (values.address !== '') {
      filter.push(addressFilter);
    }
    if (values.phone !== '') {
      filter.push(phoneFilter);
    }
    if (values.major !== '') {
      filter.push(majorFilter);
    }
    setSearch(filter.join(';'));
    setPage(0);
    dispatch(fetchCompaniesData(token, 0, limit, sortedBy, filter.join(';')));
  };

  const handleSelectAll = (event) => {
    let newSelectedCompanyIds;

    if (event.target.checked) {
      newSelectedCompanyIds = companies.map((company) => company.id);
    } else {
      newSelectedCompanyIds = [];
    }

    setSelectedCompanyIds(newSelectedCompanyIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCompanyIds.indexOf(id);
    let newSelectedCompanyIds = [];

    if (selectedIndex === -1) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(1)
      );
    } else if (selectedIndex === selectedCompanyIds.length - 1) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(0, selectedIndex),
        selectedCompanyIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCompanyIds(newSelectedCompanyIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
    dispatch(
      fetchCompaniesData(token, 0, event.target.value, sortedBy, search)
    );
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(fetchCompaniesData(token, newPage, limit, sortedBy, search));
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
      name: 'StudentCode',
      label: 'Student Code',
      search: 'student.studentCode',
      sort: 'student.studentCode',
      align: 'center'
    },
    {
      name: 'Email',
      label: 'Email',
      search: 'email',
      sort: 'email',
      align: 'center'
    },
    {
      name: 'Address',
      label: 'Address',
      search: 'student.address',
      sort: 'student.address',
      align: 'left'
    },
    {
      name: 'Phone',
      label: 'Phone',
      search: 'phone',
      sort: 'phone',
      align: 'center'
    },
    {
      name: 'Major',
      label: 'Major',
      search: 'student.major.id',
      sort: 'student.major.id',
      align: 'center'
    }
  ];

  return (
    <Card {...rest}>
      <CompanyFormModal account={account} open={open} onClose={handleClose} />
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
                    checked={selectedCompanyIds.length === companies.length}
                    color="primary"
                    indeterminate={
                      selectedCompanyIds.length > 0
                      && selectedCompanyIds.length < companies.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <TextField
                    fullWidth
                    label="Full name"
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
                    label="Student code"
                    name="studentCode"
                    onChange={handleFilterChange}
                    value={values.studentCode}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 150 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleFilterChange}
                    value={values.email}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    onChange={handleFilterChange}
                    value={values.address}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 120 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    onChange={handleFilterChange}
                    value={values.phone}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <FormControl variant="outlined" sx={{ minWidth: 250 }}>
                    <InputLabel id="major-label" size="small">
                      Major
                    </InputLabel>
                    <Select
                      labelId="major-label"
                      id="major-dropdown"
                      value={values.major}
                      onChange={handleFilterChange}
                      label="major"
                      name="major"
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Software Engineering">
                        Software Engineering
                      </MenuItem>
                      <MenuItem value="Business Administration">
                        Business Administration
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
              {companies.slice(0, limit).map((company) => (
                <TableRow
                  hover
                  key={company.id}
                  selected={selectedCompanyIds.indexOf(company.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCompanyIds.indexOf(company.id) !== -1}
                      onChange={(event) => handleSelectOne(event, company.id)}
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
                      <Avatar src={company.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(company.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {company.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {company.company.companyCode}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 150 }} align="center">
                    {company.email}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {`${company.company.address}`}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {company.phone}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200 }} align="center">
                    {company.company.major.name}
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleOpen(e, company)}
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

CompanyListResult.propTypes = {
  companies: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default CompanyListResult;