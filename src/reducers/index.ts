import { combineReducers } from 'redux';
import { clickerReducer } from './clicker.reducer';
import { authReducer } from './auth.reducer';
import { ICognitoUser } from '../model/cognito-user.model';
import { manageUsersReducer } from './manage-users.reducer';
import { createUserReducer } from './create-user.reducer';

export interface IAuthState {
  currentUser: ICognitoUser
}

export interface IClickerState {
  clicks: number
}

export interface ICreateUserState {
  enabled: boolean,
  newUser: {
    address: {
      addressId: number,
      alias: string
    },
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  },
  locationDropdownActive: false
}

export interface IManageUsersState {
  manageUsers: ICognitoUser[];
}


export interface IState {
  clicker: IClickerState,
  createUser: ICreateUserState,
  auth: IAuthState,
  manageUsers: IManageUsersState
}

export const state = combineReducers<IState>({
  auth: authReducer,
  clicker: clickerReducer,
  createUser: createUserReducer,
  manageUsers: manageUsersReducer
})