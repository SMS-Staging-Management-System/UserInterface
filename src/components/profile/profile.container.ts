import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';
import { hoveredUser } from '../../actions/view-user/view-user.actions';
import { updateLocations } from '../../actions/address/address.actions';
import { updateUserTrainingLocation, updateUserInfo, setToCurrentSMSUser, toggleTrainingLocationsDropdown, updateUser, updateUserStatus, toggleStatusDropdown, handleCheckboxChange, toggleCohortDropdown } from '../../actions/profile/profile.actions';
import { IUser } from '../../model/user.model';
import { IAddressState, IStatusState, IManageUsersState } from '../../reducers/management';
import { IAddress } from '../../model/address.model';
import { IStatus } from '../../model/status.model';
import { manageGetUsersByGroup } from '../../actions/manage-users/manage-users.actions';

// For the intial population of the user's info
// Retrieved from the redux store
export interface IProfileProps {
    manageUsers: IManageUsersState;
    currentSMSUser: IUser;
    userToView: IUser;
    trainingAddresses: IAddressState;
    allStatus: IStatusState;
    locationDropdownActive: boolean;
    statusDropdownActive: boolean;
    cohortDropdownActive: boolean;
    bUserInfoChanged: boolean;
    virtual:boolean;
    updateUserInfo(updatedUser: IUser): void;
    setToCurrentSMSUser(currentSMSUser: IUser): void;
    updateUser(userToUpdate: IUser, bIsCurrentUser: boolean, roles: boolean[]): void;
    updateUserTrainingLocation(location: IAddress): void;
    toggleTrainingLocationsDropdown(): void;
    updateUserStatus(status: IStatus): void;
    toggleStatusDropdown(): void;
    toggleCohortDropdown(): void;
    handleCheckboxChange(status:IStatus): void;
    updateUserList(): void;
    manageGetUsersByGroup: (groupName: string, email:string, page?: number) => void,
  }

const mapStateToProps = (state: IState) => ({
    manageUsers: state.managementState.manageUsers,
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    userToView: state.managementState.currentProfile.user,
    locationDropdownActive: state.managementState.currentProfile.locationDropdownActive,
    trainingAddresses: state.managementState.addresses,
    allStatus: state.managementState.statuses,
    statusDropdownActive: state.managementState.currentProfile.statusDropdownActive,
    cohortDropdownActive: state.managementState.currentProfile.cohortDropdownActive,
    bUserInfoChanged: state.managementState.currentProfile.bUserInfoChanged,
    virtual: state.managementState.currentProfile.virtual
})

const mapDispatchToProps = {
   updateUser,
   hoveredUser,
   setToCurrentSMSUser,
   updateLocations,
   updateUserTrainingLocation,
   updateUserInfo,
   toggleTrainingLocationsDropdown,
   updateUserStatus,
   toggleStatusDropdown,
   toggleCohortDropdown,
   handleCheckboxChange,
   manageGetUsersByGroup: manageGetUsersByGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
