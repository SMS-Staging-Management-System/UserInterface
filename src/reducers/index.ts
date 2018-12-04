import { combineReducers } from 'redux';
import { clickerReducer } from './clicker.reducer';
import { userReducer } from './user.reducer';
import { associateReducer } from './associate.reducer';
import { managerReducer } from './manager.reducer';
import { snackbarReducer } from './snackbar.reducer';

export interface IClickerState {
  clicks: number
}

export interface IUserState {
  login: boolean,
  user : null,// User object
  registerToken: ''
}

export interface IManagerState {
  classes:  [] // Class objects, which have user objects
  checkIns: [] // CheckIn objects
  checkInsFilter: []
}

export interface IAssociateState {
  checkIns: [] // CheckIn objects
}

export interface ISnackarState {
  message: string // CheckIn objects
}
export interface IState {
  clicker:  IClickerState,
  user:     IUserState,
  associate:IAssociateState,
  manager:  IManagerState,
  snackbar: ISnackarState
}

export const state = combineReducers<IState>({
  clicker:    clickerReducer,
  user:       userReducer,
  associate:  associateReducer,
  manager:    managerReducer,
  snackbar:   snackbarReducer
})