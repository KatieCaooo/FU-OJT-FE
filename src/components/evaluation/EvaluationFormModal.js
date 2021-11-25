import {
  Modal,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const EvaluationFormModal = (props) => {
  const { evaluation, type } = props;
  const role = useSelector((state) => state.account.role);
  const [values, setValues] = useState({
    id: '',
    grade: '',
    comment: '',
    pass: ''
  });
  useEffect(() => {
    if (evaluation.id) {
      setValues({
        id: evaluation.id,
        grade: evaluation.grade,
        comment: evaluation.comment,
        pass: evaluation.pass
      });
    }
  }, [evaluation]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSaveHandler = () => {
    props.onClose(type, values);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form autoComplete="off" noValidate {...props}>
          <Card>
            <CardHeader
              subheader={
                type === 'UPDATE'
                  ? 'The information can be edited'
                  : 'Information of Evaluation to be Created'
              }
              title="Evaluation Information"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {type === 'UPDATE' && (
                  <Grid item md={3} xs={3}>
                    <TextField
                      disabled
                      fullWidth
                      label="Id"
                      name="id"
                      onChange={handleChange}
                      required
                      value={values.id}
                      variant="outlined"
                    />
                  </Grid>
                )}
                {role === 'COMPANY_REPRESENTATIVE' && (
                  <Grid
                    item
                    md={type === 'UPDATE' ? 9 : 12}
                    xs={type === 'UPDATE' ? 9 : 12}
                  >
                    <TextField
                      fullWidth
                      label="Grade"
                      name="grade"
                      onChange={handleChange}
                      required
                      value={values.grade}
                      variant="outlined"
                    />
                  </Grid>
                )}
                {role === 'COMPANY_REPRESENTATIVE' && (
                  <Grid
                    item
                    md={type === 'UPDATE' ? 9 : 12}
                    xs={type === 'UPDATE' ? 9 : 12}
                  >
                    <TextField
                      fullWidth
                      label="Comment"
                      name="comment"
                      onChange={handleChange}
                      required
                      value={values.comment}
                      variant="outlined"
                    />
                  </Grid>
                )}
                {role === 'COMPANY_REPRESENTATIVE' && (
                  <Grid
                    item
                    md={type === 'UPDATE' ? 9 : 12}
                    xs={type === 'UPDATE' ? 9 : 12}
                  >
                    <FormControl variant="outlined" sx={{ minWidth: 130 }}>
                      <InputLabel id="disabled-label" size="small">
                        Status
                      </InputLabel>
                      <Select
                        labelId="pass-label"
                        id="pass-dropdown"
                        value={values.pass}
                        onChange={handleChange}
                        label="Status"
                        name="pass"
                        size="small"
                      >
                        <MenuItem value="Passed">Passed</MenuItem>
                        <MenuItem value='"Not Passed'>Not Passed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={onSaveHandler}
              >
                {type === 'UPDATE' ? 'Save details' : 'Create'}
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default EvaluationFormModal;

EvaluationFormModal.propTypes = {
  evaluation: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string
};
