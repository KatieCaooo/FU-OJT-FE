import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useSelector } from 'react-redux';

// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama'
//   },
//   {
//     value: 'new-york',
//     label: 'New York'
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco'
//   }
// ];

const AccountProfileDetails = (props) => {
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
    newPassword: '',
    confirm: '',
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
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item xs={12}>
              <Divider>USER INFORMATION</Divider>
            </Grid>
            <Grid
              item
              md={6}
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
              md={6}
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
            <Grid item xs={12}>
              <Divider>SECURITY</Divider>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="New Password"
                name="password"
                onChange={handleChange}
                required
                value={values.newPassword}
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
                label="Confirm"
                name="password"
                onChange={handleChange}
                required
                value={values.confirm}
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
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
