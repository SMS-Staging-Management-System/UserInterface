export const toastTypes = {
  ADD_TOAST: 'ADD_TOAST'
}

/**
 * Pop up a new toast
 * @param toast 
 */
export const addToast = (toast: string) => (dispatch) => {
  dispatch({
    payload: {
      toast: toast
    },
    type: toastTypes.ADD_TOAST
  });
}