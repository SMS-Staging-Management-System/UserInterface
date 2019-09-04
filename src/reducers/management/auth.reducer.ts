import { IAuthState } from '.';
import { authTypes } from '../../actions/auth/auth.actions';

const initialState: IAuthState = {
  currentUser:  {email: 'blake.kruppa@revature.com', roles: ['staging-manager']}
}

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case authTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser:  {email: 'blake.kruppa@revature.com', roles: ['staging-manager']} //action.payload.currentUser
      }
    case authTypes.LOGOUT:
      return initialState;
  }
  return state;
}
