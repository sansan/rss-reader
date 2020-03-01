import React from "react";
import { useHistory, Link } from "react-router-dom";
import useStoreon from 'storeon/react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  homeLink: {
    color: "#fff",
    textDecoration: "none"
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user, loading, dispatch } = useStoreon('user', 'loading');
  const isLoading = loading.includes('USER_INFO');
    
  const logoutUser = () => {
    dispatch('user/logout');
  };

  if (isLoading) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.homeLink} to="/feed">
                RSS Reader
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.homeLink} to="/feed">
              RSS Reader
            </Link>
          </Typography>
          {!user ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  history.push("/register");
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
