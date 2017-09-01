import {
  ADD_ITEM_REQUEST,
  UPDATE_ITEM_REQUEST,
  DELETE_ITEM_REQUEST,
  RESET_ITEM_REQUEST_STATE
} from "./constants";


export const addItem: Object = (payload) => ({type: ADD_ITEM_REQUEST, payload})

export const updateItem: Object = (payload) => ({type: UPDATE_ITEM_REQUEST, payload})

export const deleteItem: Object = (payload) => ({type: DELETE_ITEM_REQUEST, payload})

export const resetRequestState: Object = () => ({type: RESET_ITEM_REQUEST_STATE})
