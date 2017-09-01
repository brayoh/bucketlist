/* eslint-disable flowtype/require-valid-file-annotation */

import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import "./modal.css";

const style = {
  'width': '100% !important'
}

const AddBucketDialog = (props) => (
      <div>
        <Dialog style={style} className="modal-dialog"  open={props.open} onRequestClose={props.handleRequestClose}>
          <DialogTitle className="modal-title">
            {props.action === "add" ? `Add a new ${props.title}` : `Edit ${props.title} ${props.name}`}
          </DialogTitle>
          <DialogContentText className="error-text">
            {props.errorText}
          </DialogContentText>
          <DialogContent>
            <Grid item xs={12} className="input-container">
              {props.description ?
                  <TextField
                    name="name"
                    label="bucketlist name"
                    type="text"
                    margin="normal"
                    defaultValue={props.name}
                    onChange={props.handleChange} />
                :
                  <TextField
                    name="name"
                    label="item name"
                    type="text"
                    margin="normal"
                    defaultValue={props.name}
                    onChange={props.handleChange} />
              }
            </Grid>
            {props.description && <Grid item xs={12} className="input-container">
              <TextField
                name="description"
                label="bucketlist description"
                type="text"
                margin="normal"
                defaultValue={props.description}
                onChange={props.handleChange}
              />
            </Grid>}
            <Grid item xs={12}>
              {/*<DialogContentText>
                Done: <Switch checked={false} aria-label="checkedC"/>
              </DialogContentText>*/}
            </Grid>
          </DialogContent>
          <DialogActions>
            {props.action === "add" &&
              <Button onClick={props.handleAdd} color="primary">
                {`Add ${props.title}`}
              </Button>
            }
            {props.action === "edit" &&
              <Button onClick={props.handleEdit} color="primary">
                Save changes
              </Button>
            }
            <Button onClick={props.handleRequestClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
)

export default AddBucketDialog;
