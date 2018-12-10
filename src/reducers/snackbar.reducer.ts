import { snackbarTypes } from "../actions/snackbar/snackbar.actions";

const initialState = {
  message: ''
}

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case snackbarTypes.SNACKBAR_ADD:
      return {
        ...state,
        message: action.payload.message
      }
    default:
      break;
  }

  return state;
}