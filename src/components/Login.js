import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import useAuthentication from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginScreen() {
  const classes = useStyles();
  const { isLoggedIn, login } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography variant="h5">Log in</Typography>
      <form className={classes.form} noValidate onSubmit={login}>
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
        />
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
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log in
        </Button>
      </form>
    </Container>
  );
}

export default LoginScreen;