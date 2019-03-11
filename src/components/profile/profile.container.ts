import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';
import { updateUser, updateCurrentSMSUser } from '../../actions/current-sms-user/current-sms-user.actions';
import { hoveredUser } from '../../actions/view-user/view-user.actions';
import { viewProfile } from '../../actions/profile/profile.actions';

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    userToView: state.managementState.currentProfile.user,
})

const mapDispatchToProps = {
   updateUser,
   viewProfile,
   hoveredUser,
   updateCurrentSMSUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
