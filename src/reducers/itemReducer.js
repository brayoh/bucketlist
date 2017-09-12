import {
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  ADD_ITEM_REQUEST,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  RESET_ITEM_REQUEST_STATE
} from "../actions/constants";

const initialState = {
  "request": {
    "status": "",
    "message": ""
  }
}

export default function items(state = initialState, action) : Object {
  switch(action.type) {
    case ADD_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
    case UPDATE_ITEM_REQUEST:
      return state;

    case RESET_ITEM_REQUEST_STATE:
      return Object.assign({}, state, {
        request: {
          "status": "",
          "message": ""
        }
      })

    case ADD_ITEM_SUCCESS:
      return Object.assign({}, state, {
        request: {
          "status": action.payload.status,
          "message": action.payload.message
        }
      })

    case ADD_ITEM_FAILURE:
      return Object.assign({}, state, {
        request: {
          "status": action.payload.status,
          "message": action.payload.message
        }
      })

    case UPDATE_ITEM_SUCCESS:
      return Object.assign({}, state, {
        request: {
          "status": action.payload.status,
          "message": action.payload.message
        }
      })

    case UPDATE_ITEM_FAILURE:
      return Object.assign({}, state, {
        request: {
          "status": action.payload.status,
          "message": action.payload.message
        }
      })

    case DELETE_ITEM_SUCCESS:
      return Object.assign({}, state, {
        request: {
          "status": action.payload.status,
          "message": action.payload.message
        }
      })

    case DELETE_ITEM_FAILURE:
      return Object.assign([], state, {
        request: {
          "status": action.payload.status,
          "message": action.payload.message
        }
      })

    default:
      return state;
  }
}
