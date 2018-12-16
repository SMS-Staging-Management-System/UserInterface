import { userTypes } from '../actions/user/user.actions';
import { IUserState } from '.';
import { toast } from "react-toastify";

const FAKE_USER = { "city":       "Arlington",
                    "email":      "a@mail.com",
                    "firstname":  "Blake",
                    "lastname":   "Kruppa",
                    "mobile":     "714-123-1234",
                    "state":      "California", 
                    "timezone":   "+2", 
                    "userId":     1,
                    "zip":        "76013"}

const initialState: IUserState = {
  cogUser: null,
  isFirstSignin: false,
  isLogin: false,
  page:   'home',
  roles:  [],
  user:   FAKE_USER
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userTypes.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
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
  }
  return state;
}