import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';
<<<<<<< HEAD
import { updateUserTrainingLocation, updateUserInfo, setToCurrentSMSUser,
     toggleTrainingLocationsDropdown, updateUser, updateUserStatus,
      toggleStatusDropdown, handleCheckboxChange, toggleCohortDropdown } from '../../actions/profile/profile.actions';
import { IUser } from '../../model/user.model';
import { IAddressState, IStatusState, IManageUsersState } from '../../reducers/management';
=======
import { hoveredUser } from '../../actions/view-user/view-user.actions';
import { updateLocations } from '../../actions/address/address.actions';
import { updateUserTrainingLocation, updateUserInfo, setToCurrentSMSUser, toggleTrainingLocationsDropdown, updateUser, updateUserStatus, toggleStatusDropdown, handleCheckboxChange } from '../../actions/profile/profile.actions';
import { IUser } from '../../model/user.model';
import { IAddressState, IStatusState } from '../../reducers/management';
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
import { IAddress } from '../../model/address.model';
import { IStatus } from '../../model/status.model';

// For the intial population of the user's info
// Retrieved from the redux store
export interface IProfileProps {
<<<<<<< HEAD
    manageUsers: IManageUsersState,
    currentSMSUser: IUser,
    userToView: IUser,
    trainingAddresses: IAddressState,
    allStatus: IStatusState,
    locationDropdownActive: boolean,
    statusDropdownActive: boolean,
    cohortDropdownActive: boolean,
    bUserInfoChanged: boolean,
    virtual: boolean,
    location: any,
    manageGetUsersByGroup: (groupName: string, email:string, page?: number) => void,
    updateUserInfo(updatedUser: IUser): void,
    setToCurrentSMSUser(currentSMSUser: IUser): void,
    updateUser(userToUpdate: IUser, bIsCurrentUser: boolean, roles: boolean[]): void,
    updateUserTrainingLocation(location: IAddress): void,
    toggleTrainingLocationsDropdown(): void,
    updateUserStatus(status: IStatus): void,
    toggleStatusDropdown(): void,
    toggleCohortDropdown(): void,
    handleCheckboxChange(status: IStatus): void,
}

const mapStateToProps = (state: IState) => ({
    allState: state,
    manageUsers: state.managementState.manageUsers,
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    userToView: state.managementState.currentProfile.user,
    trainingAddresses: state.managementState.addresses,
    allStatus: state.managementState.statuses,
    locationDropdownActive: state.managementState.currentProfile.locationDropdownActive,
    statusDropdownActive: state.managementState.currentProfile.statusDropdownActive,
    cohortDropdownActive: state.managementState.currentProfile.cohortDropdownActive,
=======
    currentSMSUser: IUser
    userToView: IUser
    trainingAddresses: IAddressState
    allStatus: IStatusState
    locationDropdownActive: boolean
    statusDropdownActive: boolean
    bUserInfoChanged: boolean
    virtual:boolean
    updateUserInfo(updatedUser: IUser): void
    setToCurrentSMSUser(currentSMSUser: IUser): void
    updateUser(userToUpdate: IUser, bIsCurrentUser: boolean): void
    updateUserTrainingLocation(location: IAddress): void
    toggleTrainingLocationsDropdown(): void
    updateUserStatus(status: IStatus): void
    toggleStatusDropdown(): void
    handleCheckboxChange(status:IStatus): void
  }

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    userToView: state.managementState.currentProfile.user,
    locationDropdownActive: state.managementState.currentProfile.locationDropdownActive,
    trainingAddresses: state.managementState.addresses,
    allStatus: state.managementState.statuses,
    statusDropdownActive: state.managementState.currentProfile.statusDropdownActive,
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    bUserInfoChanged: state.managementState.currentProfile.bUserInfoChanged,
    virtual: state.managementState.currentProfile.virtual
})

const mapDispatchToProps = {
<<<<<<< HEAD
    updateUserInfo: updateUserInfo,
    setToCurrentSMSUser: setToCurrentSMSUser,
    updateUser: updateUser,
    updateUserTrainingLocation: updateUserTrainingLocation,
    toggleTrainingLocationsDropdown: toggleTrainingLocationsDropdown,
    updateUserStatus: updateUserStatus,
    toggleStatusDropdown: toggleStatusDropdown,
    toggleCohortDropdown: toggleCohortDropdown,
    handleCheckboxChange: handleCheckboxChange,
=======
   updateUser,
   hoveredUser,
   setToCurrentSMSUser,
   updateLocations,
   updateUserTrainingLocation,
   updateUserInfo,
   toggleTrainingLocationsDropdown,
   updateUserStatus,
   toggleStatusDropdown,
   handleCheckboxChange
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
