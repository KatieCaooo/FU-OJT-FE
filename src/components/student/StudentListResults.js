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
import { fetchStudentsData, updateStudent, deleteStudent } from 'src/store/student-actions';
import { studentActions } from 'src/store/student-slice';
import getInitials from '../../utils/getInitials';
import StudentFormModal from './StudentFormModal';
import StudentDeletionConfirmModal from './StudentDeletionConfirmModal';

const StudentListResults = ({ students, totalElements, ...rest }) => {
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, order, orderBy, sortedBy, search
  } = useSelector((state) => state.students.filter);
  const dispatch = useDispatch();
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const [currentStudent, setCurrentStudent] = useState({});
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const handleUpdateFormOpen = (event, selectedStudent) => {
    setUpdateFormOpen(true);
    setCurrentStudent(selectedStudent);
  };

  const handleUpdateFormClose = (type, student) => {
    if (type === 'UPDATE') {
      dispatch(updateStudent(token, student, page, limit, sortedBy, search));
    }
    setUpdateFormOpen(false);
  };

  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const handleDeleteFormOpen = (event, selectedStudent) => {
    setDeleteFormOpen(true);
    setCurrentStudent(selectedStudent);
  };

  const handleDeleteFormClose = (type, student) => {
    if (type === 'DELETE') {
      dispatch(deleteStudent(token, student, page, limit, sortedBy, search));
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
    dispatch(studentActions.setOrder(orderValue));
    dispatch(studentActions.setOrderBy(orderByValue));
    dispatch(studentActions.setSortedBy(`${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`));
    dispatch(
      fetchStudentsData(
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
    dispatch(studentActions.setSearch(
      filter.join(';')
    ));
    dispatch(studentActions.setPage(0));
    dispatch(fetchStudentsData(token, 0, limit, sortedBy, filter.join(';')));
  };

  const handleSelectAll = (event) => {
    let newSelectedStudentIds;

    if (event.target.checked) {
      newSelectedStudentIds = students.map((student) => student.id);
    } else {
      newSelectedStudentIds = [];
    }

    setSelectedStudentIds(newSelectedStudentIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedStudentIds.indexOf(id);
    let newSelectedStudentIds = [];

    if (selectedIndex === -1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(1)
      );
    } else if (selectedIndex === selectedStudentIds.length - 1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(0, selectedIndex),
        selectedStudentIds.slice(selectedIndex + 1)
      );
    }
    setSelectedStudentIds(newSelectedStudentIds);
  };

  const handleLimitChange = (event) => {
    dispatch(studentActions.setLimit(event.target.value));
    dispatch(studentActions.setPage(0));
    dispatch(fetchStudentsData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(studentActions.setPage(newPage));
    dispatch(fetchStudentsData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Full Name',
      label: 'Full Name',
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
      <StudentFormModal student={currentStudent} open={updateFormOpen} onClose={handleUpdateFormClose} type="UPDATE" />
      <StudentDeletionConfirmModal student={currentStudent} open={deleteFormOpen} onClose={handleDeleteFormClose} operation="DELETE" />
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
                    checked={selectedStudentIds.length === students.length}
                    color="primary"
                    indeterminate={
                      selectedStudentIds.length > 0
                      && selectedStudentIds.length < students.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
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
                      <MenuItem value="Digital Art Design">
                        Digital Art Design
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
              {students.slice(0, limit).map((student) => (
                <TableRow
                  hover
                  key={student.id}
                  selected={selectedStudentIds.indexOf(student.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStudentIds.indexOf(student.id) !== -1}
                      onChange={(event) => handleSelectOne(event, student.id)}
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
                      <Avatar src={student.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(student.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {student.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {student.student.studentCode}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 150 }} align="center">
                    {student.email}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {`${student.student.address}`}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120 }} align="center">
                    {student.phone}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200 }} align="center">
                    {student.student.major.name}
                  </TableCell>
                  <TableCell align="right">
                    <Fab color="secondary" aria-label="edit" size="small" onClick={(e) => handleUpdateFormOpen(e, student)}>
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
                      onClick={(e) => handleDeleteFormOpen(e, student)}
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

StudentListResults.propTypes = {
  students: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default StudentListResults;
