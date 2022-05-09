import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import ProfileBreadcrumb from './components/ProfileBreadcrumb';
import ProfileFavorite from './components/ProfileFavorite';
import ProfileInfomation from './components/ProfileInfomation';
import ProfileNavbar from './components/ProfileNavbar';
import ProfileOrder from './components/ProfileOrder';
import NotFound from '../NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogin } from '../../store/Slice/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  wraper: {
    padding: '12px 24px',
  },
  left: {
    width: '250px',
  },
  accountAvatar: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '45px',
    borderRadius: '50%',
    marginRight: '12px',
  },
}));

function Account(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();
  const user = useSelector((state) => state.user.current);
  
  useEffect(() => {
    dispatch(getUserLogin(user.id));

    history.push({
      pathname: history.location.pathname,
      search: '',
    });
  }, [dispatch, user]);

  return (
    <Box>
      <Container>
        <ProfileBreadcrumb />
        <Grid container className={classes.wraper} sx={{ flexFlow: 'nowrap' }}>
          <Grid item className={classes.left}>
            <Box className={classes.accountAvatar}>
              <img src={avatar} alt="avatar" className={classes.avatar} />
              <Typography>Tài khoản của tôi</Typography>
            </Box>
            <ProfileNavbar />
          </Grid>
          <Grid item sx={{ marginLeft: '24px', flex: '1 1 0' }}>
            <Switch>
              <Route path={url} exact>
                <ProfileInfomation />
              </Route>
              <Route path={`${url}/history`} exact>
                <ProfileOrder />
              </Route>
              <Route path={`${url}/favorite`} exact>
                <ProfileFavorite />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Account;
