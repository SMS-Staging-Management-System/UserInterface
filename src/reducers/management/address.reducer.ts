import { IAddressState } from '.';
import { authTypes } from '../../actions/auth/auth.actions';
import { addressTypes } from '../../actions/address/address.actions';

const initialState: IAddressState = {
  trainingAddresses: []
}

export const addressReducer = (state = initialState, action: any): IAddressState => {
  switch (action.type) {
    case addressTypes.UPDATE_TRAINING_ADDRESSES:
      return {
        ...state,
        trainingAddresses: action.payload.addresses
      }
    case authTypes.LOGOUT: 
      return initialState
  }
  return state;
}
