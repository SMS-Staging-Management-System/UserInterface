import { combineReducers } from 'redux';
import { clickerReducer } from './clicker.reducer';
import { authReducer } from './auth.reducer';
import { ICognitoUser } from '../model/cognito-user.model';
import { manageUsersReducer } from './manage-users.reducer';

export interface IAuthState {
  currentUser: ICognitoUser
}

export interface IClickerState {
  clicks: number
}

export interface IManageUsersState {
  manageUsers: ICognitoUser[];
}


export interface IState {
  clicker: IClickerState,
  auth: IAuthState,
  manageUsers: IManageUsersState
}

export const state = combineReducers<IState>({
  auth: authReducer,
  clicker: clickerReducer,
  manageUsers: manageUsersReducer
})