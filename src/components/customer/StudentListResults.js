import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
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
  TextField,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsData } from 'src/store/student-actions';
import getInitials from '../../utils/getInitials';

const StudentListResults = ({ students, totalElements, ...rest }) => {
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
    setLimit(event.target.value);
    setPage(0);
    dispatch(fetchStudentsData(token, 0, event.target.value));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(fetchStudentsData(token, newPage, limit));
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
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
                <TableCell>Name</TableCell>
                <TableCell>Student Code</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Major</TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>
                  <TextField
                    fullWidth
                    label="Full name"
                    name="name"
                    onChange={handleFilterChange}
                    value={values.name}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Student code"
                    name="studentCode"
                    onChange={handleFilterChange}
                    value={values.studentCode}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleFilterChange}
                    value={values.email}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    onChange={handleFilterChange}
                    value={values.address}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    onChange={handleFilterChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="major-label">Major</InputLabel>
                    <Select
                      labelId="major-label"
                      id="major-dropdown"
                      value={values.major}
                      onChange={handleFilterChange}
                      label="major"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Software Engineering">Software Engineering</MenuItem>
                      <MenuItem value="Business Administration">Business Administration</MenuItem>
                    </Select>
                  </FormControl>
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
                  <TableCell>
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
                  <TableCell>{student.student.studentCode}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {`${student.student.address}`}
                  </TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    {student.student.major.name}
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
