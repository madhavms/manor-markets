import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, TextField, Button } from "@material-ui/core";
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

function LoginScreen({login, isLoggedIn}) {
const classes = useStyles();
const navigate = useNavigate();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");



const handleSubmit = (e) => {
e.preventDefault();
if (!username || !password) {
setErrorMessage("Please enter a username and password");
return;
}
login({ username, password, setErrorMessage });
navigate("/");
};

return (
<Container maxWidth="xs" className={classes.root}>
<Typography variant="h5">Log in</Typography>
{errorMessage && <Typography color="error">{errorMessage}</Typography>}
<form className={classes.form} noValidate onSubmit={handleSubmit}>
<TextField
variant="outlined"
margin="normal"
required
fullWidth
id="username"
label="Username"
name="username"
value={username}
onChange={(e) => setUsername(e.target.value)}
autoComplete="username"
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
value={password}
onChange={(e) => setPassword(e.target.value)}
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



