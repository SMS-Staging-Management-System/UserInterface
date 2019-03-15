import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';
import { hoveredUser } from '../../actions/view-user/view-user.actions';
import { updateLocations } from '../../actions/address/address.actions';
import { updateUserTrainingLocation, updateUserInfo, setToCurrentSMSUser, toggleTrainingLocationsDropdown, updateUser } from '../../actions/profile/profile.actions';
import { IUser } from '../../model/user.model';
import { IAddressState } from '../../reducers/management';
import { IAddress } from '../../model/address.model';

// For the intial population of the user's info
// Retrieved from the redux store
export interface IProfileProps {
    currentSMSUser: IUser
    userToView: IUser
    trainingAddresses: IAddressState
    locationDropdownActive: boolean
    bUserInfoChanged: boolean
    updateUserInfo(updatedUser: IUser): void
    setToCurrentSMSUser(currentSMSUser: IUser): void
    updateUser(userToUpdate: IUser): void
    updateUserTrainingLocation(location: IAddress): void
    toggleTrainingLocationsDropdown(): void
  }

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    userToView: state.managementState.currentProfile.user,
    locationDropdownActive: state.managementState.currentProfile.locationDropdownActive,
    trainingAddresses: state.managementState.addresses,
    bUserInfoChanged: state.managementState.currentProfile.bUserInfoChanged
})

const mapDispatchToProps = {
   updateUser,
   hoveredUser,
   setToCurrentSMSUser,
   updateLocations,
   updateUserTrainingLocation,
   updateUserInfo,
   toggleTrainingLocationsDropdown
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
