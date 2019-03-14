import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';
import { updateUser, updateCurrentSMSUser } from '../../actions/current-sms-user/current-sms-user.actions';
import { hoveredUser } from '../../actions/view-user/view-user.actions';
import { updateLocations } from '../../actions/address/address.actions';
import { updateUserTrainingLocation } from '../../actions/profile/profile.actions';

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    userToView: state.managementState.currentProfile.user,
    trainingAddresses: state.managementState.addresses
})

const mapDispatchToProps = {
   updateUser,
   hoveredUser,
   updateCurrentSMSUser,
   updateLocations,
   updateUserTrainingLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
