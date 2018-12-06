import { combineReducers } from 'redux';
import { clickerReducer } from './clicker.reducer';
import { userReducer } from './user.reducer';
import { associateReducer } from './associate.reducer';
import { managerReducer } from './manager.reducer';
import { snackbarReducer } from './snackbar.reducer';
import { loadingReducer } from './loading.reducer';
import { CheckIn } from 'src/model/CheckIn.model';
import { Cohort } from 'src/model/Cohort.model';

export interface IClickerState {
  clicks: number
}

export interface IUserState {
  login: boolean,
  user : null
}

export interface IManagerState {
  cohorts:  Array<Cohort>, // Class objects, which have user objects
  checkIns: Array<CheckIn>, // CheckIn objects
  currentCheckIns: Array<CheckIn>
}

export interface IAssociateState {
  checkIns: Array<CheckIn>, // CheckIn objects
  currentCheckIns: Array<CheckIn>
}

export interface ISnackarState {
  message: string // CheckIn objects
}

export interface ILoadingState {
  isLoading:  boolean
}

export interface IState {
  clicker:  IClickerState,
  user:     IUserState,
  associate:IAssociateState,
  manager:  IManagerState,
  snackbar: ISnackarState,
}

export const state = combineReducers<IState>({
  clicker:    clickerReducer,
  user:       userReducer,
  associate:  associateReducer,
  manager:    managerReducer,
  snackbar:   snackbarReducer,
  loading:    loadingReducer
})