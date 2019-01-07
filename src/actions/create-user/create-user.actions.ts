export const createUserTypes = {  
  TOGGLE: 'TOGGLE_CREATE_USER_MODAL',
  TOGGLE_LOCATION_DROPDOWN: 'TOGGLE_CREATE_USER_MODAL_LOCATION_DROPDOWN'
}

export const toggleModal = () => {
  return {
    payload: {
    },
    type: createUserTypes.TOGGLE
  }
}


export const toggleLocationDropdown = () => {
  return {
    payload: {},
    type: createUserTypes.TOGGLE_LOCATION_DROPDOWN
  }
}
