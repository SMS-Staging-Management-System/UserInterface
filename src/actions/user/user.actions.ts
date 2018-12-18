import * as userClient from '../../axiosClients/userClient/userClient';
import { toast } from "react-toastify";
import { IUser } from 'src/model/User.model';
import { IUserCreateDto } from 'src/model/UserCreateDto.model';
import { isLoading } from  '../loading/loading.actions';
import * as userHelpers from './user.helpers';

/**
 * userTypes
 */
export const userTypes = {
  CHANGE_PAGE:      'CHANGE_PAGE',
  COGNITO_SIGN_IN:  'COGNITO_SIGN_IN',
  FIRST_SIGN_IN:'FIRST_SIGN_IN',
  LOGIN:        'LOGIN',
  LOGOUT:       'LOGOUT',
  REGISTER:     'REGISTER',
  SET_ADMINS:   'SET_ADMINS',
  SET_ROLE:     'SET_ROLE',
  SET_STAGINGS: 'SET_STAGINGS',
  SET_TRAINERS: 'SET_TRAINERS',
  USER_INIT:    'USER_INIT'
}

/**
 * User login 
 * @param username 
 * @param password 
 */
export const cognitoLogin = (username: string, password: string) => (dispatch) => {
  isLoading(true);
  userHelpers.cognitoLogin(username, password)(dispatch);
  isLoading(false);  
}

/**
 * 
 * @param registerDto 
 * @param token 
 */
export const register = (user: IUserCreateDto) => (dispatch) => {
  userClient.postUser(user)
  .then(response => {
    console.log("error");
  })
  .catch(error => {
    toast.warn("Server unable to register user")      
  });
}

/**
 * Set up user data
 */
export const setup = () => dispatch => {
  // Get user info from server if session is valid
  if(userHelpers.refreshCognitoSession()(dispatch)) {
    userHelpers.initUser(dispatch);
  }
}

/**
 * Update user info
 * @param user 
 */
export const updateUser = (user: IUser) => (dispatch) => {
  userClient.patchUser(user)
  .then(response => {
    toast.success("Info updated")
  })
  .catch(error => {
    toast.warn("Server error")
  })
}

/**
 * Log a user out and delete jwt token from local store
 */
export const logout = () => (dispatch) => {
  const user = userHelpers.getCurrentCognitoUser();
  if(user) {
    user.signOut();
    dispatch({
      payload: {
        isLogin: false
      },
      type: userTypes.LOGOUT
    });
    toast.success("Log out");
  }
}

export const changePage = (page: string) => dispatch => {
  dispatch({
    payload: {
      page
    },
    type: userTypes.CHANGE_PAGE
  });
}