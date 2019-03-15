import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';
import { hoveredUser } from '../../actions/view-user/view-user.actions';
import { updateLocations } from '../../actions/address/address.actions';
import { updateUserTrainingLocation, updateUserInfo, setToCurrentSMSUser, toggleTrainingLocationsDropdown, updateUser } from '../../actions/profile/profile.actions';

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
