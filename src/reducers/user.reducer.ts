import { userTypes } from '../actions/user/user.actions';
import { IUserState } from '.';
import { toast } from "react-toastify";

const initialState: IUserState = {
  admins:  [{
    'email': 'revatureEmp@revature.com',
    'firstName': "Calvin",
    'lastName': 'Vo'
    }],
  associates: [],
  cogUser: null,
  isFirstSignin: false,
  isLogin: true,
  page:   'home',
  roles:    [],
  stagings: [],
  trainers: [{
    'email': 'revatureEmp@revature.com',
    'firstName': "Calvin",
    'lastName': 'Vo'
    }],
  user:   null
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userTypes.REGISTER:
      toast.success("Register successful");
      return {
        ...state,
      }
    case userTypes.LOGIN:
      toast.success("Login");
      return {
        ...state,
        isLogin:  action.payload.isLogin,
        user:   action.payload.user
      }
    case userTypes.SET_ROLE:
      return {
        ...state,
        roles: action.payload.roles
      }
    case userTypes.LOGOUT:
      toast.success("Logged out");
      return {
        ...state,
        cogUser: null,
        isFirstSignin: false,
        isLogin: false,
        roles:  [],
        user:   null
      }
    case userTypes.COGNITO_SIGN_IN:
      toast.success("Welcome back");
      return {
        ...state,
        cogUser:  action.payload.cogUser,
        isLogin:  action.payload.isLogin,
        roles:    action.payload.roles
      }
    case userTypes.FIRST_SIGN_IN:
      return {
        ...state,
        cogUser:  action.payload.cogUser,
        isFirstSignin: true
      }
    case userTypes.USER_INIT:
      return {
        ...state,
        user:  action.payload.user
      }
    case userTypes.SET_TRAINERS:
      return {
        ...state,
        trainers:  action.payload.trainers
      }
    case userTypes.SET_STAGINGS:
      return {
        ...state,
        stagings:  action.payload.stagings
      }
    case userTypes.SET_ADMINS:
      return {
        ...state,
        admins:  action.payload.admins
      }
  }
  return state;
}