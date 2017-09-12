/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {getBucketlists} from "../../actions/bucketlist";
import {addItem, updateItem, deleteItem, resetRequestState} from "../../actions/item";

import AddItemDialog from "../../components/modals/AddModal";
import ConfirmActionDialog from "../../components/modals/ConfirmModal";

import keycode from 'keycode';
import Table, {TableBody, TableCell, TableHead, TableRow, TableSortLabel} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import FilterListIcon from 'material-ui-icons/FilterList';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return {
    id: counter,
    name,
    calories,
    fat,
    carbs,
    protein
  };
}

const columnData = [
  {
    id: 'item_id',
    numeric: true,
    disablePadding: false,
    label: 'Item id'
  }, {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  }, {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'Created At'
  }, {
    id: 'updated_at',
    numeric: true,
    disablePadding: false,
    label: 'Updated At'
  }, {
    id: 'done',
    numeric: false,
    disablePadding: false,
    label: 'Done'
  }, {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions'
  }
];

class ItemsContainerHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {onSelectAllClick, order, orderBy, numSelected} = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell key={column.id} numeric={column.numeric} disablePadding={column.disablePadding}>
                <TableSortLabel active={orderBy === column.id} direction={order} onClick={this.createSortHandler(column.id)}>
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2
  },
  highlight: theme.palette.type === 'light'
    ? {
      color: theme.palette.primary.A700,
      backgroundColor: theme.palette.primary.A100
    }
    : {
      color: theme.palette.primary.A100,
      backgroundColor: theme.palette.primary.A700
    },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.primary
  },
  title: {
    flex: '0 0 auto'
  }
});

let ItemsContainerToolbar = props => {
  const {numSelected, classes} = props;

  return (
    <Toolbar className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0
    })}>
      <div className={classes.title}>
        {numSelected > 0
          ? (
            <Typography type="subheading">{numSelected}
              selected</Typography>
          )
          : (
            <Typography type="title">Items</Typography>
          )}
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        {numSelected > 0
          ? (
            <IconButton aria-label="Delete">
              <DeleteIcon/>
            </IconButton>
          )
          : (
            <IconButton aria-label="Filter list">
              <FilterListIcon/>
            </IconButton>
          )}
      </div>
    </Toolbar>
  );
};

ItemsContainerToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

ItemsContainerToolbar = withStyles(toolbarStyles)(ItemsContainerToolbar);

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
});
const defaultState: Object = {
  order: 'asc',
  orderBy: 'calories',
  selected: [],
  data: [],
  name: '',
  done: false,
  action: "",
  addModalOpen: false,
  confirmModalOpen: false,
  message: '',
  bucket_id: ""
};

class ItemsContainer extends React.Component {
  state = defaultState;

  componentWillMount() {
    this.props.getBucketlists();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.request.status === 'success') {
      this.props.getBucketlists();
      this.props.resetRequestState()

      this.setState(defaultState);
    }
    else if(nextProps.request.status === "failed") {
     this.setState({ message: nextProps.request.message })
   }
  }

  handleAddItem = (e : Object) => {
    e.preventDefault();
    const {name} = this.state;
    const bucket_id = this.props.bucket_id;

    // send data to API
    this.props.addItem({name, bucket_id});
  }

  handleEditItem = (e : Object) => {
    e.preventDefault();
    const {name, done, item_id} = this.state;
    const bucket_id = this.props.bucket_id;

    // send data to API
    this.props.updateItem({item_id, name, bucket_id, done});
  }

  handleDeleteItem = (e : Object) => {
    e.preventDefault();
    const {bucket_id} = this.props;
    const {item_id} = this.state;

    // send data to API
    this.props.deleteItem({item_id, bucket_id});
  }

  handleChange = (e : Object) => {
    let item = {}
    item[e.target.name] = e.target.value;
    this.setState(item);
  }

  // show add item modal
  handleRequestOpen = (type : string, item : Object) => {
    if (type === "confirm") {
      this.setState({
        confirmModalOpen: true,
        item_id: parseInt(item.id)
      });
    } else if (type === "edit") {
      // get item from state

      this.setState({
        'item_id': item.id,
        'bucket_id': this.props.bucket_id,
        'name': item.name,
        'done': item.done,
        'addModalOpen': true,
        'action': 'edit'
      })
    } else {
      this.setState({addModalOpen: true, action: 'add'});
    }
  }
  // hide  modal
  handleRequestClose = (type : string) => {
    if (type === "confirm") {
      this.setState({confirmModalOpen: false, name: "", description: ""});
    } else {
      this.setState({addModalOpen: false, open: false, name: "", description: ""});
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = this.state.data.sort((a, b) => (order === 'desc'
      ? b[orderBy] > a[orderBy]
      : a[orderBy] > b[orderBy]),);

    this.setState({data, order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({
        selected: this.state.data.map(n => n.id)
      });
      return;
    }
    this.setState({selected: []});
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
    }

    this.setState({selected: newSelected});
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const classes = this.props.classes;
    const {data, order, orderBy, selected} = this.state;

    let bucket = (this.props.bucketlists.length > 1)
      ? this.props.bucketlists.filter((bucket) => bucket.id === this.props.bucket_id)[0]
      : []

    return (
      <div>
        <Paper className={classes.paper}>
          <ItemsContainerToolbar numSelected={selected.length}/>
          <Table>
            <ItemsContainerHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={this.handleSelectAllClick} onRequestSort={this.handleRequestSort}/>
            <TableBody>
              {bucket.items && bucket.items.map(item => {
                return (
                  <TableRow hover role="checkbox" tabIndex="-1" key={item.id}>
                    <TableCell numeric>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell numeric>{item.created_at}</TableCell>
                    <TableCell numeric>{item.updated_at}</TableCell>
                    <TableCell>{item.done.toString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => this.handleRequestOpen('edit', item)}>
                        <EditIcon/>
                      </IconButton>

                      <IconButton onClick={() => this.handleRequestOpen('confirm', item)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <div>
          <AddItemDialog
            open={this.state.addModalOpen}
            title="item"
            name={this.state.name}
            action={this.state.action}
            handleChange={this.handleChange}
            handleAdd={this.handleAddItem}
            handleEdit={this.handleEditItem}
            handleRequestClose={this.handleRequestClose}
            errorText={this.state.message}/>
        </div>
        <div>
          <ConfirmActionDialog open={this.state.confirmModalOpen} action="delete item" handleAction={this.handleDeleteItem} handleRequestClose={this.handleRequestClose}/>
        </div>
        <div className="btn-container" style={{
          'position': 'absolute',
          'right': '2%',
          'bottom': '-15%',
          'marginBottom': '2%'
        }}>
          <Button fab color="primary" aria-label="add" onClick={this.handleRequestOpen}>
            <AddIcon/>
          </Button>
        </div>
      </div>
    );
  }
}

ItemsContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state : Object, ownProps : Object) => ({
  bucket_id: parseInt(ownProps.location.pathname.split("/dashboard/")[1]),
  bucketlists: state.bucketlists,
  whoami: state.auth.whoami,
  request: state.item.request
})

const mapDispatchToProps = dispatch => ({
  getBucketlists: () => dispatch(getBucketlists()),
  addItem: item => dispatch(addItem(item)),
  updateItem: payload => dispatch(updateItem(payload)),
  deleteItem: payload => dispatch(deleteItem(payload)),
  resetRequestState: () => dispatch(resetRequestState())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsContainer));
