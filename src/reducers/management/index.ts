import { ICognitoUser } from "../../model/ICognitoUser";
import { IAddress } from "../../model/users/IAddress";
import { IUser } from "../../model/users/IUser";
import { addressReducer } from "./address.reducer";
import { statusReducer } from "./status.reducer";
import { authReducer } from "./auth.reducer";
import { createUserReducer } from "./create-user.reducer";
import { createCohortReducer } from "./create-cohort.reducer";
import { manageUsersReducer } from "./manage-users.reducer";
import { combineReducers } from "redux";
import { loginReducer } from "./login.reducer";
import { viewUserReducer } from "./view-user.reducer";
import { currentSMSUserReducer } from "./current-sms-user.reducer";
import { manageCohortsReducer } from './manage-cohorts.reducer'
import { ICohort } from "../../model/users/ICohort";
import { profileViewReducer } from "./profile-view.reducer";
import { resetPasswordReducer } from "./reset-password.reducer";
import { resetPasswordUsernameReducer } from "./reset-password-username.reducer";
import  joinCohortReducer  from "./join-cohort.reducer";
import { IStatus } from "../../model/users/IStatus";
import { viewCohortReducer } from "./view-cohort.reducer";
import { ICreateUser } from "../../model/users/ICreateUser";
import { profileUpdateReducer } from "./profile.reducer";


export interface IAuthState {
    currentUser: ICognitoUser
}

export interface ICreateUserState {
    enabled: boolean,
    newUser: ICreateUser,
    locationDropdownActive: boolean,
    roleDropdownActive: boolean,
    cohortDropdownActive: boolean,
}

export interface IViewUserState {
    enabled: boolean,
    newUser: IUser
}

export interface ICreateCohortState {
    enabled: boolean,
    isSaved: boolean,
    newCohort: ICohort,
    locationDropdownActive: boolean,
    trainerDropdownActive: boolean
}

export interface IAddressState {
    trainingAddresses: IAddress[]
}

export interface IStatusState {
    userStatus: IStatus[],

}
// list of emails and roles for users used to populate table
export interface IManageUsersState {
    manageUsers: ICognitoUser[],
    manageUsersCurrentPage: number,
    manageUsersPageTotal: number,
    emailSearch: string,
    option: string,
    componentLoaded: boolean,
    userTableSort: string,
    emailList: string[],
    adminResponse: any,
    trainerResponse: any,
    stagingManagerResponse: any,
    maxPage: number,
    areMore: boolean
}
// current user logged in
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
    foundCohort: ICohort,
    validToken: boolean,
    userToJoin: IUser
}


export interface IManageCohortsState {
    cohorts: ICohort[],
    currentPage: number,
    totalPages: number
}

export interface IProfileUpdateState {
    user: IUser
}

export interface IProfileViewState {
    user: IUser,
    bUserInfoChanged: boolean,
    locationDropdownActive: boolean,
    statusDropdownActive: boolean,
    cohortDropdownActive: boolean,
    virtual: boolean,
}

export interface IManagementState {
    viewUser: IViewUserState;
    createUser: ICreateUserState,
    createCohort: ICreateCohortState,
    auth: IAuthState,
    manageUsers: IManageUsersState,
    manageCohorts: IManageCohortsState,
    addresses: IAddressState,
    statuses: IStatusState,
    currentSMSUser: ICurrentSMSUserState,
    currentProfile: IProfileViewState,
    updateProfile: IProfileUpdateState,
    viewCohort: ICohortModalState,
    joinCohort: IJoinCohortState,
    resetPassword: IResetPasswordState,
    resetPasswordUsername: IResetPasswordUsernameState,
    login: ILoginState
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

export interface ILoginState {
    username: string,
    password: string,
    cogUser: ICognitoUser,
    incorrectUserPass: boolean,
    passwordNeedsReset: boolean,
}

export const managementState = combineReducers<IManagementState>({
    addresses: addressReducer,
    auth: authReducer,
    createCohort: createCohortReducer,
    createUser: createUserReducer,
    currentProfile: profileViewReducer,
    currentSMSUser: currentSMSUserReducer,
    joinCohort: joinCohortReducer,
    login: loginReducer,
    manageCohorts: manageCohortsReducer,
    manageUsers: manageUsersReducer,
    resetPassword: resetPasswordReducer,
    resetPasswordUsername: resetPasswordUsernameReducer,
    statuses: statusReducer,
    updateProfile: profileUpdateReducer,
    viewCohort: viewCohortReducer,
    viewUser: viewUserReducer,
})