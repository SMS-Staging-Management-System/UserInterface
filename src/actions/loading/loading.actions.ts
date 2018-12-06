export const loadingTypes = {
  IS_LOADING: 'IS_LOADING'
}

/**
 * Set the loading screen status
 * @param isLoading
 */
export const isLoading = (isLoading: boolean) => (dispatch) => {
  dispatch({
    type: loadingTypes.IS_LOADING,
    payload: {
      isLoading: isLoading
    }
  });
}