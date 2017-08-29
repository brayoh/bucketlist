// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
import AppDrawer from "./AppDrawer";

// icons
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  }
};

class AppNavigation extends Component {
  state = {
    open: {
      top: false,
      left: false,
      bottom: false,
      right: false
    }
  };

  toggleDrawer = (side, open) => {
    const drawerState = {};
    drawerState[side] = open;
    this.setState({open: drawerState});
  };

  handleLeftOpen = () => this.toggleDrawer('left', true);
  handleLeftClose = () => this.toggleDrawer('left', false);


  render() {
    const classes = this.props.classes;
    const mailFolderListItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon/>
          </ListItemIcon>
          <ListItemText primary="Starred"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SendIcon/>
          </ListItemIcon>
          <ListItemText primary="Send mail"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon/>
          </ListItemIcon>
          <ListItemText primary="Drafts"/>
        </ListItem>
      </div>
    );

    const otherMailFolderListItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <MailIcon/>
          </ListItemIcon>
          <ListItemText primary="All mail"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon/>
          </ListItemIcon>
          <ListItemText primary="Trash"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReportIcon/>
          </ListItemIcon>
          <ListItemText primary="Spam"/>
        </ListItem>
      </div>
    );

    const sideList = (
      <div>
        <List className={classes.list} disablePadding>
          {mailFolderListItems}
        </List>
        <Divider/>
        <List className={classes.list} disablePadding>
          {otherMailFolderListItems}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon onClick={this.handleLeftOpen}/>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Title
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open.left} onRequestClose={this.handleLeftClose} onClick={this.handleLeftClose}>
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
