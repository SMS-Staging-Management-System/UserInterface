import { combineReducers } from 'redux';
import { clickerReducer } from './clicker.reducer';
import { userReducer } from './user.reducer';
import { associateReducer } from './associate.reducer';
import { managerReducer } from './manager.reducer';
import { loadingReducer } from './loading.reducer';
import { ICheckIn } from 'src/model/CheckIn.model';
import { ICohort } from 'src/model/Cohort.model';
import { IUser } from '../model/User.model';

export interface IClickerState {
  clicks: number
}

export interface IUserState {
  admins:   any[],
  associates: any[],
  cogUser:  any,
  isFirstSignin: boolean,
  isLogin:  boolean,
  user:     IUser,
  page:     string,
  roles:    string[],
  stagings: any[],
  trainers: any[]
}

export interface IManagerState {
  associates:       IUser[],
  cohorts:          ICohort[],
  comment:          string,
  checkIns:         ICheckIn[],
  currentCohort:    ICohort,
  trainers:         any[]
}

export interface IAssociateState {
  checkIns:         ICheckIn[],
  currentCheckIns:  ICheckIn[]
}

export interface ILoadingState {
  isLoading: boolean
}

export interface IState {
  associate: IAssociateState,
  clicker:  IClickerState,
  loading:  ILoadingState,
  manager:  IManagerState,
  user:     IUserState
}

export const state = combineReducers<IState>({
  associate:  associateReducer,
  clicker:  clickerReducer,
  loading:  loadingReducer,
  manager:  managerReducer,
  user:     userReducer
})