export const loadingTypes = {
  IS_LOADING: 'IS_LOADING'
}

/**
 * Set the loading screen status
 * @param isLoading
 */
export const isLoading = (status: boolean) => (dispatch) => {
  dispatch({
    payload: {
      isLoading: status
    },
    type: loadingTypes.IS_LOADING
  });
}