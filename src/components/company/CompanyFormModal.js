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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const CompanyFormModal = (props) => {
  const { account } = props;
  console.log(account);
  const [values, setValues] = useState({
    companyName: '',
    description: '',
    email: '',
    address: '',
    phone: ''
    // major: ''
  });
  useEffect(() => {
    if (account.name) {
      setValues({
        name: account.name,
        description: account.company.description,
        email: account.email,
        address: account.student.address,
        phone: account.phone
        // major: account.student.major.name
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
              title="User Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="Full name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Student code"
                    name="studentCode"
                    onChange={handleChange}
                    value={values.studentCode}
                    disabled
                    variant="outlined"
                  />
                </Grid> */}
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    required
                    disabled
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid item md={6} xs={12}> */}
                {/* <TextField
                      fullWidth
                      label="Major"
                      name="major"
                      onChange={handleChange}
                      value={values.major}
                      disabled
                      variant="outlined"
                    /> */}
                {/* <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <InputLabel id="major-label" sx={{ width: '100%' }}>
                      Major
                    </InputLabel>
                    <Select
                      labelId="major-label"
                      id="major-dropdown"
                      value={values.major}
                      onChange={handleChange}
                      label="major"
                      name="major"
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value="Software Engineering">
                        Software Engineering
                      </MenuItem>
                      <MenuItem value="Business Administration">
                        Business Administration
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                {/* </Grid> */}
                {/* <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
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
              <Button color="primary" variant="contained">
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default CompanyFormModal;

CompanyFormModal.propTypes = {
  account: PropTypes.object
};