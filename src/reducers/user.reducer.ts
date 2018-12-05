import { userTypes } from '../actions/user/user.actions';
import { IUserState } from '.';

const initialState: IUserState = {
  login: false,
  user:  null, // User object
  registerToken: ''
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userTypes.COHORT_TOKEN_VERIFY:
      return {
        ...state,
        registerToken: action.payload.registerToken
      }
    case userTypes.REGISTER:
      return {
        ...state,
      }
    case userTypes.LOGIN:
      return {
        ...state,
        login: action.payload.login
      }
    case userTypes.LOGOUT:
      return {
        ...state,
        login: false,
        user:  null,
        registerToken: ''
      }
  }
  return state;
}