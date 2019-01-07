import { ICreateUserState } from '.';
import { createUserTypes } from '../actions/create-user/create-user.actions';

const initialState: ICreateUserState = {
  enabled: true,
  locationDropdownActive: false,
  newUser: {
    address: {
      addressId: 0,
      alias: ''
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
  }
  return state;
}
