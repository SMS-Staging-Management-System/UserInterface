import { IAuthState } from '.';
import { authTypes } from '../actions/auth/auth.actions';

const initialState: IAuthState = {
  currentUser: {email: '', roles: []}
}

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case authTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    case 'RESET':
      return initialState;
  }
  return state;
}
