import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { toast } from "react-toastify";

export const createUserTypes = {  
  TOGGLE: 'TOGGLE_CREATE_USER_MODAL',
  TOGGLE_LOCATION_DROPDOWN: 'TOGGLE_CREATE_USER_MODAL_LOCATION_DROPDOWN',
  UPDATE_NEW_USER: 'UPDATE_NEW_USER',
  UPDATE_NEW_USER_LOCATION: 'UPDATE_NEW_USER_LOCATION',
  USER_SAVED: 'CREATE_NEW_USER_USER_SAVED'
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

export const updateNewUser = (newUser: IUser) => {
  return {
    payload: {
      newUser
    },
    type: createUserTypes.UPDATE_NEW_USER
  }
}


//Use async await tho?
export const saveUser = (newUser: IUser) => (dispatch: (action: any) => void) => {
  userClient.saveUser(newUser)
    .then(resp => {
      toast.success('User Created')
      dispatch({
        payload: {},
        type: createUserTypes.USER_SAVED
      })
    })
    .catch(e => {
      toast.error('Failed To Save User')
    })

 
}