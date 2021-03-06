import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  // AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Compass as CompassIcon,
  Briefcase as BriefcaseIcon,
  FileText as FileIcon,
  Calendar as CalendarIcon,
  Clipboard as ClipboardIcon,
  List as ListIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import { useSelector } from 'react-redux';
import NavItem from './NavItem';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const account = useSelector((state) => state.account);

  let items = [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard',
      roles: ['SYS_ADMIN', 'STUDENT', 'COMPANY_REPRESENTATIVE']
    },
    {
      href: '/app/applications',
      icon: FileIcon,
      title: 'Applications',
      roles: ['SYS_ADMIN', 'STUDENT', 'COMPANY_REPRESENTATIVE']
    },
    {
      href: '/app/jobs',
      icon: BriefcaseIcon,
      title: 'Jobs',
      roles: ['SYS_ADMIN', 'STUDENT', 'COMPANY_REPRESENTATIVE']
    },
    {
      href: '/app/companies',
      icon: CompassIcon,
      title: 'Companies',
      roles: ['SYS_ADMIN', 'STUDENT', 'COMPANY_REPRESENTATIVE']
    },
    {
      href: '/app/students',
      icon: UsersIcon,
      title: 'Students',
      roles: ['SYS_ADMIN']
    },
    {
      href: '/app/majors',
      icon: ListIcon,
      title: 'Majors',
      roles: ['SYS_ADMIN']
    },
    {
      href: '/app/semesters',
      icon: CalendarIcon,
      title: 'Semesters',
      roles: ['SYS_ADMIN']
    },
    {
      href: '/app/evaluations',
      icon: ClipboardIcon,
      title: 'Evaluations',
      roles: ['STUDENT', 'COMPANY_REPRESENTATIVE']
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Account',
      roles: ['SYS_ADMIN', 'STUDENT', 'COMPANY_REPRESENTATIVE']
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings',
      roles: ['SYS_ADMIN', 'STUDENT', 'COMPANY_REPRESENTATIVE']
    },
    // {
    //   href: '/404',
    //   icon: AlertCircleIcon,
    //   title: 'Error',
    //   roles: []
    // }
  ];

  items = items.filter(
    (item) => !item.roles || item.roles.length === 0 || item.roles.includes(account.role)
  );

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

  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: getRole(account.role),
    name: account.account.name
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
