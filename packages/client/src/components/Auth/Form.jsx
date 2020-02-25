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
import { default as http } from "../../store/HttpClient";
import { useStore } from "../../store";

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
const baseUrl = "/rest";

export default function Form({ title, role }) {
  const { state, dispatch } = useStore();
  const classes = useStyles();
  const { register, handleSubmit, setError, clearError, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });
  const [validating, setValidating] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [serverError, setServerError] = useState();
  let history = useHistory();
  const user = state.user;
  useEffect(() => {
    if (user.id) {
      history.push("/feed");
    }
  }, [user]);

  const emailNotRegistered = async email => {
    if (role === "signin") {
      return true;
    }
    const inCache = checkedValues.find(item => item.value === email);
    console.log(checkedValues, validating);
    let isValid = false;
    if (inCache) {
      isValid = inCache.result;
    } else {
      const response = await http.post(
        `${baseUrl}/v1/users/check`,
        { email },
        {}
      );
      console.log(response);
      setCheckedValues([
        ...checkedValues,
        { value: email, result: response.ok }
      ]);
      setValidating(false);
      console.log(response);
      if (response && response.ok) {
        isValid = response.ok;
      }
    }
    if (isValid === false) {
      setError(
        "email",
        "emailRegistered",
        `1 Email ${email} already registered.`
      );
      return false;
    } else {
      clearError("email");
      return true;
    }
  };

  const apiUrl = `${baseUrl}/v1/auth/${role === "signin" ? "login" : "signup"}`;

  const onSubmit = async data => {
    setServerError(null);

    const user = await http.post(apiUrl, data, {});
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      history.push("/feed");
    }
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
        {serverError && <p>{serverError}</p>}
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
            autoFocus
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
