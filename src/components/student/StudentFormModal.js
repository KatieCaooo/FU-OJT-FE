import {
  Modal, Box, Button, Divider, Grid, TextField, Card, CardHeader, CardContent
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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

const StudentFormModal = (props) => {
  const user = useSelector((state) => state.account);

  const getRole = (role) => {
    switch (role) {
      case 'SYS_ADMIN':
        return 'Admin';
      case 'STUDENT':
        return 'Student';
      case 'COMPANY_REPRESENTATIVE':
        return 'Company Representative';
      default:
        return 'None';
    }
  };

  const [values, setValues] = useState({
    name: user.account.name,
    email: user.account.email,
    phone: user.account.phone,
    address: user.account.student ? user.account.student.address : null,
    studentCode: user.account.student ? user.account.student.studentCode : null,
    major: user.account.student ? user.account.student.major.name : null,
    role: getRole(user.account.role)
  });

  const handleChange = (event) => {
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
        <form
          autoComplete="off"
          noValidate
          {...props}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="User Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
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
                <Grid
                  item
                  md={12}
                  xs={12}
                >
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
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={values.phone}
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
                    label="Role"
                    name="role"
                    onChange={handleChange}
                    value={values.role}
                    disabled
                    variant="outlined"
                  />
                </Grid>
                {values.role === 'Student' && (
                <>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Student code"
                      name="studentCode"
                      onChange={handleChange}
                      value={values.studentCode}
                      disabled
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
                      label="Major"
                      name="major"
                      onChange={handleChange}
                      value={values.major}
                      disabled
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      value={values.address}
                      variant="outlined"
                    />
                  </Grid>

                </>
                )}
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
              <Button
                color="primary"
                variant="contained"
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentFormModal;
