import { connect } from 'react-redux';
import { IState } from '../../reducers/index';
import Profile from './profile.component';

const mapStateToProps = (state: IState) => ({
    user: state.managementState.currentUser.currentUser
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
