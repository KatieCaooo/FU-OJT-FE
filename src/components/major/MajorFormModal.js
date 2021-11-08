import {
  Modal,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent
  //   FormControl,
  //   InputLabel,
  //   Select,
  //   MenuItem
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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

const MajorFormModal = (props) => {
  const { major, type } = props;
  const [values, setValues] = useState({
    name: ''
  });
  useEffect(() => {
    if (major.name) {
      setValues({
        id: major.id,
        name: major.name
      });
    }
  }, [major]);

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
              subheader={type === 'UPDATE' ? 'The information can be edited' : 'Information of major to be created.'}
              title="Major Information"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {type === 'UPDATE'
                && (
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
                <Grid item md={type === 'UPDATE' ? 9 : 12} xs={type === 'UPDATE' ? 9 : 12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
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
              <Button color="primary" variant="contained" onClick={onSaveHandler}>
                {type === 'UPDATE' ? 'Save details' : 'Create'}
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default MajorFormModal;

MajorFormModal.propTypes = {
  major: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string
};
