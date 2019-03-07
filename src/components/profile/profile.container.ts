import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';
import { updateCurrentSMSUser } from '../../actions/current-sms-user/current-sms-user.actions';

const mapStateToProps = (state: IState) => ({
    user: state.managementState.currentSMSUser.currentSMSUser
})

const mapDispatchToProps = {
   updateCurrentSMSUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
