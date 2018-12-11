import { combineReducers } from 'redux';
import { clickerReducer } from './clicker.reducer';
import { userReducer } from './user.reducer';
import { associateReducer } from './associate.reducer';
import { managerReducer } from './manager.reducer';
import { snackbarReducer } from './snackbar.reducer';
import { loadingReducer } from './loading.reducer';
import { ICheckIn } from 'src/model/CheckIn.model';
import { ICohort } from 'src/model/Cohort.model';
import { IUser } from '../model/User.model';

export interface IClickerState {
  clicks: number
}

export interface IUserState {
  cogUser: any,
  isFirstSignin: boolean,
  login: boolean,
  user:  IUser
}

export interface IManagerState {
  cohorts: ICohort[], // Class objects, which have user objects
  checkIns: ICheckIn[], // CheckIn objects
  currentCheckIns: ICheckIn[],
  currentCohort: ICohort
}

export interface IAssociateState {
  checkIns: ICheckIn[], // CheckIn objects
  currentCheckIns: ICheckIn[]
}

export interface ISnackarState {
  message: string // CheckIn objects
}

export interface ILoadingState {
  isLoading: boolean
}

export interface IState {
  associate: IAssociateState,
  clicker:  IClickerState,
  loading:  ILoadingState,
  manager:  IManagerState,
  snackbar: ISnackarState,
  user:     IUserState
}

export const state = combineReducers<IState>({
  associate:  associateReducer,
  clicker:  clickerReducer,
  loading:  loadingReducer,
  manager:  managerReducer,
  snackbar: snackbarReducer,
  user:     userReducer
})