import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Logo from './Logo';

const MainNavbar = (props) => {
  const account = useSelector((state) => state.account);
  const { isLoggedIn } = account;
  return (
    <AppBar elevation={0} {...props}>
      <Toolbar sx={{ height: 64 }}>
        <RouterLink to="/">
          <Logo width="52px" height="52px" hidden={!isLoggedIn} />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};
export default MainNavbar;
