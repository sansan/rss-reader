import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useStore } from "../../store/store";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

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
  const { state } = useStore();
  const { user } = state;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.homeLink} to="/">
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
            <Button
              color="inherit"
              onClick={() => {
                history.push("/logout");
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
