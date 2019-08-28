import { toggleViewUserModal, updateUserInfo, hoveredUser } from '../../../actions/view-user/view-user.actions';
import { IState } from '../../../reducers';
import { IViewUserState, IAddressState, IProfileViewState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { ViewUserModal } from './view-user-modal.component';
import { IUser } from '../../../model/user.model';

export interface IViewUserModal {
<<<<<<< HEAD
    manageGetUsersByGroup: (groupName: string, email: string, page?: number) => void,
    toggleViewUserModal: () => void,
    viewUser: IViewUserState,
    addresses: IAddressState,
    user: IUser,
    profileBeingViewed: IProfileViewState
}

const mapStateToProps = (state: IState) => ({
    addresses: state.managementState.addresses,
    viewUser: state.managementState.viewUser,
    user: state.managementState.currentSMSUser.currentSMSUser,
    profileBeingViewed: state.managementState.currentProfile
});

const mapDispatchToProps = {
    toggleViewUserModal,
    updateUserInfo,
    hoveredUser
=======
  toggleViewUserModal: () => void,
  viewUser: IViewUserState,
  addresses: IAddressState,
  user: IUser,
  profileBeingViewed: IProfileViewState
}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
  viewUser: state.managementState.viewUser,
  user: state.managementState.currentSMSUser.currentSMSUser,
  profileBeingViewed: state.managementState.currentProfile
});

const mapDispatchToProps = {
  toggleViewUserModal,
  updateUserInfo,
  hoveredUser
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserModal);