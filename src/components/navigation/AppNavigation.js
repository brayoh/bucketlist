// @flow weak

import React, {Component} from 'react';
import { browserHistory } from "react-router";
import {connect} from "react-redux";

import PropTypes from 'prop-types';
import {Link} from "react-router";
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {logoutUser} from "../../actions/authorization";

// icons
import InboxIcon from 'material-ui-icons/Inbox';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1,
    textTransform: 'capitalize'
  },
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  }
};


class AppNavigation extends Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({open: true});
  handleClose = () => this.setState({open: false});
  logoutUser = (e) => {
    this.props.logoutUser();
    browserHistory.push("/login")
  }

  render() {
    const classes = this.props.classes;
    const publicNav = (
      <div>
        <Link to="/login">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Login"/>
          </ListItem>
        </Link>

        <Link to="/register">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Register"/>
          </ListItem>
        </Link>
      </div>
    );

    const authenticatedNav = (
      <div>
        <Link to="/dashboard">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
          </ListItem>
        </Link>
        <ListItem button onClick={(event) => this.logoutUser(event) }>
          <ListItemIcon>
            <InboxIcon/>
          </ListItemIcon>
          <ListItemText primary="Logout"/>
        </ListItem>
      </div>
    );

    const sideList = (
      <div>
        <List className={classes.list} disablePadding>
          {
            this.props.authenticated ? authenticatedNav: publicNav
          }
        </List>
      </div>
    );


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon onClick={this.handleOpen}/>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {this.props.username ? `Welcome ${this.props.username}` : 'Awesome Bucketlist' }
            </Typography>
              {
                this.props.route === "/register" &&
                  <Link to="/login"><Button color="contrast">Login</Button></Link>
              }
              { this.props.route === "/login" &&
                <Link to="/register"><Button color="contrast">Sign Up</Button></Link>
              }
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onRequestClose={this.handleClose} onClick={this.handleClose}>
          {sideList}
        </Drawer>
      </div>
    );
  }
}

AppNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(AppNavigation));
