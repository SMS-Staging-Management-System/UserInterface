export const snackbarTypes = {
  SNACKBAR_ADD: 'SNACKBAR_ADD'
}

export const addMessage = (pMessage) => (dispatch) => {
  dispatch({
    type: snackbarTypes.SNACKBAR_ADD,
    payload: {
      message: pMessage
    }
  });
}