import React, { useState, useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import { useForm } from "react-hook-form";
import { default as API } from "../../store/api";
import useStoreon from 'storeon/react';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const emailRegEx = /^\S+@\S+$/;

export default function Form({ title, role }) {
  const { user, errorState, dispatch } = useStoreon('user', 'errorState');
  const classes = useStyles();
  const { register, handleSubmit, setError, clearError, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });
  const [checkedValues, setCheckedValues] = useState([]);
  let history = useHistory();

  useEffect(() => {
    if (user && user.id) {
      history.push("/feed");
    }
  }, [ user ]);

  useEffect(() => {
    dispatch('errors/clear');
  },[]);

  const emailNotRegistered = async email => {
    if (role === "signin") {
      return true;
    }
    const inCache = checkedValues.find(item => item.value === email);
    let isValid = false;

    if (inCache) {
      isValid = inCache.result;
    } else {
      const response = await API.post(
        '/users/check',
        { email },
        {}
      );

      setCheckedValues([
        ...checkedValues,
        { value: email, result: response.ok }
      ]);

      if (response && response.ok) {
        isValid = response.ok;
      }
    }

    if (isValid === false) {
      setError(
        "email",
        "emailRegistered",
        `Email ${email} already registered.`
      );

      return false;
    } else {
      clearError("email");

      return true;
    }
  };

  const onSubmit = data => {
    dispatch('errors/clear');
    dispatch(`user/${role}`, data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon>lock-outlined</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {errorState && errorState.length > 0 && <p>{errorState[0]}</p>}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={register({
              required: "Email is required",
              pattern: {
                value: emailRegEx,
                message: "Plese enter a valid email"
              },
              validate: async value => await emailNotRegistered(value)
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: "password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {role === "signup" ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                component={RouterLink}
                to={`${role === "signup" ? "/login" : "/register"}`}
                variant="body2"
              >
                {`${
                  role === "signup"
                    ? "Want to Log in?"
                    : "Don't have an account? Sign Up"
                }`}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
