import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Logo from './Logo';
import { accountActions } from '../store/account-slice';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications] = useState([]);

  const logoutHandler = () => {
    dispatch(accountActions.logout());
    navigate('/login');
  };

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo width="52px" height="52px" hidden={false} />
        </RouterLink>
        <RouterLink to="/">
          <Typography color="white" variant="h2" fontFamily="Times New Roman">
            Internship Management
          </Typography>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden xlDown>
          <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large" onClick={logoutHandler}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
