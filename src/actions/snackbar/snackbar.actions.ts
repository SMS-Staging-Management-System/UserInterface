export const snackbarTypes = {
  SNACKBAR_ADD: 'SNACKBAR_ADD'
}

export const addMessage = (pMessage) => (dispatch) => {
  dispatch({
    payload: {
      message: pMessage
    },
    type: snackbarTypes.SNACKBAR_ADD
  });
}