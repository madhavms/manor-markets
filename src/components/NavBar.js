import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  timeRemaining: {
    textAlign: "right",
    marginRight: theme.spacing(2),
    fontSize: "0.8em",
  },
}));

const ManorMarketsNavbar = ({ logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const {isLoggedIn, tokenValidity, timeRemaining} =
    useContext(AuthContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isLoggedIn || !tokenValidity) setAnchorEl(null);
  }, [isLoggedIn, tokenValidity]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography style={isLoggedIn?{ marginLeft: '16%' }:{ marginLeft:0 }} variant="h6" className={classes.title}>
            Manor Markets
          </Typography>
          {isLoggedIn && (
            <Typography style={{ marginRight: '40px' }} variant="h10" className={classes.timeRemaining}>
              Session Expiry: {timeRemaining}
            </Typography>
          )}
          {isLoggedIn && (
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClose={handleClose}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <MenuItem onClick={handleClose}>Home</MenuItem>
            </Link>

            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem onClick={handleClose}>About</MenuItem>
            </Link>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem onClick={handleClose}>Products</MenuItem>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem onClick={handleClose}>Contact</MenuItem>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                Log Out
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ManorMarketsNavbar;
