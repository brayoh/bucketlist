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

import TextField from 'material-ui/TextField';
import "./modal.css";

const style = {
  'width': '100%'
}

const ConfirmActionDialog = (props) => (
      <div>
        <Dialog style={style}  open={props.open} onRequestClose={props.handleRequestClose}>
          <DialogTitle className="modal-title">{props.action}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Are you sure you want to ${props.action} ?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="text-center">
            <Button onClick={props.handleAction} color="primary">
              {props.action}
            </Button>
            <Button onClick={() => props.handleRequestClose('confirm')} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
)

export default ConfirmActionDialog;
