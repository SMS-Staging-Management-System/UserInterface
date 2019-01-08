import { IAddressState } from '.';
import { addressTypes } from '../actions/address/address.actions';
import { authTypes } from '../actions/auth/auth.actions';

const initialState: IAddressState = {
  trainingAddresses: []
}

export const addressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case addressTypes.UPDATE_TRAINING_ADDRESSES:
      return {
        ...state,
        addresses: action.payload.addresses
      }
    case authTypes.LOGOUT: 
      return initialState
  }
  return state;
}
