export const toastTypes = {
  ADD_TOAST: 'ADD_TOAST'
}

/**
 * Pop up a new toast
 * @param toast 
 */
export const addToast = (message: string) => (dispatch) => {
  dispatch({
    payload: {
      toast: message
    },
    type: toastTypes.ADD_TOAST
  });
}