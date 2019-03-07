import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";

export const viewUserTypes = {  
  TOGGLE: 'TOGGLE_VIEW_USER_MODAL',
  VIEW_USER: 'VIEW_USER',
  VIEW_USER_LOCATION: 'VIEW_USER_LOCATION'
}

export const toggleViewUserModal = () => {
  return {
    payload: {
    },
    type: viewUserTypes.TOGGLE
  }
}

export const hoveredUser = (newUser: IUser) => {
  return {
    payload: {
      newUser
    },
    type: viewUserTypes.VIEW_USER
  }
}

export const viewUserLocation = (location: IAddress) => {
  return {
    payload: {
      location
    },
    type: viewUserTypes.VIEW_USER_LOCATION
  }
}

export const viewUserInfo = (newUser: IUser) => {
  return {
    payload: {
      newUser
    },
    type: viewUserTypes.VIEW_USER
  }
}