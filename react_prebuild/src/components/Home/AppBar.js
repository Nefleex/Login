import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  withStyles
} from "@material-ui/core/";

const styles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: 350
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 12,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
});

function ButtonAppBar(props) {
  const { classes } = props;
  let location = props.history.location.pathname.split("/");
  location = location[1].toUpperCase();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {location}
          </Typography>

          <Button>
            <Link to={"/tvguide"} className={classes.link}>
              <Typography color="inherit">TVGUIDE</Typography>
            </Link>
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              props.history.push("/");
            }}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
