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
  // Grid,
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
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvaluationData, updateEvaluation } from 'src/store/evaluation-actions';
import { evaluationActions } from 'src/store/evaluation-slice';
import EvaluationFormModal from './EvaluationFormModal';
import getInitials from '../../utils/getInitials';

const EvaluationListResult = ({ evaluations, totalElements, ...rest }) => {
  const token = useSelector((state) => state.account.token);
  const {
    limit, page, order, orderBy, sortedBy, search
  } = useSelector((state) => state.evaluations.filter);
  const dispatch = useDispatch();
  const [selectedEvaluationIds, setSelectedEvaluationIds] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState({});
  const [updateFormOpen, setUpdateFormOpen] = useState(false);

  const handleUpdateFormOpen = (event, selectedEvaluation) => {
    setUpdateFormOpen(true);
    setCurrentEvaluation(selectedEvaluation);
  };

  const handleUpdateFormClose = (type, evaluation) => {
    if (type === 'UPDATE') {
      dispatch(updateEvaluation(token, evaluation, page, limit, sortedBy, search));
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
    dispatch(evaluationActions.setOrder(orderValue));
    dispatch(evaluationActions.setOrderBy(orderByValue));
    dispatch(evaluationActions.setSortedBy(`${orderByValue !== 'id' ? sortField : 'id'} ${orderValue}`));
    dispatch(
      fetchEvaluationData(
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
    grade: '',
    comment: '',
    pass: ''
  });

  const handleFilterChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onFilterHandler = () => {
    const gradeFilter = `grade==${values.grade ? values.grade : ''}`;
    const commentFilter = `comment=='*${values.comment}*'`;
    const statusFilter = `pass==${values.pass === 'Passed' ? 'True' : 'False'}`;
    const filter = [];
    if (values.grade !== '') {
      filter.push(gradeFilter);
    }
    if (values.comment !== '') {
      filter.push(commentFilter);
    }
    if (values.pass !== '') {
      filter.push(statusFilter);
    }
    dispatch(evaluationActions.setSearch(filter.join(';')));
    dispatch(evaluationActions.setPage(0));
    dispatch(fetchEvaluationData(token, 0, limit, sortedBy, filter.join(';')));
  };

  const handleSelectAll = (event) => {
    let newSelectedEvaluationIds;

    if (event.target.checked) {
      newSelectedEvaluationIds = evaluations.map((evaluation) => evaluation.id);
    } else {
      newSelectedEvaluationIds = [];
    }

    setSelectedEvaluationIds(newSelectedEvaluationIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEvaluationIds.indexOf(id);
    let newSelectedEvaluationIds = [];

    if (selectedIndex === -1) {
      newSelectedEvaluationIds = newSelectedEvaluationIds.concat(
        selectedEvaluationIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedEvaluationIds = newSelectedEvaluationIds.concat(
        selectedEvaluationIds.slice(1)
      );
    } else if (selectedIndex === selectedEvaluationIds.length - 1) {
      newSelectedEvaluationIds = newSelectedEvaluationIds.concat(
        selectedEvaluationIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedEvaluationIds = newSelectedEvaluationIds.concat(
        selectedEvaluationIds.slice(0, selectedIndex),
        selectedEvaluationIds.slice(selectedIndex + 1)
      );
    }
    setSelectedEvaluationIds(newSelectedEvaluationIds);
  };

  const handleLimitChange = (event) => {
    dispatch(evaluationActions.setLimit(event.target.value));
    dispatch(evaluationActions.setPage(0));
    dispatch(fetchEvaluationData(token, 0, event.target.value, sortedBy, search));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(evaluationActions.setPage(newPage));
    dispatch(fetchEvaluationData(token, newPage, limit, sortedBy, search));
  };

  const headerCells = [
    {
      name: 'Grade',
      label: 'Grade',
      search: 'grade',
      sort: 'grade',
      align: 'center'
    },
    {
      name: 'Comment',
      label: 'Comment',
      search: 'comment',
      sort: 'comment',
      align: 'left'
    },
    {
      name: 'pass',
      label: 'Passed',
      search: 'pass',
      sort: 'pass',
      align: 'center'
    }
  ];

  return (
    <Card {...rest}>
      <EvaluationFormModal
        evaluation={currentEvaluation}
        open={updateFormOpen}
        onClose={handleUpdateFormClose}
        type="UPDATE"
      />
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
                    checked={selectedEvaluationIds.length === evaluations.length}
                    color="primary"
                    indeterminate={
                      selectedEvaluationIds.length > 0
                      && selectedEvaluationIds.length < evaluations.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ width: 300 }}>
                  <TextField
                    fullWidth
                    label="Grade"
                    name="grade"
                    onChange={handleFilterChange}
                    value={values.grade}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ width: 300 }}>
                  <TextField
                    fullWidth
                    label="Comment"
                    name="comment"
                    onChange={handleFilterChange}
                    value={values.comment}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }} align="center">
                  <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                    <InputLabel id="disabled-label" size="small">
                      Status
                    </InputLabel>
                    <Select
                      labelId="pass-label"
                      id="pass-dropdown"
                      value={values.pass}
                      onChange={handleFilterChange}
                      label="Status"
                      name="pass"
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Passed">
                        Passed
                      </MenuItem>
                      <MenuItem value="Not Passed">
                        Not Passed
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
              {evaluations.slice(0, limit).map((evaluation) => (
                <TableRow
                  hover
                  key={evaluation.id}
                  selected={selectedEvaluationIds.indexOf(evaluation.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEvaluationIds.indexOf(evaluation.id) !== -1}
                      onChange={(event) => handleSelectOne(event, evaluation.id)}
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
                      <Avatar src={evaluation.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(evaluation.grade)}
                      </Avatar>
                      <Typography color="textPrimary">
                        {evaluation.grade}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="left">
                    {evaluation.comment}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }} align="center">
                    <Typography color={evaluation.pass ? 'error.main' : 'success.main'} variant="button">
                      {evaluation.pass ? 'Not Passed' : 'Passed'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => handleUpdateFormOpen(e, evaluation)}
                    >
                      <EditIcon />
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

EvaluationListResult.propTypes = {
  evaluations: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired
};

export default EvaluationListResult;
