import { put, call } from "redux-saga/effects";
import {
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE
} from "../actions/constants";

import Api from "../common/itemService";

export function* addItem(data: Object) {
  try {
    // make request to server
    const itemData = yield call(Api.addItem, data.payload);
    // login was successful dispatch success
    yield put({
      type: ADD_ITEM_SUCCESS,
      payload: {
        status: itemData.status,
        message: itemData.message,
      }
    });
  } catch (error) {
    // login failed dispatch failure
    yield put({
      type: ADD_ITEM_FAILURE,
      payload: {
        message: error.response.data.message,
        status: error.response.data.status
      }
    });
  }

}
export function* updateItem(data: Object) {
  try {
    // make request to server
    const itemData = yield call(Api.updateItem, data.payload);
    // login was successful dispatch success
    yield put({
      type: UPDATE_ITEM_SUCCESS,
      payload: {
        message: itemData.message,
        status: itemData.status
      }
    });
  } catch (error) {
    console.log(error)
    // login failed dispatch failure
    yield put({
      type: UPDATE_ITEM_FAILURE,
      payload: {
        message: error.response.data.message,
        status: error.response.data.status
      }
    });
  }
}

export function* deleteItem(data: Object) {
  try {
    // make request to server
    const itemData = yield call(Api.deleteItem, data.payload);
    // login was successful dispatch success
    yield put({
      type: DELETE_ITEM_SUCCESS,
      payload: {
        message: itemData.message,
        status: itemData.status
      }
    });
  } catch (error) {
    // login failed dispatch failure
    yield put({
      type: DELETE_ITEM_FAILURE,
      payload: {
        message: error.response.data.message,
        status: error.response.data.status
      }
    });
  }
}
