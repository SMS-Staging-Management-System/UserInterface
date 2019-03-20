import { ICognitoUser } from "../../model/cognito-user.model";
import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { addressReducer } from "./address.reducer";
import { statusReducer } from "./status.reducer";
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
import { joinCohortReducer } from "./join-cohort.reducer";
import { IStatus } from "../../model/status.model";
import { viewCohortReducer } from "./view-cohort.reducer";

import { IStatus } from "../../model/status.model";

export interface IAddressState {
  trainingAddresses: IAddress[],
}
export interface IAuthState {
    currentUser: ICognitoUser
  }
  
  export interface IClickerState {
    clicks: number
  }
  
  export interface ICreateUserState {
    enabled: boolean,
    newUser: IUser,
    locationDropdownActive: false
  }
  
  export interface IViewUserState {
    enabled: boolean,
    newUser: IUser
  }

  export interface ICreateCohortState {
    enabled: boolean,
    isSaved: boolean,
    newCohort: ICohort,
    locationDropdownActive: false,
    trainerDropdownActive: false
  }
  
  export interface IAddressState {
    trainingAddresses: IAddress[]
  }

  export interface IStatusState {
    userStatus: IStatus[],
    
  }
  
  export interface IManageUsersState {
    manageUsers: ICognitoUser[];
  }

  export interface ICurrentSMSUserState {
    currentSMSUser: IUser
  }
export interface ICohortModalState {
    /**
     * The currently selected cohort
     */
    cohort: ICohort,
    /**
     * List of users in the cohort
     * that are currently selected for
     * changes
     */
    selectedUsers: IUser[],
    /**
     * The status that we would like to
     * change all of the selected users to.
     */
    selectedStatus: IStatus,
    /**
     * Whether the modal is visible or not.
     */
    modalVisible: boolean,
    /**
     * Whether the modal is in the 'saved' state or not
     */
    isSaved: boolean,
    statusDropdownActive: boolean
 }

  export interface IJoinCohortState {
    validToken:boolean,
    userToJoin:IUser
  }


  export interface IManageCohortsState {
    cohorts: ICohort[]
  }
  export interface IProfileViewState {
    user: IUser,
    bUserInfoChanged: boolean,
    locationDropdownActive: boolean,
    statusDropdownActive: boolean,
    virtual:boolean,
  }

  export interface IManagementState {
    viewUser: IViewUserState;
    clicker: IClickerState,
    createUser: ICreateUserState,
    createCohort: ICreateCohortState,
    auth: IAuthState,
    manageUsers: IManageUsersState,
    manageCohorts: IManageCohortsState,
    addresses: IAddressState,
    statuses: IStatusState,
    currentSMSUser: ICurrentSMSUserState,
    currentProfile: IProfileViewState,
    viewCohort: ICohortModalState,
    joinCohort: IJoinCohortState,
    currentProfile: IProfileViewState,
    resetPassword: IResetPasswordState,
    resetPasswordUsername: IResetPasswordUsernameState,
    login: ILoginState,
  }

  export const managementState = combineReducers<IManagementState>({
    addresses: addressReducer,
    statuses: statusReducer,
    auth: authReducer,
    clicker: clickerReducer,
    viewUser: viewUserReducer,
    createUser: createUserReducer,
    createCohort: createCohortReducer,
    manageUsers: manageUsersReducer,
    currentSMSUser: currentSMSUserReducer,
    joinCohort: joinCohortReducer,
    currentProfile: profileViewReducer,
    viewCohort: viewCohortReducer
    manageCohorts: manageCohortsReducer,
    resetPassword: resetPasswordReducer,
    resetPasswordUsername: resetPasswordUsernameReducer,
    login: loginReducer,
  })


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

export interface ILoginState {
  username: string,
  password: string,
  cogUser: ICognitoUser,
  incorrectUserPass: boolean,
  passwordNeedsReset: boolean,
}