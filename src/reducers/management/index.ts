import { ICognitoUser } from "../../model/cognito-user.model";
import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { addressReducer } from "./address.reducer";
import { authReducer } from "./auth.reducer";
import { clickerReducer } from "./clicker.reducer";
import { createUserReducer } from "./create-user.reducer";
import { createCohortReducer } from "./create-cohort.reducer";
import { manageUsersReducer } from "./manage-users.reducer";
import { combineReducers } from "redux";


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

  export interface IManagementState {
    clicker: IClickerState,
    createUser: ICreateUserState,
    createCohort: ICreateCohortState,
    auth: IAuthState,
    manageUsers: IManageUsersState,
    addresses: IAddressState
  }

  export const managementState = combineReducers<IManagementState>({
    addresses: addressReducer,
    auth: authReducer,
    clicker: clickerReducer,
    createUser: createUserReducer,
    createCohort: createCohortReducer,
    manageUsers: manageUsersReducer
  })