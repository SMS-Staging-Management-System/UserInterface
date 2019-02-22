import { combineReducers } from 'redux';
import { clickerReducer } from './clicker.reducer';
import { authReducer } from './auth.reducer';
import { ICognitoUser } from '../model/cognito-user.model';
import { manageUsersReducer } from './manage-users.reducer';
import { createUserReducer } from './create-user.reducer';
import { IAddress } from '../model/address.model';
import { addressReducer } from './address.reducer';
import { createCohortReducer } from './create-cohort.reducer';
import { IUser } from '../model/user.model';

export interface IAuthState {
  currentUser: ICognitoUser
}

export interface IClickerState {
  clicks: number
}

export interface ICreateUserState {
  enabled: boolean,
  newUser: {
    address: IAddress,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  },
  locationDropdownActive: false
}

export interface ICreateCohortState {
  enabled: boolean,
  newCohort: {
    address: IAddress,
    cohortDescription: string,
    cohortName: string,
    trainer: IUser,
    startDate: string,
    endDate: string
  },
  locationDropdownActive: false
}

export interface IAddressState {
  trainingAddresses: IAddress[]
}

export interface IManageUsersState {
  manageUsers: ICognitoUser[];
}


export interface IState {
  clicker: IClickerState,
  createUser: ICreateUserState,
  createCohort: ICreateCohortState,
  auth: IAuthState,
  manageUsers: IManageUsersState,
  addresses: IAddressState
}

export const state = combineReducers<IState>({
  addresses: addressReducer,
  auth: authReducer,
  clicker: clickerReducer,
  createUser: createUserReducer,
  createCohort: createCohortReducer,
  manageUsers: manageUsersReducer
})