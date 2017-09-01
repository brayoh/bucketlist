import {
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  ADD_ITEM_REQUEST,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST
} from "../actions/constants";

const initialState = {
  "status": ""
}


export default function itemsstate: Object = initialState, action) {
  switch (action.type) {

    case ADD_ITEM_REQUEST:
      return state;
      break;

    case DELETE_ITEM_REQUEST:
      return state;

    case ADD_ITEM_SUCCESS:
      return Object.assign([], state, action.payload)
      break;

    case ADD_ITEM_FAILURE:
      return Object.assign([], state, action.payload)
      break;

    case DELETE_ITEM_SUCCESS:
      return Object.assign({}, state, {
        status: action.payload.status
      })
      break;

    case DELETE_ITEM_FAILURE:
      return Object.assign({}, state, {
        message: action.payload.message
      })
      break;

    default:
      return state;
  }
}
