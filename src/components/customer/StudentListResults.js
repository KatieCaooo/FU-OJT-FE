import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

const StudentListResults = ({ students, ...rest }) => {
  console.log(students);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Major</TableCell>
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
        count={students.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

StudentListResults.propTypes = {
  students: PropTypes.array.isRequired
};

export default StudentListResults;
