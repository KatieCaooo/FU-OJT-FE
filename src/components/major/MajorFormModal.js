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
import { updateMajor } from 'src/store/major-actions';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

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
  const token = useSelector((state) => state.account.token);
  const { account, type } = props;
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: ''
  });
  useEffect(() => {
    if (account.name) {
      setValues({
        id: account.id,
        name: account.name
      });
    }
  }, [account]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSaveHandler = () => {
    if (type === 'UPDATE') {
      dispatch(updateMajor(token, values));
    }
    if (type === 'CREATE') {
      console.log('CREATE');
    }
    props.onClose(true);
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
              subheader="The information can be edited"
              title="Major Information"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={6}>
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
                Save details
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
  account: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string
};
