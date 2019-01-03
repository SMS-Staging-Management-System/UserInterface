import { combineReducers } from 'redux';
import { clickerReducer } from './clicker.reducer';
import { authReducer } from './auth.reducer';
import { ICognitoUser } from '../model/cognito-user.model';

export interface IAuthState {
  currentUser: ICognitoUser
}

export interface IClickerState {
  clicks: number
}


export interface IState {
  clicker: IClickerState,
  auth: IAuthState
}

export const state = combineReducers<IState>({
  auth: authReducer,
  clicker: clickerReducer,
  
})