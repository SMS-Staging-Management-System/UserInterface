import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';
import { updateUser } from '../../actions/current-sms-user/current-sms-user.actions';
import { hoveredUser } from '../../actions/view-user/view-user.actions';
import { viewProfile } from '../../actions/profile/profile.actions';

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    userToView: state.managementState.currentProfile.user,
    bIsLoggedInUser: state.managementState.currentProfile.bIsLoggedInUser
})

const mapDispatchToProps = {
   updateUser,
   viewProfile,
   hoveredUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
