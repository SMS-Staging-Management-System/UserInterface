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
import { viewUserReducer } from "./view-user.reducer";
import { currentSMSUserReducer } from "./current-sms-user.reducer";
import { manageCohortsReducer} from './manage-cohorts.reducer'
import { ICohort } from "../../model/cohort";
import { profileViewReducer } from "./profile-view.reducer";
import { IStatus } from "../../model/status.model";


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
    selectedStatus: IStatus;
    /**
     * Whether the modal is visible or not.
     */
    modalVisible: boolean;
    /**
     * Whether the modal is in the 'saved' state or not
     */
    isSaved: boolean;
 }

  export interface IManageCohortsState {
    cohorts: ICohort[]
  }
  export interface IProfileViewState {
    user: IUser,
    bUserInfoChanged: boolean,
    locationDropdownActive: boolean
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
    currentSMSUser: ICurrentSMSUserState,
    currentProfile: IProfileViewState,
    viewCohort: ICohortModalState
  }

  export const managementState = combineReducers<IManagementState>({
    addresses: addressReducer,
    auth: authReducer,
    clicker: clickerReducer,
    viewUser: viewUserReducer,
    createUser: createUserReducer,
    createCohort: createCohortReducer,
    manageUsers: manageUsersReducer,
    currentSMSUser: currentSMSUserReducer,
    manageCohorts: manageCohortsReducer,
    currentProfile: profileViewReducer,
  })