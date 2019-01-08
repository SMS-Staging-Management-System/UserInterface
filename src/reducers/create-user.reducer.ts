import { ICreateUserState } from '.';
import { authTypes } from '../actions/auth/auth.actions';
import { createUserTypes } from '../actions/create-user/create-user.actions';

const initialState: ICreateUserState = {
  enabled: true,
  locationDropdownActive: false,
  newUser: {
    address: {
      addressId: 0,
      alias: '',
      city: '',
      country: '',
      state: '',
      zip: ''
    },
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  },
}

export const createUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case createUserTypes.TOGGLE:
      return {
        ...state,
        enabled: !state.enabled
      }
    case createUserTypes.TOGGLE_LOCATION_DROPDOWN:
      return {
        ...state,
        locationDropdownActive: !state.locationDropdownActive
      }
    case createUserTypes.UPDATE_NEW_USER_LOCATION:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          address: action.payload.location
        }
      }
    case authTypes.LOGOUT:
      return initialState
  }
  return state;
}
