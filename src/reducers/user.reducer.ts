import { userTypes } from '../actions/user/user.actions';
import { IUserState } from '.';

const initialState: IUserState = {
  login: false,
  user:  null,
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userTypes.REGISTER:
      return {
        ...state,
      }
    case userTypes.LOGIN:
      return {
        ...state,
        login:  action.payload.login,
        user:   action.payload.user
      }
    case userTypes.LOGOUT:
      return {
        ...state,
        login: false,
        user:  null
      }
  }
  return state;
}