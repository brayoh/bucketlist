// @flow weak

import React, {Component} from 'react';
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

// icons
import InboxIcon from 'material-ui-icons/Inbox';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
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
        <Link to="/logout">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Logout"/>
          </ListItem>
        </Link>
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
              Title
            </Typography>
            { !this.props.authenticated && <Link to="/login"><Button color="contrast">Login</Button></Link>}
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

export default withStyles(styles)(AppNavigation);
