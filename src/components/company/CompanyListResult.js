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
import { fetchCompaniesData, updateCompany } from 'src/store/company-actions';
import { companyActions } from '../../store/company-slice';
import getInitials from '../../utils/getInitials';
import CompanyFormModal from './CompanyFormModal';

const CompanyListResult = ({ companies, totalElements, ...rest }) => {
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, order, orderBy, sortedBy, search
  } = useSelector((state) => state.companies.filter);
  const dispatch = useDispatch();
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [currentCompany, setCurrentCompany] = useState({});
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const handleUpdateFormOpen = (event, selectedCompany) => {
    setUpdateFormOpen(true);
    setCurrentCompany(selectedCompany);
  };

  const handleUpdateFormClose = (type, company) => {
    if (type === 'UPDATE') {
      dispatch(updateCompany(token, company, page, limit, sortedBy, search));
    }
    setUpdateFormOpen(false);
  };

  const handleRequestSort = (event, property, sortField) => {
    const isSameProperty = orderBy === property;
    const isOldAsc = order === 'asc';
    const isAsc = isSameProperty && isOldAsc;
    const isSetDefault = isSameProperty && !isOldAsc;
    const orderValue = isAsc ? 'desc' : 'asc';
    const orderByValue = !isSetDefault ? property : 'id';
    dispatch(companyActions.setOrder(orderValue));
    dispatch(companyActions.setOrderBy(orderByValue));
    dispatch(companyActions.setSortedBy(`${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`));
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
    description: '',
    address: ''
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
    const descriptionFilter = `description=='*${values.description}*'`;
    const addressFilter = `address=='*${values.address}*'`;
    const filter = [];
    if (values.name !== '') {
      filter.push(nameFilter);
    }
    if (values.description !== '') {
      filter.push(descriptionFilter);
    }
    if (values.address !== '') {
      filter.push(addressFilter);
    }
    dispatch(companyActions.setSearch(filter.join(';')));
    dispatch(companyActions.setPage(0));
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
    let newselectedCompanyIds = [];

    if (selectedIndex === -1) {
      newselectedCompanyIds = newselectedCompanyIds.concat(
        selectedCompanyIds,
        id
      );
    } else if (selectedIndex === 0) {
      newselectedCompanyIds = newselectedCompanyIds.concat(
        selectedCompanyIds.slice(1)
      );
    } else if (selectedIndex === selectedCompanyIds.length - 1) {
      newselectedCompanyIds = newselectedCompanyIds.concat(
        selectedCompanyIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newselectedCompanyIds = newselectedCompanyIds.concat(
        selectedCompanyIds.slice(0, selectedIndex),
        selectedCompanyIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCompanyIds(newselectedCompanyIds);
  };

  const handleLimitChange = (event) => {
    dispatch(companyActions.setLimit(event.target.value));
    dispatch(companyActions.setPage(0));
    dispatch(fetchCompaniesData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(companyActions.setPage(newPage));
    dispatch(fetchCompaniesData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Company Name',
      label: 'Company Name',
      search: 'name',
      sort: 'name',
      align: 'left'
    },
    {
      name: 'Description',
      label: 'Description',
      search: 'description',
      sort: 'description',
      align: 'left'
    },
    {
      name: 'Address',
      label: 'Address',
      search: 'address',
      sort: 'address',
      align: 'left'
    }
  ];

  return (
    <Card {...rest}>
      <CompanyFormModal company={currentCompany} open={updateFormOpen} onClose={handleUpdateFormClose} type="UPDATE" />
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
                    checked={selectedCompanyIds.length === companies.length}
                    color="primary"
                    indeterminate={
                      selectedCompanyIds.length > 0
                      && selectedCompanyIds.length < companies.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ width: 250 }}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="name"
                    onChange={handleFilterChange}
                    value={values.name}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
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
                    label="Address"
                    name="address"
                    onChange={handleFilterChange}
                    value={values.address}
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
                      <Avatar src={company.avatarUrl} sx={{ mr: 3 }}>
                        {getInitials(company.name)}
                      </Avatar>
                      <Typography color="textPrimary">
                        {company.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="left">
                    {company.description}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="left">
                    {company.address}
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleUpdateFormOpen(e, company)}
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

CompanyListResult.propTypes = {
  companies: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default CompanyListResult;
