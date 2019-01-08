import { IAddress } from "../../model/address.model";

export const createUserTypes = {  
  TOGGLE: 'TOGGLE_CREATE_USER_MODAL',
  TOGGLE_LOCATION_DROPDOWN: 'TOGGLE_CREATE_USER_MODAL_LOCATION_DROPDOWN',
  UPDATE_NEW_USER_LOCATION: 'UPDATE_NEW_USER_LOCATION'
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

export const updateNewUserLocation = (location: IAddress) => {
  return {
    payload: {
      location
    },
    type: createUserTypes.UPDATE_NEW_USER_LOCATION
  }
}
