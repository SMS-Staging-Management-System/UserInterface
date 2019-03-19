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
import { loginReducer } from "./login.reducer";
import { viewUserReducer } from "./view-user.reducer";
import { currentSMSUserReducer } from "./current-sms-user.reducer";
import { manageCohortsReducer } from './manage-cohorts.reducer'
import { ICohort } from "../../model/cohort";
import { profileViewReducer } from "./profile-view.reducer";
import { resetPasswordReducer } from "./reset-password.reducer";
import { resetPasswordUsernameReducer } from "./reset-password-username.reducer";

export interface IAddressState {
  trainingAddresses: IAddress[],
}
export interface IAuthState {
  currentUser: ICognitoUser,
}

export interface IClickerState {
  clicks: number,
}
export interface ICreateCohortState {
  enabled: boolean,
  newCohort: ICohort,
  locationDropdownActive: boolean,
  trainerDropdownActive: boolean,
  isSaved: boolean,
}

export interface ICreateUserState {
  enabled: boolean,
  newUser: IUser,
  locationDropdownActive: false,
}

export interface ICurrentSMSUserState {
  currentSMSUser: IUser,
}


export interface ILoginState {
  username: string,
  password: string,
  cogUser: ICognitoUser,
  incorrectUserPass: boolean,
}

export interface IManageCohortsState {
  cohorts: ICohort[],
}

export interface IManageUsersState {
  manageUsers: ICognitoUser[],
}

export interface IManagementState {
  clicker: IClickerState,
  createUser: ICreateUserState,
  createCohort: ICreateCohortState,
  auth: IAuthState,
  manageUsers: IManageUsersState,
  addresses: IAddressState
  login: ILoginState,
  viewUser: IViewUserState,
  manageCohorts: IManageCohortsState,
  currentSMSUser: ICurrentSMSUserState,
  currentProfile: IProfileViewState,
  resetPassword: IResetPasswordState,
  resetPasswordUsername: IResetPasswordUsernameState,
}

export const managementState = combineReducers<IManagementState>({
  addresses: addressReducer,
  auth: authReducer,
  clicker: clickerReducer,
  createUser: createUserReducer,
  createCohort: createCohortReducer,
  manageUsers: manageUsersReducer,
  login: loginReducer,
  viewUser: viewUserReducer,
  currentSMSUser: currentSMSUserReducer,
  manageCohorts: manageCohortsReducer,
  currentProfile: profileViewReducer,
  resetPassword: resetPasswordReducer,
  resetPasswordUsername: resetPasswordUsernameReducer,
})

export interface IProfileViewState {
  user: IUser,
  bUserInfoChanged: boolean,
  locationDropdownActive: boolean,
}

export interface IResetPasswordState {
  showPasswordTip: boolean,
  confirmationPassword: string,
  newPassword: string,
  verificationCode: string,
}
export interface IResetPasswordUsernameState {
  username: string,
  needsVerificationCode: boolean,
}

export interface IViewUserState {
  enabled: boolean,
  newUser: IUser,
}









